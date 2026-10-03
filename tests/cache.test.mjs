import {test} from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'vite';
import {JSDOM} from 'jsdom';
const root=new URL('../',import.meta.url).pathname;
const bundle=await build({root,configFile:false,logLevel:'silent',build:{write:false,lib:{entry:root+'src/services/api.js',name:'CacheAPI',formats:['iife']}}});
const code=(Array.isArray(bundle)?bundle[0]:bundle).output.find(x=>x.type==='chunk').code;
function setup(){
 const dom=new JSDOM('',{url:'http://localhost',runScripts:'outside-only'}),w=dom.window;
 const calls=[];let revision='r1',version=1,offline=false,expired=false,time=Date.now();
 w.Date.now=()=>time;w.localStorage.setItem('saka_session_token','one');
 w.fetch=async(_,options)=>{const r=JSON.parse(options.body);calls.push(r);if(offline)throw new w.TypeError('offline');return {ok:true,status:200,json:async()=>expired?{ok:false,error:{code:'SESSION_EXPIRED'},message:'Expired'}:{ok:true,data:r.action==='data.revision'?{revision}:{version,token:r.token}}};};
 w.eval(code);
 return {dom,w,api:w.CacheAPI,calls,setRevision:v=>revision=v,setVersion:v=>version=v,setOffline:v=>offline=v,setExpired:v=>expired=v,advance:v=>time+=v};
}
test('session reads reuse cached result and deduplicate concurrent requests',async()=>{const s=setup();try{const r=await Promise.all([s.api.apiRequest('modules.get',{modules:['anggota']}),s.api.apiRequest('modules.get',{modules:['anggota']})]);await s.api.apiRequest('modules.get',{modules:['anggota']});assert.equal(r[0].version,1);assert.equal(s.calls.filter(x=>x.action==='modules.get').length,1);assert.equal(s.calls.filter(x=>x.action==='data.revision').length,1);}finally{s.dom.window.close();}});
test('successful mutation and changed server revision invalidate reads',async()=>{const s=setup();try{await s.api.apiRequest('modules.get');s.setVersion(2);await s.api.apiRequest('crud.anggota.save',{data:{}});assert.equal((await s.api.apiRequest('modules.get')).version,2);s.setVersion(3);s.setRevision('r2');s.advance(61000);assert.equal((await s.api.apiRequest('modules.get')).version,3);}finally{s.dom.window.close();}});
test('offline reads use previously loaded data but writes fail',async()=>{const s=setup();try{await s.api.apiRequest('dashboard.get');s.advance(16*60*1000);s.setOffline(true);assert.equal((await s.api.apiRequest('dashboard.get')).version,1);await assert.rejects(s.api.apiRequest('crud.anggota.save'),/Koneksi terputus/);}finally{s.dom.window.close();}});
test('cached data never crosses account sessions and logout clears storage',async()=>{const s=setup();try{await s.api.apiRequest('modules.get');s.w.localStorage.setItem('saka_session_token','two');assert.equal((await s.api.apiRequest('modules.get')).token,'two');s.api.clearApiCache();assert.equal(s.w.sessionStorage.getItem('saka_read_cache_v1'),null);}finally{s.dom.window.close();}});
test('expired server session cannot fall back to cached data',async()=>{const s=setup();try{await s.api.apiRequest('modules.get');s.advance(61000);s.setExpired(true);await assert.rejects(s.api.apiRequest('modules.get'),/Expired/);assert.equal(s.w.localStorage.getItem('saka_session_token'),null);assert.equal(s.w.sessionStorage.getItem('saka_read_cache_v1'),null);}finally{s.dom.window.close();}});
