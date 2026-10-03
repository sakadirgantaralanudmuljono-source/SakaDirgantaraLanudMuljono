import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Plane, LogOut, Menu, LayoutDashboard, Users, CalendarDays, ClipboardCheck, ChartNoAxesCombined, WalletCards, Package, Mail, Network, Activity, ShieldCheck, UserCog, Settings, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NAV_ADMIN, NAV_MEMBER, ADMIN_ONLY, CORE_STAFF, MODULE_BY_PATH } from '../../utils/constants';
import { moduleService } from '../../services/module.service';

const ICONS = {
  dashboard: LayoutDashboard,
  anggota: Users,
  kegiatan: CalendarDays,
  'activity-details': ClipboardCheck,
  absensi: ClipboardCheck,
  penilaian: ChartNoAxesCombined,
  kas: WalletCards,
  inventaris: Package,
  surat: Mail,
  pengurus: Network,
  notifications: Activity,
  permissions: ShieldCheck,
  users: UserCog,
  maintenance: Settings,
  profil: UserCog
};

const TITLES = Object.fromEntries([...NAV_ADMIN, ...NAV_MEMBER].flatMap(group => group.items));

function canSee(path, role, visible) {
  if (path === 'dashboard') return true;
  if (ADMIN_ONLY.includes(path)) return role === 'ADMIN';
  if (role === 'ANGGOTA') return true;
  if (CORE_STAFF.includes(path)) return true;
  if (!visible || !Object.keys(visible).length) return true;
  const key = MODULE_BY_PATH[path];
  if (!key) return true;
  return visible[key] === true;
}

export default function AppLayout() {
  const { session, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(null);
  const [apiState, setApiState] = useState('memeriksa');
  const role = String(session?.user?.Role || session?.role || 'ANGGOTA').toUpperCase();
  const page = location.pathname.replace(/^\//, '') || 'dashboard';

  useEffect(() => {
    let live = true;
    if (role === 'ANGGOTA') {
      setVisible(null);
      return undefined;
    }
    moduleService.dashboard()
      .then(d => { if (live) setVisible(d?.visibleModules || {}); })
      .catch(() => { if (live) setVisible({}); });
    return () => { live = false; };
  }, [role]);

  useEffect(() => {
    let live = true;
    fetch('/api/health')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(() => { if (live) setApiState('terhubung'); })
      .catch(() => { if (live) setApiState('lokal'); });
    return () => { live = false; };
  }, []);

  const groups = (role === 'ANGGOTA' ? NAV_MEMBER : NAV_ADMIN)
    .map(group => ({ ...group, items: group.items.filter(([path]) => canSee(path, role, visible)) }))
    .filter(group => group.items.length);

  return <div className="app-shell">
    <aside className={'sidebar ' + (open ? 'open' : '')}>
      <div className="brand"><span className="brand-mark"><Plane size={21} /></span><div><b>SAKA Dirgantara</b><small>Management System</small></div></div>
      <nav>
        {groups.map(group => <div key={group.section}>
          <div className="nav-caption">{group.section.toUpperCase()}</div>
          {group.items.map(([path, label]) => {
            const Icon = ICONS[path] || ChevronRight;
            return <NavLink key={path} to={'/' + path} onClick={() => setOpen(false)}><Icon size={18} /><span>{label}</span></NavLink>;
          })}
        </div>)}
      </nav>
      <div className="sidebar-user">
        <span className="user-avatar">{String(session?.user?.Nama || session?.name || 'P').trim().charAt(0).toUpperCase()}</span>
        <div className="user-copy"><b>{session?.user?.Nama || session?.name || 'Pengguna'}</b><small>{role}</small></div>
        <button onClick={logout} title="Keluar"><LogOut size={18} /></button>
      </div>
    </aside>
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setOpen(!open)}><Menu /></button>
        <div className="topbar-title"><small>SAKA DIRGANTARA</small><b>{TITLES[page] || 'Sistem Informasi Organisasi'}</b></div>
        <span className={'system-chip ' + apiState}><i />{apiState === 'terhubung' ? 'API aktif' : apiState === 'lokal' ? 'Mode lokal' : 'Memeriksa API'}</span>
      </header>
      <section className="content"><Outlet /></section>
    </main>
    {open && <button className="scrim" aria-label="Tutup menu" onClick={() => setOpen(false)} />}
  </div>;
}
