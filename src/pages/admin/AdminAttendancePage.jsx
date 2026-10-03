import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { moduleService } from '../../services/module.service';
import { operationsService } from '../../services/operations.service';
import { step2Service } from '../../services/step2.service';
import { useRemoteData } from '../../hooks/useRemoteData';

export default function Page() {
  const { data: members } = useRemoteData(() => moduleService.members(), []);
  const { data: acts } = useRemoteData(() => moduleService.activities(), []);
  const { data: history } = useRemoteData(() => moduleService.attendance().catch(() => []), []);
  const [kid, setKid] = useState('');
  const [rows, setRows] = useState([]);
  const [izin, setIzin] = useState([]);
  const [summary, setSummary] = useState(null);
  const [proof, setProof] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setRows((members || []).filter(x => ['Aktif', 'Calon Anggota'].includes(x.Status)).map(x => ({ AnggotaID: x.ID, Nama: x.Nama, StatusKehadiran: 'Hadir', Catatan: '' })));
  }, [members]);

  async function loadIzin(id = kid) {
    if (!id) { setIzin([]); setSummary(null); return; }
    setBusy(true);
    try {
      const [list, sum] = await Promise.all([
        operationsService.getPermissions(id),
        step2Service.permissionSummary(id).catch(() => null)
      ]);
      setIzin(Array.isArray(list) ? list : []);
      setSummary(sum);
      setMsg('');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { loadIzin(kid); }, [kid]);

  async function save() {
    if (!kid) return;
    setBusy(true);
    try {
      await operationsService.saveBatchAttendance(kid, rows.map(({ AnggotaID, StatusKehadiran, Catatan }) => ({ AnggotaID, StatusKehadiran, Catatan })));
      setMsg('Absensi massal berhasil disimpan.');
    } catch (e) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function verify(x, d) {
    let note = '';
    if (d === 'Ditolak') {
      note = prompt('Alasan penolakan:') || '';
      if (!note) return;
    }
    setBusy(true);
    try {
      await operationsService.verifyPermission(x.ID, d, note);
      setMsg(`Pengajuan ${d.toLowerCase()}.`);
      await loadIzin();
    } catch (e) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function preview(r) {
    try {
      setProof(await step2Service.permissionProof(r.ID));
    } catch (e) {
      setMsg(e.message);
    }
  }

  const recorded = useMemo(() => (history || []).filter(x => !kid || String(x.KegiatanID || x.IDKegiatan || '') === String(kid)), [history, kid]);
  const ac = [
    { key: 'Nama', label: 'Anggota' },
    { key: 'StatusKehadiran', label: 'Status', render: (_, r) => <select value={r.StatusKehadiran} onChange={e => setRows(v => v.map(x => x.AnggotaID === r.AnggotaID ? { ...x, StatusKehadiran: e.target.value } : x))}>{['Hadir', 'Izin', 'Sakit', 'Alpa'].map(x => <option key={x}>{x}</option>)}</select> },
    { key: 'Catatan', label: 'Catatan', render: (_, r) => <input value={r.Catatan} onChange={e => setRows(v => v.map(x => x.AnggotaID === r.AnggotaID ? { ...x, Catatan: e.target.value } : x))} /> }
  ];
  const ic = [
    { key: 'NamaAnggota', label: 'Anggota' },
    { key: 'JenisPengajuan', label: 'Jenis' },
    { key: 'Alasan', label: 'Alasan' },
    { key: 'Status', label: 'Status' },
    { key: '_', label: 'Verifikasi', render: (_, r) => <div className="row-actions">
      <button className="btn small" onClick={() => preview(r)}>Bukti</button>
      {['Menunggu Verifikasi', 'Terkirim'].includes(r.Status) && <>
        <button className="btn small" onClick={() => verify(r, 'Disetujui')}>Setujui</button>
        <button className="btn small danger" onClick={() => verify(r, 'Ditolak')}>Tolak</button>
      </>}
    </div> }
  ];
  const hc = [
    { key: 'NamaAnggota', label: 'Anggota' },
    { key: 'StatusKehadiran', label: 'Status' },
    { key: 'Catatan', label: 'Catatan' }
  ];

  return <>
    <PageHeader eyebrow="KEHADIRAN" title="Absensi Massal & Izin" description="Pilih kegiatan, tinjau bukti izin, lalu simpan absensi massal." />
    <section className="panel">
      <label>Kegiatan <select value={kid} onChange={e => setKid(e.target.value)}><option value="">Pilih kegiatan...</option>{(acts || []).map(x => <option key={x.ID} value={x.ID}>{x.NamaKegiatan} — {x.Tanggal} ({x.Status})</option>)}</select></label>
      {msg && <div className="alert">{msg}</div>}
      {kid && summary && <div className="detail-grid section-gap">
        <div><small>Total izin</small><b>{summary.total ?? summary.jumlah ?? '—'}</b></div>
        <div><small>Menunggu</small><b>{summary.menunggu ?? summary.pending ?? '—'}</b></div>
        <div><small>Disetujui</small><b>{summary.disetujui ?? summary.approved ?? '—'}</b></div>
        <div><small>Ditolak</small><b>{summary.ditolak ?? summary.rejected ?? '—'}</b></div>
      </div>}
      <h3>Pengajuan Izin</h3>
      <DataTable columns={ic} rows={izin} empty={kid ? 'Belum ada pengajuan izin.' : 'Pilih kegiatan.'} />
      {proof?.dataUrl && <div className="proof-preview section-gap">{String(proof.mimeType).startsWith('image/') ? <img src={proof.dataUrl} alt={proof.name || 'Bukti'} /> : <a className="btn" href={proof.dataUrl} target="_blank" rel="noreferrer">Buka {proof.name || 'bukti'}</a>}</div>}
      <h3>Absensi Massal</h3>
      <DataTable columns={ac} rows={kid ? rows : []} empty="Pilih kegiatan terlebih dahulu." />
      <div className="modal-actions"><button className="btn primary" disabled={!kid || busy} onClick={save}>{busy ? 'Memproses...' : 'Simpan Absensi Massal'}</button></div>
      <h3>Riwayat Tercatat</h3>
      <DataTable columns={hc} rows={kid ? recorded : []} empty={kid ? 'Belum ada absensi tercatat untuk kegiatan ini.' : 'Pilih kegiatan.'} searchable pageSize={8} />
    </section>
  </>;
}
