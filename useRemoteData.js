import {useCallback,useEffect,useState} from 'react';
export function useRemoteData(loader,deps=[]){
  const [data,setData]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
  const reload=useCallback(async()=>{
    setLoading(true);setError('');
    try{setData(await loader());}catch(e){setError(e.message||'Gagal memuat data.');}
    finally{setLoading(false);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },deps);
  useEffect(()=>{reload()},[reload]);
  return {data,loading,error,reload};
}
