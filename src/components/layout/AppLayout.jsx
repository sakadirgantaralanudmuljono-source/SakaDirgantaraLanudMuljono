import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Plane, LogOut, Menu, Bell, Search, LayoutDashboard, Users, CalendarDays, ClipboardCheck, ChartNoAxesCombined, WalletCards, Package, Mail, Network, Activity, ShieldCheck, UserCog, Settings, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NAV_ADMIN, NAV_MEMBER, ADMIN_ONLY, CORE_STAFF, MODULE_BY_PATH } from '../../utils/constants';
import { moduleService } from '../../services/module.service';
import GlobalSearch from '../common/GlobalSearch';

const ICONS = {dashboard:LayoutDashboard,anggota:Users,kegiatan:CalendarDays,'activity-details':ClipboardCheck,absensi:ClipboardCheck,penilaian:ChartNoAxesCombined,kas:WalletCards,inventaris:Package,surat:Mail,pengurus:Network,notifications:Activity,permissions:ShieldCheck,users:UserCog,maintenance:Settings,profil:UserCog};
const TITLES = Object.fromEntries([...NAV_ADMIN,...NAV_MEMBER].flatMap(group=>group.items));
function canSee(path, role, visible){if(path==='dashboard')return true;if(ADMIN_ONLY.includes(path))return role==='ADMIN';if(role==='ANGGOTA')return true;if(path==='notifications')return true;if(!visible||!Object.keys(visible).length)return true;const key=MODULE_BY_PATH[path];return !key||visible[key]===true;}

export default function AppLayout(){
 const {session,logout}=useAuth();
 const location=useLocation();
 const [open,setOpen]=useState(false);
 const [menuQuery,setMenuQuery]=useState('');
 const [visible,setVisible]=useState(null);
 const [apiState,setApiState]=useState('memeriksa');
 const role=String(session?.user?.Role||session?.role||'ANGGOTA').toUpperCase();
 const page=location.pathname.replace(/^\//,'')||'dashboard';
 const name=session?.user?.Nama||session?.name||'Pengguna';
 useEffect(()=>{let live=true;if(role==='ANGGOTA'){setVisible(null);return;}moduleService.dashboard().then(d=>live&&setVisible(d?.visibleModules||{})).catch(()=>live&&setVisible({}));return()=>live=false},[role]);
 useEffect(()=>{fetch('/api/health').then(r=>r.ok?r.json():Promise.reject()).then(()=>setApiState('terhubung')).catch(()=>setApiState('lokal'));},[]);
 const groups=(role==='ANGGOTA'?NAV_MEMBER:NAV_ADMIN).map(g=>({...g,items:g.items.filter(([p])=>canSee(p,role,visible))})).filter(g=>g.items.length);
 return <div className="app-shell">
  <aside className={'sidebar '+(open?'open':'')}>
   <div className="brand"><span className="brand-mark"><Plane size={21}/></span><div><b>SAKA Dirgantara</b><small>Management System</small></div></div>
   <div className="sidebar-search"><Search size={15}/><input aria-label="Cari menu" value={menuQuery} onChange={e=>setMenuQuery(e.target.value)} placeholder="Cari menu..."/></div>
   <nav>{groups.map(group=><div key={group.section}><div className="nav-caption">{group.section.toUpperCase()}</div>{group.items.filter(([path,label])=>`${path} ${label}`.toLowerCase().includes(menuQuery.toLowerCase())).map(([path,label])=>{const Icon=ICONS[path]||ChevronRight;return <NavLink key={path} to={'/'+path} onClick={()=>setOpen(false)}><Icon size={18}/><span>{label}</span></NavLink>})}</div>)}</nav>
   <div className="sidebar-user"><span className="user-avatar">{String(name).trim().charAt(0).toUpperCase()}</span><div className="user-copy"><b>{name}</b><small>{role}</small></div><button type="button" aria-label="Logout" title="Logout" onClick={logout}><LogOut size={18}/></button></div>
  </aside>
  <main className="main">
   <header className="topbar">
    <button className="mobile-menu" onClick={()=>setOpen(!open)}><Menu/></button>
    <div className="topbar-title"><small>SAKA DIRGANTARA</small><b>{TITLES[page]||'Sistem Informasi Organisasi'}</b></div><GlobalSearch groups={groups} />
    <div className="topbar-actions"><NavLink className="icon-button" aria-label="Notifikasi" to={role==='ANGGOTA'?'/dashboard':'/notifications'}><Bell size={18}/></NavLink><span className={'system-chip '+apiState}><i/>{apiState==='terhubung'?'API aktif':apiState==='lokal'?'Mode lokal':'Memeriksa API'}</span></div>
   </header>
   <section className="content"><Outlet/></section>
  </main>
  <nav className="mobile-nav"><NavLink to="/dashboard" end><LayoutDashboard size={18}/><span>Home</span></NavLink><NavLink to="/absensi"><ClipboardCheck size={18}/><span>Absensi</span></NavLink>{role!=='ANGGOTA'&&<NavLink to="/kegiatan"><CalendarDays size={18}/><span>Kegiatan</span></NavLink>}<NavLink to="/profil"><UserCog size={18}/><span>Profil</span></NavLink><button type="button" className="mobile-logout" aria-label="Logout" onClick={logout}><LogOut size={18}/><span>Logout</span></button></nav>
  {open&&<button className="scrim" onClick={()=>setOpen(false)}/>} 
 </div>;
}
