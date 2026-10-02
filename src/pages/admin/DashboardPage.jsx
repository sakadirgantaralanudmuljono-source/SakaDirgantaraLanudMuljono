import {Users,CalendarDays,ClipboardCheck,Wallet} from 'lucide-react';
import {useAuth} from '../../context/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import {moduleService} from '../../services/module.service';
import {useRemoteData} from '../../hooks/useRemoteData';

export default function DashboardPage(){
  const {session}=useAuth();
  const role=String(session?.user?.Role||'ANGGOTA').toUpperCase();
  const {data,loading,error,reload}=useRemoteData(()=>moduleService.dashboard(),[]);
  const member=data?.anggotaDashboard;
  const d=data?.dashboard;
  const stats=role==='ANGGOTA'
    ? [['Total Kehadiran',member?.jumlahAbsensi?.total??'—',ClipboardCheck],['Hadir',member?.jumlahAbsensi?.hadir??'—',ClipboardCheck],['Pengajuan Izin',member?.izin?.length??'—',CalendarDays],['Status',member?.profile?.Status||'—',Users]]
    : [['Anggota Aktif',d?.anggotaAktif??'—',Users],['Kegiatan Bulan Ini',d?.kegiatanBulanIni??'—',CalendarDays],['Kehadiran Bulan Ini',d?.tingkatKehadiranBulanIni==null?'—':d.tingkatKehadiranBulanIni+'%',ClipboardCheck],['Saldo Kas',d?.saldo==null?'—':new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(d.saldo),Wallet]];
  return <><PageHeader eyebrow="RINGKASAN" title={role==='ANGGOTA'?'Beranda Anggota':'Dashboard'} description="Data diambil langsung dari backend Google Apps Script."/>
    <div className="toolbar"><span>{loading?'Memuat dashboard...':'Backend terhubung'}</span><button className="btn" onClick={reload}>Muat Ulang</button></div>
    {error&&<div className="alert">{error}</div>}
    <div className="stat-grid">{stats.map(([a,b,Icon])=><article className="stat-card" key={a}><div className="stat-icon"><Icon size={19}/></div><small>{a}</small><strong>{b}</strong></article>)}</div>
  </>;
}
