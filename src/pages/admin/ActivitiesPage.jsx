import { useEffect, useMemo, useRef, useState } from 'react';
import {useSearchParams,useNavigate} from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import CrudModal from '../../components/common/CrudModal';
import ActionSheet from '../../components/common/ActionSheet';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import { FileText, Pencil, RefreshCcw, ShieldCheck, UsersRound, Trash2 } from 'lucide-react';
import { moduleService } from '../../services/module.service';
import { crudService } from '../../services/crud.service';
import { operationsService } from '../../services/operations.service';
import { useRemoteData } from '../../hooks/useRemoteData';

const fields = [
  { key: 'NamaKegiatan', label: 'Nama Kegiatan', required: true },
  { key: 'Tanggal', label: 'Tanggal', type: 'date', required: true },
  { key: 'Jenis', label: 'Jenis', type: 'select', options: ['Latihan', 'Rapat', 'Pendidikan', 'Bakti Sosial', 'Kunjungan', 'Upacara', 'Lainnya'] },
  { key: 'Lokasi', label: 'Lokasi' },
  { key: 'PenanggungJawab', label: 'Penanggung Jawab' },
  { key: 'AbsensiMulai', label: 'Absensi Mulai', type: 'time' },
  { key: 'AbsensiSelesai', label: 'Absensi Selesai', type: 'time' },
  { key: 'RadiusAktif', label: 'Radius', type: 'select', options: ['Aktif', 'Nonaktif'] },
  { key: 'AbsensiLatitude', label: 'Latitude', type: 'number', step: 'any' },
  { key: 'AbsensiLongitude', label: 'Longitude', type: 'number', step: 'any' },
  { key: 'AbsensiRadiusMeter', label: 'Radius Meter', type: 'number', min: '1' }
];

