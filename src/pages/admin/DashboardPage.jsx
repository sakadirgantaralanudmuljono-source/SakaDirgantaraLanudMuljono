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
  const { data: openActs } = useRemoteData(() => role === 'ANGGOTA' ? attendanceService.dashboardActivities().catch(() => []) : Promise.resolve([]), [role]);

  const member = data?.anggotaDashboard;
  const d = data?.dashboard;
  const activities = Array.isArray(openActs) ? openActs : (openActs?.items || openActs?.activities || []);

  const stats = role === 'ANGGOTA'
    ? [['Total Kehadiran', member?.jumlahAbsensi?.total ?? '—', ClipboardCheck], ['Hadir', member?.jumlahAbsensi?.hadir ?? '—', Users], ['Pengajuan Izin', member?.izin?.length ?? '—', CalendarDays], ['Status', member?.profile?.Status || '—', Activity]]
    : [['Anggota Aktif', d?.anggotaAktif ?? '—', Users], ['Kegiatan Bulan Ini', d?.kegiatanBulanIni ?? '—', CalendarDays], ['Kehadiran', d?.tingkatKehadiranBulanIni == null ? '—' : d.tingkatKehadiranBulanIni + '%', ClipboardCheck], ['Saldo Kas', formatMoney(d?.saldo), Wallet]];

  const actions = role === 'ANGGOTA'
    ? [['/absensi','Absensi','Catat kehadiran'],['/penilaian','Penilaian','Lihat hasil'],['/profil','Profil','Lihat data']]
    : [['/kegiatan','Kegiatan','Kelola agenda'],['/absensi','Absensi','Verifikasi kehadiran'],['/notifications','Approval','Tinjau permintaan'],['/activity-details','Laporan','Dokumentasi kegiatan']];

  return <>
    <PageHeader eyebrow="OPERATION CENTER" title={role === 'ANGGOTA' ? 'Beranda Anggota' : 'Dashboard Operasional'} description="Pusat aktivitas harian dan monitoring organisasi." />

    <div className="dashboard-top-actions">
      <button className="btn" onClick={reload}>Refresh Data</button>
    </div>

    {error && <div className="alert">{error}</div>}

    <div className="stat-grid modern-stat-grid">
      {stats.map(([title,value,Icon]) => <article className="stat-card modern-card" key={title}>
        <div className="stat-icon"><Icon size={20}/></div>
        <small>{title}</small>
        <strong>{loading ? '...' : value}</strong>
      </article>)}
    </div>

    {role !== 'ANGGOTA' && <section className="panel section-gap workflow-panel">
      <div className="panel-title-row"><h2>Quick Action</h2><small>Akses pekerjaan yang paling sering digunakan</small></div>
      <div className="quick-action-grid">
        {actions.map(([to,title,text]) => <Link className="quick-action" to={to} key={to}><span><Plus size={18}/></span><div><b>{title}</b><small>{text}</small></div></Link>)}
      </div>
    </section>}

    <section className="panel section-gap workflow-panel">
      <div className="panel-title-row"><h2>Workflow Monitor</h2><small>Status proses utama</small></div>
      <div className="workflow-modern">
        <div><Bell/><b>Approval</b><span>Menunggu tindakan</span></div>
        <div><ClipboardCheck/><b>Absensi</b><span>Monitoring hari ini</span></div>
        <div><FileText/><b>Laporan</b><span>Dokumen kegiatan</span></div>
      </div>
    </section>

    {role === 'ANGGOTA' && <section className="panel section-gap">
      <h2>Kegiatan Terbuka</h2>
      {activities.length === 0 ? <div className="empty compact">Tidak ada kegiatan terbuka.</div> : activities.map(k => <div className="permission-row" key={k.ID || k.NamaKegiatan}><div><strong>{k.NamaKegiatan || k.Nama}</strong><br/><small>{k.Tanggal || ''}</small></div><Link className="btn" to="/absensi">Buka</Link></div>)}
    </section>}
  </>;
}
