const API_PATH = import.meta.env.VITE_API_PATH || '/api/gas';
const STORAGE_KEY='saka_read_cache_v1';
const READ_ACTIONS=new Set(['dashboard.get','permissions.get','modules.get','activity.list','member.activities.dashboard','member.activities.active','member.activities.permission','assessment.month','assessment.memberHistory','assessment.skk','activity.inventory.get','activity.report.get','activity.permissionSummary','permission.batch.get','notifications.get','notifications.permissionDetail','system.structure']);
const TIMED_ACTIONS=new Set(['dashboard.get','member.activities.dashboard','member.activities.active','member.activities.permission','notifications.get']);
let state={token:'',revision:null,entries:{}};
let epoch=0,checkedAt=0,checking=null;
const pending=new Map();
try{state=JSON.parse(sessionStorage.getItem(STORAGE_KEY))||state;}catch{}
function persist(){try{sessionStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{}}
export function getApiCacheEpoch(){return epoch;}
export function invalidateApiCache(){epoch++;state.entries={};pending.clear();checkedAt=0;persist();}
export function clearApiCache(){invalidateApiCache();state={token:'',revision:null,entries:{}};try{sessionStorage.removeItem(STORAGE_KEY);}catch{}}
function scope(token){if(state.token!==token){clearApiCache();state.token=token;}}
export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);this.name='ApiError';this.status=status;this.details=details;
  }
}
async function request(action,payload,token,options={}){
 const response=await fetch(API_PATH,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,token,payload}),signal:options.signal});
 let data;
 try{data=await response.json();}catch{throw new ApiError('Respons server tidak valid.',response.status);}
 if(!response.ok||data?.ok===false||data?.success===false){
  if(response.status===401||data?.error?.code==='SESSION_EXPIRED'){
   clearApiCache();localStorage.removeItem('saka_session_token');localStorage.removeItem('saka_session');window.dispatchEvent(new Event('saka:session-expired'));
  }
  throw new ApiError(data?.message||'Permintaan gagal.',response.status,data);
 }
 return data?.data??data;
}
async function checkRevision(token){
 if(Date.now()-checkedAt<60000)return;
 if(checking)return checking;
 const startEpoch=epoch;
 checking=(async()=>{
  try{
   const value=await request('data.revision',{},token);
   if(state.token!==token||epoch!==startEpoch)return;
   if(typeof value?.revision!=='string')return;
   const changed=state.revision!==null&&state.revision!==value.revision;
   if(changed)invalidateApiCache();
   state.revision=value.revision;persist();
   if(changed)window.dispatchEvent(new Event('saka:data-updated'));
  }catch(e){if(e instanceof ApiError&&e.details?.error?.code==='SESSION_EXPIRED')throw e;}
  finally{checkedAt=Date.now();checking=null;}
 })();
 return checking;
}
export async function apiRequest(action,payload={},options={}){
 const token=localStorage.getItem('saka_session_token')||'';scope(token);
 if(action==='auth.logout'||action==='auth.login')clearApiCache();
 if(!READ_ACTIONS.has(action)){
  const result=await request(action,payload,token,options);
  if(action!=='auth.me'&&action!=='member.attendance.rule'&&!action.endsWith('.preview')&&!action.endsWith('Preview')&&!action.endsWith('Link'))invalidateApiCache();
  return result;
 }
 if(payload.forceRefresh||options.forceRefresh)invalidateApiCache();
 await checkRevision(token);
 const key=JSON.stringify([action,payload]);const item=state.entries[key];
 const ttl=TIMED_ACTIONS.has(action)?30000:Infinity;
 if(item&&Date.now()-item.time<ttl)return item.value;
 if(pending.has(key))return pending.get(key);
 const startEpoch=epoch;
 const promise=(async()=>{
  try{
   const value=await request(action,payload,token,options);
   if(epoch===startEpoch&&state.token===token){state.entries[key]={value,time:Date.now()};persist();}
   return value;
  }catch(e){
   if(item&&!(e instanceof ApiError)&&e.name!=='AbortError')return item.value;
   throw e;
  }finally{if(pending.get(key)===promise)pending.delete(key);}
 })();
 pending.set(key,promise);return promise;
}
if(typeof window!=='undefined')window.addEventListener('focus',()=>{
 const token=localStorage.getItem('saka_session_token');if(token)checkRevision(token).catch(()=>{});
});
