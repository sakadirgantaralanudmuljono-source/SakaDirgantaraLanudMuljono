import {useCallback,useEffect,useRef,useState} from 'react';

export function useRemoteData(loader,deps=[]){
 const controller=useRef(null);
 const [data,setData]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const reload=useCallback(async()=>{
   controller.current?.abort();
   controller.current=new AbortController();
   setLoading(true);setError('');
   try{setData(await loader({signal:controller.current.signal}));}
   catch(e){if(e.name!=='AbortError') setError(e.message||'Gagal memuat data.');}
   finally{setLoading(false);}
 },deps);
 useEffect(()=>{reload(); return ()=>controller.current?.abort()},[reload]);
 return {data,loading,error,reload};
}
