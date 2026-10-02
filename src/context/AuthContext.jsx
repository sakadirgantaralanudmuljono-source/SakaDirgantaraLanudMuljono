import {createContext,useContext,useMemo,useState} from 'react';
const C=createContext(null);
export function AuthProvider({children}){
 const [session,setSessionState]=useState(()=>{try{return JSON.parse(localStorage.getItem('saka_session'))}catch{return null}});
 const setSession=v=>{setSessionState(v); if(v)localStorage.setItem('saka_session',JSON.stringify(v));else localStorage.removeItem('saka_session')};
 const value=useMemo(()=>({session,setSession,logout:()=>setSession(null)}),[session]);
 return <C.Provider value={value}>{children}</C.Provider>;
}
export const useAuth=()=>useContext(C);
