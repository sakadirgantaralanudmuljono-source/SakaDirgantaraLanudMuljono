import { Link } from 'react-router-dom';
import { Users, CalendarDays, ClipboardCheck, Wallet, Plus, FileText, Bell, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import { moduleService } from '../../services/module.service';
import { attendanceService } from '../../services/attendance.service';
import { useRemoteData } from '../../hooks/useRemoteData';

const formatMoney = (value) => value == null ? '—' : new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(value);

export default function DashboardPage() {
  const { session } = useAuth();
  const role = String(session?.user?.Role || 'ANGGOTA').toUpperCase();
  const { data, loading, error, reload } = useRemoteData(() => moduleService.dashboard(), []);
  const { data: openActs,loading:activitiesLoading,error:activitiesError,reload:reloadActivities } = useRemoteData(() => role === 'ANGGOTA' ? attendanceService.dashboardActivities() : Promise.resolve([]), [role]);

  const member = data?.anggotaDashboard;
  const d = data?.dashboard;
  const activities = Array.isArray(openActs) ? openActs : (openActs?.items || openActs?.activities || []);

  const stats = role === 'ANGGOTA'
    ? [['Total Kehadiran', member?.jumlahAbsensi?.total ?? '—', ClipboardCheck], ['Hadir', member?.jumlahAbsensi?.hadir ?? '—', Users], ['Pengajuan Izin', member?.izin?.length ?? '—', CalendarDays], ['Status', member?.profile?.Status || '—', Activity]]
    : [['Anggota Aktif', d?.anggotaAktif ?? '—', Users], ['Kegiatan Bulan Ini', d?.kegiatanBulanIni ?? '—', CalendarDays], ['Kehadiran', d?.tingkatKehadiranBulanIni == null ? '—' : d.tingkatKehadiranBulanIni + '%', ClipboardCheck], ['Saldo Kas', formatMoney(d?.saldo), Wallet]];

  const actions = role === 'ANGGOTA'
    ? [['/absensi','Absensi','Catat kehadiran'],['/penilaian','Penilaian','Lihat hasil'],['/profil','Profil','Lihat data']]
    : [['/kegiatan','Kegiatan','Kelola agenda'],['/absensi','Absensi','Verifikasi kehadiran'],['/notifications','Pengajuan Izin','Tinjau permintaan'],['/activity-details','Laporan','Dokumentasi kegiatan']];

  const workflow=data?.workflow;
  const activityLink=(path,id)=>id ? `${path}?kegiatanId=${encodeURIComponent(id)}` : path;
  const cards=role==='ANGGOTA' ? [
    {title:'Pengajuan Saya',Icon:Bell,to:'/absensi',available:!!member,count:member?.izin?.filter(x=>['Menunggu Verifikasi','Terkirim'].includes(x.Status)).length,description:'Izin/sakit menunggu verifikasi'},
    {title:'Absensi Terbuka',Icon:ClipboardCheck,to:activityLink('/absensi',activities.find(x=>x.absensiCanSubmit)?.ID),available:!activitiesLoading&&!activitiesError,count:activities.filter(x=>x.absensiCanSubmit).length,description:'Kegiatan yang dapat Anda absen sekarang'},
    {title:'Penilaian Saya',Icon:FileText,to:'/penilaian',available:!!member,count:member?.penilaian?.length,description:'Catatan penilaian pribadi'}
  ] : [
    {title:'Pengajuan Izin',Icon:Bell,to:'/notifications',...workflow?.approval,description:'Pengajuan izin/sakit menunggu verifikasi'},
    {title:'Absensi',Icon:ClipboardCheck,to:activityLink('/absensi',workflow?.attendance?.kegiatanId),...workflow?.attendance,description:'Kegiatan yang membuka absensi sekarang'},
    {title:'Laporan',Icon:FileText,to:activityLink('/activity-details',workflow?.reports?.kegiatanId),...workflow?.reports,description:'Kegiatan berjalan/selesai tanpa PDF laporan'}
  ];
  async function refresh(){await Promise.all([reload(),reloadActivities()]);}

  return <>
    <PageHeader eyebrow="BERANDA" title={role === 'ANGGOTA' ? 'Beranda Anggota' : 'Beranda Pengurus'} description="Lihat kegiatan, kehadiran, dan pekerjaan yang perlu diselesaikan." />

    <div className="dashboard-top-actions">
      <button className="btn" onClick={refresh} disabled={loading||activitiesLoading}>Muat Ulang</button>
    </div>

    {(error||activitiesError) && <div className="alert">{error||activitiesError}</div>}

    <div className="stat-grid modern-stat-grid">
      {stats.map(([title,value,Icon]) => <article className="stat-card modern-card" key={title}>
        <div className="stat-icon"><Icon size={20}/></div>
        <small>{title}</small>
        <strong>{loading ? '...' : value}</strong>
      </article>)}
    </div>

    {role !== 'ANGGOTA' && <section className="panel section-gap workflow-panel">
      <div className="panel-title-row"><h2>Akses Cepat</h2><small>Akses pekerjaan yang paling sering digunakan</small></div>
      <div className="quick-action-grid">
        {actions.map(([to,title,text]) => <Link className="quick-action" to={to} key={to}><span><Plus size={18}/></span><div><b>{title}</b><small>{text}</small></div></Link>)}
      </div>
    </section>}

    <section className="panel section-gap workflow-panel">
      <div className="panel-title-row"><h2>Perlu Ditindaklanjuti</h2><small>Jumlah pekerjaan saat data dimuat. Klik kartu untuk menindaklanjuti.</small></div>
      <div className="workflow-modern">
        {cards.map(({title,Icon,to,available,count,description})=>{
          const content=<><Icon/><b>{title}</b><strong>{loading?'…':available?count??'—':'—'}</strong><span>{available?description:available===false?'Akses terbatas':loading?'Memuat ringkasan...':'Data belum tersedia'}</span>{available&&<small>Buka {title.toLowerCase()} →</small>}</>;
          return available ? <Link key={title} className="workflow-card" to={to} aria-label={`${title}: ${count??0}. ${description}`}>{content}</Link> : <div key={title} className="workflow-card unavailable">{content}</div>;
        })}
      </div>
    </section>

    {role === 'ANGGOTA' && <section className="panel section-gap">
      <h2>Kegiatan Terbuka</h2>
      {activities.length === 0 ? <div className="empty compact">Tidak ada kegiatan terbuka.</div> : activities.map(k => <div className="permission-row" key={k.ID || k.NamaKegiatan}><div><strong>{k.NamaKegiatan || k.Nama}</strong><br/><small>{k.Tanggal || ''}</small></div><Link className="btn" to={activityLink('/absensi',k.ID)}>Buka</Link></div>)}
    </section>}
  </>;
}
