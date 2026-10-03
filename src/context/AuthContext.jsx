import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {authService} from '../services/auth.service';

const C=createContext(null);

export function AuthProvider({children}){
  const [session,setSessionState]=useState(null);
  const [authReady,setAuthReady]=useState(false);

  const setSession=(value)=>{
    setSessionState(value || null);
    if(value) localStorage.setItem('saka_session',JSON.stringify(value));
    else localStorage.removeItem('saka_session');
  };

  useEffect(()=>{
    let active=true;
    async function bootstrap(){
      const token=localStorage.getItem('saka_session_token');
      if(!token){ if(active)setAuthReady(true); return; }

      if(import.meta.env.VITE_USE_MOCK==='true'){
        try{
          const cached=JSON.parse(localStorage.getItem('saka_session')||'null');
          if(active)setSessionState(cached);
        }catch{}
        if(active)setAuthReady(true);
        return;
      }

      try{
        const data=await authService.me();
        if(active)setSession({token:localStorage.getItem('saka_session_token'),user:data.user});
      }catch{
        localStorage.removeItem('saka_session_token');
        localStorage.removeItem('saka_session');
        if(active)setSessionState(null);
      }finally{
        if(active)setAuthReady(true);
      }
    }
    bootstrap();
    return ()=>{active=false};
  },[]);

  useEffect(()=>{const expired=()=>setSession(null);window.addEventListener('saka:session-expired',expired);return()=>window.removeEventListener('saka:session-expired',expired)},[]);

  async function logout(){
    try{ if(import.meta.env.VITE_USE_MOCK!=='true') await authService.logout(); }
    finally{
      localStorage.removeItem('saka_session_token');
      setSession(null);
    }
  }

  const value=useMemo(()=>({session,setSession,logout,authReady}),[session,authReady]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useAuth=()=>useContext(C);
