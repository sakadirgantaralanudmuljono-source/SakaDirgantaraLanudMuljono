import {NavLink,Outlet} from 'react-router-dom';
import {Plane,LogOut,Menu,LayoutDashboard,Users,CalendarDays,ClipboardCheck,ChartNoAxesCombined,WalletCards,Package,Mail,Network,Activity,ShieldCheck,UserCog,Settings,ChevronRight} from 'lucide-react';
import {useEffect,useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {NAV_ADMIN,NAV_MEMBER} from '../../utils/constants';
import {moduleService} from '../../services/module.service';

const MODULE_BY_PATH={anggota:'anggota',kegiatan:'kegiatan','activity-details':'kegiatan',absensi:'absensi',penilaian:'penilaian',kas:'kas',inventaris:'inventaris',surat:'surat',pengurus:'pengurus',notifications:'absensi'};
const ICONS={dashboard:LayoutDashboard,anggota:Users,kegiatan:CalendarDays,'activity-details':ClipboardCheck,absensi:ClipboardCheck,penilaian:ChartNoAxesCombined,kas:WalletCards,inventaris:Package,surat:Mail,pengurus:Network,notifications:Activity,permissions:ShieldCheck,users:UserCog,maintenance:Settings,profil:UserCog};
export default function AppLayout(){
 const {session,logout}=useAuth();const [open,setOpen]=useState(false);const [visible,setVisible]=useState(null);
 const role=String(session?.user?.Role||session?.role||'ANGGOTA').toUpperCase();
 useEffect(()=>{let live=true;if(role==='ANGGOTA'){setVisible(null);return;}moduleService.dashboard().then(d=>{if(live)setVisible(d?.visibleModules||{})}).catch(()=>{if(live)setVisible({})});return()=>{live=false}},[role]);
 let nav=role==='ANGGOTA'?NAV_MEMBER:NAV_ADMIN;
 if(role!=='ANGGOTA')nav=nav.filter(([path])=>path==='dashboard'||(role==='ADMIN'&&['maintenance','users','permissions'].includes(path))||visible?.[MODULE_BY_PATH[path]]===true);
 return <div className="app-shell">
  <aside className={'sidebar '+(open?'open':'')}>
   <div className="brand"><span className="brand-mark"><Plane size={21}/></span><div><b>SAKA Dirgantara</b><small>Management System</small></div></div>
   <div className="nav-caption">MENU UTAMA</div>
   <nav>{nav.map(([path,label])=>{const Icon=ICONS[path]||ChevronRight;return <NavLink key={path} to={'/'+path} onClick={()=>setOpen(false)}><Icon size={18}/><span>{label}</span></NavLink>})}</nav>
   <div className="sidebar-user"><span className="user-avatar">{String(session?.user?.Nama||session?.name||'P').trim().charAt(0).toUpperCase()}</span><div className="user-copy"><b>{session?.user?.Nama||session?.name||'Pengguna'}</b><small>{role}</small></div><button onClick={logout} title="Keluar"><LogOut size={18}/></button></div>
  </aside>
  <main className="main"><header className="topbar"><button className="mobile-menu" onClick={()=>setOpen(!open)}><Menu/></button><div className="topbar-title"><small>SAKA DIRGANTARA</small><b>Sistem Informasi Organisasi</b></div><span className="system-chip"><i/> Sistem Aktif</span></header><section className="content"><Outlet/></section></main>
  {open&&<button className="scrim" aria-label="Tutup menu" onClick={()=>setOpen(false)}/>}
 </div>;
}
