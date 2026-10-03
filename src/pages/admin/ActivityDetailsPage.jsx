import { useRef, useState } from 'react';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import CrudModal from '../../components/common/CrudModal';
import { moduleService } from '../../services/module.service';
import { step2Service } from '../../services/step2.service';
import { operationsService } from '../../services/operations.service';
import { useRemoteData } from '../../hooks/useRemoteData';

const toFile = f => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res({ name: f.name, mimeType: f.type, base64: String(r.result).split(',')[1] });
  r.onerror = rej;
  r.readAsDataURL(f);
});
const today = () => new Date().toISOString().slice(0, 10);

export default function Page() {
  const { data: acts } = useRemoteData(() => moduleService.activities(), []);
  const { data: inventory } = useRemoteData(() => moduleService.inventory(), []);
  const [kid, setKid] = useState('');
  const [activitySearch, setActivitySearch] = useState('');
  const [activityMonth, setActivityMonth] = useState('');
  const [activityPeriod, setActivityPeriod] = useState('');
  const [data, setData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [modal, setModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const acting = useRef(false);
  const uses = data?.inventarisKegiatan || [];
  const docs = data?.dokumentasi || [];
  const report = data?.laporan || {};
  const filteredActivities = (acts || []).filter(x => {
    const text = `${x.NamaKegiatan || ''} ${x.Lokasi || ''}`.toLowerCase();
    const okText = !activitySearch || text.includes(activitySearch.toLowerCase());
    const okMonth = !activityMonth || String(x.Tanggal || '').slice(5,7) === activityMonth;
    const okPeriod = !activityPeriod || String(x.Periode || x.Tahun || '').includes(activityPeriod);
    return okText && okMonth && okPeriod;
  });

  async function load(id = kid) {
    if (!id) { setData(null); setSummary(null); return; }
    setBusy(true);
    setMsg('');
    try {
      const [rep, sum] = await Promise.all([
        step2Service.report(id),
        step2Service.permissionSummary(id).catch(() => null)
      ]);
      let rows = rep?.inventarisKegiatan;
      if (!Array.isArray(rows)) {
        try { rows = await step2Service.activityInventory(id); } catch { rows = []; }
      }
      setData({ ...(rep || {}), inventarisKegiatan: rows || [] });
      setSummary(sum);
    } catch (e) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function act(fn, ok) {
    if (acting.current) throw new Error('Tunggu proses sebelumnya selesai.');
    acting.current = true;
    setBusy(true);
    setMsg('');
    try {
      const result = await fn();
      let warning = '';
      try {
        const rep = await step2Service.report(kid);
        let rows = rep?.inventarisKegiatan;
        if (!Array.isArray(rows)) {
          try { rows = await step2Service.activityInventory(kid); } catch { rows = []; }
        }
        setData({ ...(rep || {}), inventarisKegiatan: rows || [] });
        setSummary(await step2Service.permissionSummary(kid).catch(() => summary));
      } catch (e) {
        warning = ' Data tampilan belum diperbarui: ' + e.message;
      }
      setMsg((ok || 'Perubahan tersimpan.') + warning);
      return result;
    } catch (e) {
      setMsg(e.message);
      throw e;
    } finally {
      acting.current = false;
      setBusy(false);
    }
  }

  async function upload(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 2400 * 1024) { setMsg('Foto maksimum sekitar 2,3 MB.'); return; }
    try { await act(async () => step2Service.uploadDoc(kid, { ...(await toFile(file)), keterangan: '' }), 'Dokumentasi diunggah.'); } catch { /* pesan sudah diisi */ }
  }

  async function invPhoto(r, phase, file) {
    if (!file) return;
    if (file.size > 2400 * 1024) { setMsg('Foto maksimum sekitar 2,3 MB.'); return; }
    try {
      const payload = await toFile(file);
      await act(() => step2Service.uploadInventoryPhoto(kid, r.ID, phase, payload), 'Foto kondisi inventaris tersimpan.');
    } catch { /* pesan sudah diisi */ }
  }

  async function pdf() {
    if (acting.current) return;
    const tab = window.open('about:blank', '_blank');
    if (tab) tab.opener = null;
    setPdfUrl('');
    try {
      const x = await act(() => step2Service.generateReportPdf(kid), 'PDF laporan berhasil dibuat.');
      const url = new URL(x?.url || '');
      if (url.protocol !== 'https:') throw new Error('Tautan PDF dari backend tidak valid.');
      setPdfUrl(url.href);
      if (tab) tab.location.replace(url.href);
    } catch (e) {
      if (tab) tab.close();
      setMsg(e.message || 'PDF tidak dapat dibuka.');
    }
  }

  async function copyLink(kind) {
    try {
      const x = kind === 'absen' ? await step2Service.attendanceLink(kid) : await step2Service.permissionLink(kid);
      const url = x?.url || x?.link;
      if (!url) throw new Error('Tautan belum tersedia.');
      await navigator.clipboard.writeText(url);
      setMsg(kind === 'absen' ? 'Tautan absensi disalin.' : 'Tautan izin disalin.');
    } catch (e) {
      setMsg(e.message);
    }
  }

  const invFields = [
    { key: 'InventarisID', label: 'Barang', type: 'select', required: true, options: (inventory || []).map(x => ({ value: x.ID, label: `${x.NamaBarang} (tersedia ${x.Tersedia ?? x.Jumlah ?? 0})` })) },
    { key: 'JumlahDipakai', label: 'Jumlah Dipakai', type: 'number', min: '1', required: true },
    { key: 'StatusPemakaian', label: 'Status', type: 'select', options: ['Dipakai', 'Selesai'] },
    { key: 'Keterangan', label: 'Keterangan', type: 'textarea', full: true }
  ];
  const reportFields = [
    { key: 'JamMulai', label: 'Jam Mulai', type: 'time' },
    { key: 'JamSelesai', label: 'Jam Selesai', type: 'time' },
    { key: 'Cuaca', label: 'Cuaca', type: 'select', options: ['Cerah', 'Berawan', 'Mendung', 'Hujan', 'Hujan Lebat', 'Lainnya'] },
    { key: 'JumlahPamongInstruktur', label: 'Jumlah Pamong/Instruktur', type: 'number', min: '0' },
    { key: 'FokusKrida', label: 'Fokus Krida' },
    { key: 'TopikMateri', label: 'Topik Materi', type: 'textarea', full: true },
    { key: 'Instruktur', label: 'Instruktur/Pemateri' },
    { key: 'Pencapaian', label: 'Pencapaian', type: 'textarea', full: true },
    { key: 'Kendala', label: 'Kendala', type: 'textarea', full: true },
    { key: 'TindakLanjut', label: 'Tindak Lanjut', type: 'textarea', full: true },
    { key: 'TempatLaporan', label: 'Tempat Laporan' },
    { key: 'TanggalLaporan', label: 'Tanggal Laporan', type: 'date' },
    { key: 'Penandatangan1Nama', label: 'Penandatangan 1' },
    { key: 'Penandatangan1Jabatan', label: 'Jabatan 1' },
    { key: 'Penandatangan2Nama', label: 'Penandatangan 2' },
    { key: 'Penandatangan2Jabatan', label: 'Jabatan 2' }
  ];
  const docFields = [
    { key: 'Keterangan', label: 'Keterangan', type: 'textarea', full: true },
    { key: 'Urutan', label: 'Urutan', type: 'number', min: '1' }
  ];
  const invCols = [
    { key: 'NamaBarang', label: 'Barang' },
    { key: 'JumlahDipakai', label: 'Dipakai' },
    { key: 'JumlahKembali', label: 'Kembali' },
    { key: 'StatusPemakaian', label: 'Status' },
    { key: '_', label: 'Aksi', render: (_, r) => <div className="row-actions">
      <button className="btn small" onClick={() => { setEditing(r); setModal('inv'); }}>Edit</button>
      <label className="btn small">Foto Awal<input hidden type="file" accept="image/*" onChange={e => invPhoto(r, 'Awal', e.target.files?.[0])} /></label>
      <label className="btn small">Foto Setelah<input hidden type="file" accept="image/*" onChange={e => invPhoto(r, 'Setelah', e.target.files?.[0])} /></label>
      <button className="btn small danger" onClick={() => confirm('Hapus pemakaian barang ini?') && act(() => step2Service.deleteActivityInventory(r.ID), 'Riwayat inventaris dihapus.')}>Hapus</button>
    </div> }
  ];
  const docCols = [
    { key: 'NamaFile', label: 'File' },
    { key: 'Keterangan', label: 'Keterangan' },
    { key: 'Uploader', label: 'Uploader' },
    { key: 'Urutan', label: 'Urutan' },
    { key: '_', label: 'Aksi', render: (_, r) => <div className="row-actions">
      <button className="btn small" onClick={async () => { try { const x = await step2Service.previewDoc(r.ID); if (x?.dataUrl) window.open(x.dataUrl, '_blank'); } catch (e) { setMsg(e.message); } }}>Preview</button>
      <button className="btn small" onClick={() => { setEditing(r); setModal('doc'); }}>Edit</button>
      <button className="btn small danger" onClick={() => confirm('Hapus dokumentasi ini?') && act(() => step2Service.deleteDoc(r.ID), 'Dokumentasi dihapus.')}>Hapus</button>
    </div> }
  ];
  const sum = summary || {};

  return <>
    <PageHeader eyebrow="DETAIL KEGIATAN" title="Detail & Laporan Kegiatan" description="Urutan kerja: pilih kegiatan, cek izin, catat inventaris, unggah dokumentasi, isi laporan, lalu buat PDF." />
    <section className="panel">
      <div className="activity-picker">
        <input placeholder="Cari kegiatan..." value={activitySearch} onChange={e=>setActivitySearch(e.target.value)} />
        <select value={activityMonth} onChange={e=>setActivityMonth(e.target.value)}>
          <option value="">Semua Bulan</option>
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(m=><option key={m} value={String(m).padStart(2,'0')}>Bulan {m}</option>)}
        </select>
        <select value={activityPeriod} onChange={e=>setActivityPeriod(e.target.value)}>
          <option value="">Semua Periode</option>
          {[...new Set((acts || []).map(x=>String(x.Periode || x.Tahun || '').trim()).filter(Boolean))].map(p=><option key={p} value={p}>{p}</option>)}
        </select>
        <select disabled={busy} value={kid} onChange={e => { setPdfUrl(''); setData(null); setSummary(null); setKid(e.target.value); load(e.target.value); }}>
          <option value="">Pilih kegiatan...</option>{filteredActivities.map(x => <option key={x.ID} value={x.ID}>{x.NamaKegiatan} — {x.Tanggal}</option>)}
        </select>
       </div>
      {msg && <div className="alert" role="status" aria-live="polite">{msg}</div>}
    </section>
    {kid && <>
      <section className="panel section-gap">
        <div className="toolbar toolbar-between">
          <h2>Ringkasan Izin</h2>
          <div className="row-actions">
            <button className="btn small" disabled={busy} onClick={() => copyLink('absen')}>Salin Link Absen</button>
            <button className="btn small" disabled={busy} onClick={() => copyLink('izin')}>Salin Link Izin</button>
            <button className="btn small" disabled={busy} onClick={() => confirm('Tutup pengajuan izin kegiatan ini?') && act(() => operationsService.closeIzin(kid), 'Pengajuan izin ditutup.')}>Tutup Izin</button>
          </div>
        </div>
        <div className="stat-grid compact-stats">
          <article className="stat-card"><small>Total</small><strong>{sum.total ?? sum.jumlah ?? '—'}</strong></article>
          <article className="stat-card"><small>Menunggu</small><strong>{sum.menunggu ?? sum.pending ?? '—'}</strong></article>
          <article className="stat-card"><small>Disetujui</small><strong>{sum.disetujui ?? sum.approved ?? '—'}</strong></article>
          <article className="stat-card"><small>Ditolak</small><strong>{sum.ditolak ?? sum.rejected ?? '—'}</strong></article>
        </div>
      </section>
      <section className="panel section-gap">
        <div className="toolbar toolbar-between"><h2>Pemakaian Inventaris</h2><button className="btn" onClick={() => { setEditing(null); setModal('inv'); }}>+ Catat Barang</button></div>
        <DataTable columns={invCols} rows={uses} empty="Belum ada pemakaian inventaris." />
      </section>
      <section className="panel section-gap">
        <div className="toolbar toolbar-between"><h2>Dokumentasi</h2><label className="btn">+ Upload Foto<input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} /></label></div>
        <DataTable columns={docCols} rows={docs} empty="Belum ada dokumentasi." />
      </section>
      <section className="panel section-gap">
        <div className="toolbar toolbar-between">
          <div><h2>Laporan Kegiatan</h2><span className="muted">{report?.PDFUrl ? 'PDF laporan sudah tersedia.' : 'Lengkapi laporan sebelum membuat PDF.'}</span></div>
          <div className="row-actions">
            <button className="btn" onClick={() => { setEditing(report); setModal('report'); }}>Isi / Edit Laporan</button>
            <button className="btn primary" disabled={busy} onClick={pdf}>{busy ? 'Memproses...' : 'Generate PDF'}</button>
            {(pdfUrl || report?.PDFUrl) && <a className="btn" href={pdfUrl || report.PDFUrl} target="_blank" rel="noopener noreferrer">Buka PDF</a>}
          </div>
        </div>
      </section>
    </>}
    <LoadingOverlay open={busy} message="Memuat detail kegiatan" progress={70}/>
    <CrudModal open={modal === 'inv'} title={editing ? 'Edit Pemakaian Inventaris' : 'Catat Pemakaian Inventaris'} fields={invFields} initial={editing || { StatusPemakaian: 'Dipakai' }} saving={busy} onClose={() => { setModal(null); setEditing(null); }} onSave={async x => { try { await act(() => step2Service.saveActivityInventory(kid, x), 'Inventaris tersimpan.'); setModal(null); setEditing(null); } catch { /* pesan sudah diisi */ } }} />
    <CrudModal open={modal === 'doc'} title="Edit Dokumentasi" fields={docFields} initial={editing || {}} saving={busy} onClose={() => { setModal(null); setEditing(null); }} onSave={async x => { try { await act(() => step2Service.updateDoc(editing.ID, x), 'Dokumentasi diperbarui.'); setModal(null); setEditing(null); } catch { /* pesan sudah diisi */ } }} />
    <CrudModal open={modal === 'report'} title="Laporan Kegiatan" fields={reportFields} initial={{ ...report, TanggalLaporan: report.TanggalLaporan || today() }} saving={busy} onClose={() => setModal(null)} onSave={async x => { try { await act(() => step2Service.saveReport(kid, x), 'Laporan tersimpan.'); setModal(null); } catch { /* pesan sudah diisi */ } }} />
  </>;
}
