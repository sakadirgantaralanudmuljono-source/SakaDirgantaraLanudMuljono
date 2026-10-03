import { useState } from 'react';
import * as XLSX from 'xlsx';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { maintenanceService } from '../../services/maintenance.service';
import { useAuth } from '../../context/AuthContext';

const order = ['Anggota', 'Kegiatan', 'Kas', 'Inventaris', 'Surat', 'Absensi', 'Pengurus', 'Users'];

export default function Page() {
  const { logout } = useAuth();
  const [report, setReport] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [progress, setProgress] = useState('');

  async function check() {
    setBusy(true);
    try {
      const next = await maintenanceService.check();
      setReport(next);
      setMsg('Pemeriksaan struktur selesai.');
      return next;
    } catch (e) {
      setMsg(e.message);
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function update() {
    const current = report || await check();
    if (!current) return;
    const cleanup = !!current.cleanupRequired;
    if (cleanup && !confirm('Ditemukan sheet/kolom ekstra. Update Struktur akan MENGHAPUS elemen ekstra tersebut. Lanjutkan?')) return;
    setBusy(true);
    try {
      const x = await maintenanceService.update(cleanup);
      setMsg((x.result || []).join('\n'));
      setReport(await maintenanceService.check());
    } catch (e) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!confirm('Reset sesi akan mengeluarkan SEMUA pengguna, termasuk akun ini. Data Spreadsheet tidak dihapus. Lanjutkan?')) return;
    setBusy(true);
    try {
      await maintenanceService.resetSessions();
      await logout();
    } catch (e) {
      setMsg(e.message);
      setBusy(false);
    }
  }

  async function importExcel(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setMsg('File maksimum 5 MB.'); return; }
    if (!confirm('Import menggunakan mode gabung/update. Data lama tidak dihapus. Lanjutkan?')) return;
    setBusy(true);
    let imported = 0;
    let failed = 0;
    let context = { anggotaIdMap: {}, kegiatanIdMap: {} };
    try {
      const buf = await file.arrayBuffer();
      const book = XLSX.read(buf, { type: 'array' });
      let total = 0;
      const parsed = {};
      for (const name of order) {
        if (!book.SheetNames.includes(name)) continue;
        const rows = XLSX.utils.sheet_to_json(book.Sheets[name], { defval: '' });
        parsed[name] = rows.map((x, i) => ({ ...x, __rowNumber: i + 2 }));
        total += rows.length;
      }
      if (!total) throw new Error('Tidak ada sheet yang didukung. Gunakan nama sheet Anggota, Kegiatan, Kas, Inventaris, Surat, Absensi, Pengurus, atau Users.');
      let done = 0;
      for (const name of order) {
        const rows = parsed[name] || [];
        for (let i = 0; i < rows.length; i += 25) {
          setProgress(`${name}: ${done}/${total}`);
          const x = await maintenanceService.importBatch(name, rows.slice(i, i + 25), context);
          context = x.context || context;
          imported += Number(x.imported || 0);
          failed += Number(x.failed || 0);
          done += Math.min(25, rows.length - i);
        }
      }
      await maintenanceService.finishImport({ imported, failed });
      setProgress('');
      setMsg(`Import selesai: ${imported} berhasil, ${failed} gagal.`);
      await check();
    } catch (e) {
      setMsg(`Import berhenti: ${e.message}. Batch yang sudah selesai tetap tersimpan.`);
    } finally {
      setBusy(false);
    }
  }

  const cols = [
    { key: 'sheet', label: 'Sheet' },
    { key: 'exists', label: 'Ada', render: v => v ? 'Ya' : 'Tidak' },
    { key: 'rows', label: 'Baris' },
    { key: 'missingHeaders', label: 'Header Kurang', render: v => (v || []).join(', ') || '—' },
    { key: 'duplicateHeaders', label: 'Duplikat', render: v => (v || []).join(', ') || '—' },
    { key: 'ok', label: 'Status', render: v => v ? 'OK' : 'Perlu Perbaikan' }
  ];

  return <>
    <PageHeader eyebrow="SISTEM" title="System Maintenance" description="Khusus ADMIN: cek struktur, perbarui struktur, impor Excel, lalu reset sesi bila diperlukan." />
    <section className="panel">
      <div className="toolbar">
        <div className="row-actions">
          <button className="btn" disabled={busy} onClick={check}>Cek Struktur</button>
          <button className="btn" disabled={busy} onClick={update}>Update Struktur</button>
          <label className="btn">Import Excel<input hidden type="file" accept=".xlsx,.xls" onChange={importExcel} /></label>
        </div>
        <button className="btn danger" disabled={busy} onClick={reset}>Reset Semua Sesi</button>
      </div>
      {progress && <div className="alert">{progress}</div>}
      {msg && <pre className="system-result">{msg}</pre>}
      {report && <>
        <DataTable columns={cols} rows={report.sheets || []} empty="Tidak ada laporan struktur." />
        {report.extraSheets?.length > 0 && <div className="alert">Sheet ekstra: {report.extraSheets.join(', ')}</div>}
      </>}
    </section>
  </>;
}
