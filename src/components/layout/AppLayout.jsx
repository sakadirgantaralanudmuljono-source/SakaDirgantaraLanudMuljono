import {NavLink,Outlet} from 'react-router-dom';
import {Plane,LogOut,Menu} from 'lucide-react';
import {useEffect,useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {NAV_ADMIN,NAV_MEMBER} from '../../utils/constants';
import {moduleService} from '../../services/module.service';

const MODULE_BY_PATH={anggota:'anggota',kegiatan:'kegiatan',absensi:'absensi',penilaian:'penilaian',kas:'kas',inventaris:'inventaris',surat:'surat',pengurus:'pengurus'};
export default function AppLayout(){
 const {session,logout}=useAuth();const [open,setOpen]=useState(false);const [visible,setVisible]=useState(null);
 const role=String(session?.user?.Role||session?.role||'ANGGOTA').toUpperCase();
 useEffect(()=>{let live=true;if(role==='ANGGOTA'){setVisible(null);return;}moduleService.dashboard().then(d=>{if(live)setVisible(d?.visibleModules||{})}).catch(()=>{if(live)setVisible({})});return()=>{live=false}},[role]);
 let nav=role==='ANGGOTA'?NAV_MEMBER:NAV_ADMIN;
 if(role!=='ANGGOTA')nav=nav.filter(([path])=>path==='dashboard'||path==='maintenance'||(path==='users'&&role==='ADMIN')||visible?.[MODULE_BY_PATH[path]]===true);
 return <div className="app-shell"><aside className={'sidebar '+(open?'open':'')}><div className="brand"><span className="brand-mark"><Plane size={22}/></span><div><b>SAKA</b><small>DIRGANTARA</small></div></div><nav>{nav.map(([path,label])=><NavLink key={path} to={'/'+path} onClick={()=>setOpen(false)}>{label}</NavLink>)}</nav><div className="sidebar-user"><div><b>{session?.user?.Nama||session?.name||'Pengguna'}</b><small>{role}</small></div><button onClick={logout} title="Keluar"><LogOut size={18}/></button></div></aside><main className="main"><header className="topbar"><button className="mobile-menu" onClick={()=>setOpen(!open)}><Menu/></button><div><small>SAKA Dirgantara</small><b>Sistem Organisasi</b></div><span className="system-chip">● Sistem Aktif</span></header><section className="content"><Outlet/></section></main>{open&&<button className="scrim" onClick={()=>setOpen(false)}/>}</div>;
}