export default function Page() {
  const [params]=useSearchParams();
  const navigate=useNavigate();
  const openedId=useRef('');
  const { data, loading, error, reload } = useRemoteData(() => moduleService.activities(), []);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [active, setActive] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  useEffect(() => { if (active) setActive((data || []).find(x => x.ID === active.ID) || null); }, [data]);
  useEffect(()=>{const id=params.get('kegiatanId');if(id&&data&&openedId.current!==id){const row=data.find(x=>String(x.ID)===id);if(row){openedId.current=id;setActive(row);setEditing(row);if(!['Selesai','Dibatalkan'].includes(row.Status))setModal(true)}}},[params,data]);

  async function run(fn, success) {
    setBusy(true);
    setMsg('');
    try {
      await fn();
      await reload();
      if (success) setMsg(success);
      return true;
    } catch (e) {
      setMsg(e.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function save(x) {
    const saved = await run(() => crudService.save('kegiatan', x), editing ? 'Kegiatan diperbarui.' : 'Kegiatan ditambahkan.');
    if (saved) { setModal(false); setEditing(null); }
  }

  async function del(r) {
    if (confirm('Hapus kegiatan ini?')) await run(() => crudService.remove('kegiatan', r.ID), 'Kegiatan dihapus.');
  }

  async function trans(r, target) {
    let alasan = '';
    if (target === 'Dibatalkan') {
      alasan = prompt('Alasan pembatalan:') || '';
      if (!alasan) return;
    }
    await run(() => operationsService.transition(r.ID, target, alasan), 'Status kegiatan diperbarui.');
  }

  async function rule(r) {
    const days = prompt('Batas izin mulai H-berapa?', String(r.BatasIzinHari || 3));
    if (days === null) return;
    const time = prompt('Jam tutup izin Hari H (HH:mm):', String(r.JamTutupIzin || '07:00'));
    if (time === null) return;
    const hh = confirm('Izinkan pengajuan pada Hari H?');
    await run(() => operationsService.updateIzinRule({ ID: r.ID, BatasIzinHari: Number(days), IzinHariH: hh, JamTutupIzin: time }), 'Aturan izin disimpan.');
  }

  async function copyLink(kind, id) {
    try {
      const x = kind === 'absen' ? await operationsService.attendanceLink(id) : await operationsService.permissionLink(id);
      const url = x?.url || x?.link;
      if (!url) throw new Error('Tautan belum tersedia dari backend.');
      await navigator.clipboard.writeText(url);
      setMsg(kind === 'absen' ? 'Tautan absensi disalin.' : 'Tautan pengajuan izin disalin.');
    } catch (e) {
      setMsg(e.message || 'Tautan tidak dapat disalin.');
    }
  }

  async function closeIzin(r) {
    if (!confirm('Tutup pengajuan izin untuk kegiatan ini?')) return;
    await run(() => operationsService.closeIzin(r.ID), 'Pengajuan izin ditutup.');
  }

  const cols = useMemo(() => [
    { key: 'NamaKegiatan', label: 'Kegiatan' },
    { key: 'Tanggal', label: 'Tanggal' },
    { key: 'Status', label: 'Status' },
    { key: '__', label: 'Aksi', render: (_, r) => <button className="btn small" onClick={() => setSheet(r)}>⋮</button> }
  ], []);

  return <>
    <PageHeader eyebrow="KEGIATAN" title="Kegiatan" description="Alur kerja: buat kegiatan, buka absensi, atur izin, lalu lanjut ke detail laporan." />
    <section className="panel">
      <div className="toolbar toolbar-between">
        <span>{loading ? 'Memuat...' : `${(data || []).length} kegiatan`}</span>
        <button className="btn primary" onClick={() => { setEditing(null); setModal(true); }}>+ Tambah Kegiatan</button>
      </div>
      {(error || msg) && <div className="alert">{error || msg}</div>}
      <DataTable columns={cols} rows={data || []} empty="Belum ada kegiatan." searchable pageSize={5} />
    </section>
    {active && <section className="panel section-gap">
      <div className="toolbar toolbar-between">
        <div><h2>{active.NamaKegiatan}</h2><span className="muted">{active.Tanggal} · Status {active.Status || '-'}</span></div>
        <button className="btn" onClick={() => setActive(null)}>Tutup</button>
      </div>
      <div className="workflow">
        <div><small>1. Data</small><div className="row-actions"><button className="btn small" onClick={() => { setEditing(active); setModal(true); }}>Edit Kegiatan</button></div></div>
        <div><small>2. Status operasional</small><div className="row-actions">{active.Status === 'Rencana' && <button className="btn small" disabled={busy} onClick={() => trans(active, 'Berjalan')}>Mulai</button>}{active.Status === 'Berjalan' && <button className="btn small" disabled={busy} onClick={() => trans(active, 'Selesai')}>Selesai</button>}{!['Selesai', 'Dibatalkan'].includes(active.Status) && <button className="btn small" disabled={busy} onClick={() => trans(active, 'Dibatalkan')}>Batalkan</button>}</div></div>
        <div><small>3. Izin anggota</small><div className="row-actions"><button className="btn small" disabled={busy} onClick={() => rule(active)}>Atur Izin</button><button className="btn small" disabled={busy} onClick={() => closeIzin(active)}>Tutup Izin</button><button className="btn small" disabled={busy} onClick={() => copyLink('izin', active.ID)}>Salin Link Izin</button></div></div>
        <div><small>4. Absensi</small><div className="row-actions"><button className="btn small" disabled={busy} onClick={() => copyLink('absen', active.ID)}>Salin Link Absen</button></div></div>
      </div>
      <div className="modal-actions"><button className="btn small danger" disabled={busy} onClick={() => del(active)}>Hapus Kegiatan</button></div>
    </section>}
    <ActionSheet open={!!sheet} title={sheet?.NamaKegiatan || 'Kelola Kegiatan'} onClose={() => setSheet(null)} items={[
      {label:'Detail Kegiatan', icon:<FileText size={20}/>, onClick:()=>navigate('/activity-details?kegiatanId='+encodeURIComponent(sheet.ID))},
      {label:'Edit Kegiatan', icon:<Pencil size={20}/>, onClick:()=>{setEditing(sheet);setModal(true);}},
      ...(sheet?.Status==='Rencana'?[{label:'Mulai Kegiatan',icon:<RefreshCcw size={20}/>,onClick:()=>trans(sheet,'Berjalan')}]:sheet?.Status==='Berjalan'?[{label:'Selesaikan Kegiatan',icon:<RefreshCcw size={20}/>,onClick:()=>trans(sheet,'Selesai')}]:[]),
      {label:'Atur Izin', icon:<ShieldCheck size={20}/>, onClick:()=>rule(sheet)},
      {label:'Link Absensi', icon:<UsersRound size={20}/>, onClick:()=>copyLink('absen',sheet.ID)},
      {label:'Hapus Kegiatan', icon:<Trash2 size={20}/>, danger:true, onClick:()=>del(sheet)}
    ]}/>
    <LoadingOverlay open={busy} message="Memproses kegiatan" progress={75}/>
    <CrudModal open={modal} title={editing ? 'Edit Kegiatan' : 'Tambah Kegiatan'} fields={fields} initial={editing || {AbsensiMulai:'00:00',AbsensiSelesai:'23:59',RadiusAktif:'Nonaktif'}} saving={busy} onClose={() => setModal(false)} onSave={save} />
  </>;
}
