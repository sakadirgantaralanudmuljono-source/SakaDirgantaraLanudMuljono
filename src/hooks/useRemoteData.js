import {invalidateApiCache,getApiCacheEpoch} from '../services/api';
import {useCallback,useEffect,useRef,useState} from 'react';
const views=new Map();
export function useRemoteData(loader,deps=[]){
 const key=JSON.stringify([localStorage.getItem('saka_session_token'),window.location.pathname,loader.toString(),deps]);
 const saved=views.get(key);
 const initial=saved?.epoch===getApiCacheEpoch()?saved.data:null;
 const controller=useRef(null),sequence=useRef(0),current=useRef(initial);
 const [data,setData]=useState(initial),[loading,setLoading]=useState(initial===null),[error,setError]=useState('');
 const reload=useCallback(async(force=true)=>{
   if(force)invalidateApiCache();
   controller.current?.abort();controller.current=new AbortController();
   const run=++sequence.current;
   setLoading(current.current===null);setError('');
   try{
     const before=getApiCacheEpoch();
     let value=await loader({signal:controller.current.signal});
     if(before!==getApiCacheEpoch()&&run===sequence.current)value=await loader({signal:controller.current.signal});
     if(run!==sequence.current)return;
     current.current=value;setData(value);views.set(key,{data:value,epoch:getApiCacheEpoch()});
     if(views.size>100)views.delete(views.keys().next().value);
   }catch(e){if(run===sequence.current&&e.name!=='AbortError')setError(e.message||'Gagal memuat data.');}
   finally{if(run===sequence.current)setLoading(false);}
 },[key,...deps]);
 useEffect(()=>{const update=()=>reload(false);window.addEventListener('saka:data-updated',update);reload(false);return()=>{window.removeEventListener('saka:data-updated',update);sequence.current++;controller.current?.abort();}},[reload]);
 return {data,loading,error,reload};
}
