import {createContext,useContext,useState,useCallback} from "react";
import {CheckCircle,AlertCircle,Info,X} from "lucide-react";
const ToastContext=createContext(null);
export function ToastProvider({children}){
 const [items,setItems]=useState([]);
 const showToast=useCallback((message,type="success")=>{
  const id=Date.now(); setItems(x=>[...x,{id,message,type}]);
  setTimeout(()=>setItems(x=>x.filter(t=>t.id!==id)),3500);
 },[]);
 return <ToastContext.Provider value={{showToast}}>{children}<div className="toast-container">{items.map(t=><div className={`toast ${t.type}`} key={t.id}>{t.type==="success"?<CheckCircle/>:t.type==="error"?<AlertCircle/>:<Info/>}<span>{t.message}</span><button onClick={()=>setItems(x=>x.filter(a=>a.id!==t.id))}><X size={15}/></button></div>)}</div></ToastContext.Provider>
}
export const useToast=()=>useContext(ToastContext);
