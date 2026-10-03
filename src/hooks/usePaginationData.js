import {useCallback,useEffect,useState} from 'react';

export function usePaginationData(loader, options={}){
 const initialPage=options.page || 1;
 const initialLimit=options.limit || 10;
 const [page,setPage]=useState(initialPage);
 const [limit,setLimit]=useState(initialLimit);
 const [result,setResult]=useState({items:[],total:0,pages:0});
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState('');

 const load=useCallback(async()=>{
   setLoading(true); setError('');
   try{
     const data=await loader({page,limit});
     setResult(data || {items:[],total:0,pages:0});
   }catch(e){setError(e.message || 'Gagal memuat data');}
   finally{setLoading(false);}
 },[loader,page,limit]);

 useEffect(()=>{load()},[load]);

 return {
   ...result,
   page,
   limit,
   loading,
   error,
   setPage,
   setLimit,
   reload:load
 };
}
