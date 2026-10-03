import { Link } from 'react-router-dom';
import { Users, CalendarDays, ClipboardCheck, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import { moduleService } from '../../services/module.service';
import { attendanceService } from '../../services/attendance.service';
import { useRemoteData } from '../../hooks/useRemoteData';

export default function DashboardPage() {
  const { session } = useAuth();
  const role = String(session?.user?.Role || 'ANGGOTA').toUpperCase();
  const { data, loading, error, reload } = useRemoteData(() => moduleService.dashboard(), []);
  const { data: openActs } = useRemoteData(() => role === 'ANGGOTA' ? attendanceService.dashboardActivities().catch(() => []) : Promise.resolve([]), [role]);
  const member = data?.anggotaDashboard;
  const d = data?.dashboard;
  const activities = Array.isArray(openActs) ? openActs : (openActs?.items || openActs?.activities || []);
  const stats = role === 'ANGGOTA'
    ? [['Total Kehadiran', member?.jumlahAbsensi?.total ?? '—', ClipboardCheck], ['Hadir', member?.jumlahAbsensi?.hadir ?? '—', ClipboardCheck], ['Pengajuan Izin', member?.izin?.length ?? '—', CalendarDays], ['Status', member?.profile?.Status || '—', Users]]
    : [['Anggota Aktif', d?.anggotaAktif ?? '—', Users], ['Kegiatan Bulan Ini', d?.kegiatanBulanIni ?? '—', CalendarDays], ['Kehadiran Bulan Ini', d?.tingkatKehadiranBulanIni == null ? '—' : d.tingkatKehadiranBulanIni + '%', ClipboardCheck], ['Saldo Kas', d?.saldo == null ? '—' : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(d.saldo), Wallet]];
  const shortcuts = role === 'ANGGOTA'
    ? [['/absensi', 'Absensi & Izin', 'Catat hadir atau ajukan izin pada kegiatan yang terbuka.'], ['/penilaian', 'Penilaian Saya', 'Lihat nilai dan predikat terakhir.'], ['/profil', 'Profil Saya', 'Periksa data anggota yang tersimpan.']]
    : [['/kegiatan', 'Kegiatan', 'Buat kegiatan, ubah status, dan atur izin.'], ['/absensi', 'Absensi', 'Verifikasi izin lalu simpan absensi massal.'], ['/notifications', 'Action Center', 'Proses pengajuan yang menunggu tindakan.'], ['/activity-details', 'Detail Kegiatan', 'Inventaris, dokumentasi, laporan, dan PDF.']];

  return <>
    <PageHeader eyebrow="RINGKASAN" title={role === 'ANGGOTA' ? 'Beranda Anggota' : 'Dashboard'} description="Data diambil langsung dari backend Google Apps Script." />
    <div className="toolbar"><span>{loading ? 'Memuat dashboard...' : 'Backend terhubung'}</span><button className="btn" onClick={reload}>Muat Ulang</button></div>
    {error && <div className="alert">{error}</div>}
    <div className="stat-grid">{stats.map(([a, b, Icon]) => <article className="stat-card" key={a}><div className="stat-icon"><Icon size={19} /></div><small>{a}</small><strong>{b}</strong></article>)}</div>
    <section className="panel section-gap">
      <h2>{role === 'ANGGOTA' ? 'Langkah berikutnya' : 'Alur kerja hari ini'}</h2>
      <div className="shortcut-grid">
        {shortcuts.map(([to, title, text]) => <Link key={to} className="shortcut" to={to}><b>{title}</b><span>{text}</span></Link>)}
      </div>
    </section>
    {role === 'ANGGOTA' && <section className="panel section-gap">
      <h2>Kegiatan terbuka</h2>
      {activities.length === 0 ? <div className="empty compact">Tidak ada kegiatan terbuka pada dasbor anggota.</div> : activities.map(k => <div className="permission-row" key={k.ID || k.NamaKegiatan}><div><strong>{k.NamaKegiatan || k.Nama}</strong><br /><small>{String(k.Tanggal || '').slice(0, 10)} · {k.Status || k.message || 'Siap absensi'}</small></div><Link className="btn" to="/absensi">Buka Absensi</Link></div>)}
    </section>}
  </>;
}
