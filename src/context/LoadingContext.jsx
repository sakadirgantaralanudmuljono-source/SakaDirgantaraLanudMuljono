import {createContext,useContext,useState,useCallback} from 'react';
import {LoaderCircle} from 'lucide-react';

const LoadingContext=createContext(null);

export function LoadingProvider({children}){
 const [loading,setLoading]=useState({active:false,message:'Memproses...',progress:0});
 const startLoading=useCallback((message='Memproses...',progress=0)=>setLoading({active:true,message,progress}),[]);
 const updateLoading=useCallback((progress,message)=>setLoading(v=>({...v,progress:progress ?? v.progress,message:message ?? v.message})),[]);
 const stopLoading=useCallback(()=>setLoading(v=>({...v,active:false})),[]);
 return <LoadingContext.Provider value={{loading,startLoading,updateLoading,stopLoading}}>
   {children}
   {loading.active && <div className="global-loading-overlay">
      <div className="global-loading-card">
        <LoaderCircle className="spin" size={38}/>
        <strong>{loading.message}</strong>
        <div className="loading-track"><div style={{width:`${loading.progress||45}%`}}/></div>
        <small>{loading.progress||45}%</small>
      </div>
   </div>}
 </LoadingContext.Provider>
}
export const useLoading=()=>useContext(LoadingContext);
