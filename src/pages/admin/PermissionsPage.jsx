import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { step2Service } from '../../services/step2.service';

export default function Page() {
  const [data, setData] = useState(null);
  const [rows, setRows] = useState([]);
  const [role, setRole] = useState('PENGURUS');
  const [msg, setMsg] = useState('');

  async function load() {
    try {
      const x = await step2Service.permissions();
      setData(x);
      setRows(x.rows || []);
    } catch (e) {
      setMsg(e.message);
    }
  }

  useEffect(() => { load(); }, []);

  const shown = (data?.modules || []).map(m => rows.find(x => x.Role === role && x.Module === m) || { Role: role, Module: m, CanView: 'FALSE', CanCreate: 'FALSE', CanEdit: 'FALSE', CanDelete: 'FALSE' });

  function toggle(r, k) {
    setRows(v => {
      const rest = v.filter(x => !(x.Role === role && x.Module === r.Module));
      return [...rest, { ...r, [k]: String(r[k]).toUpperCase() === 'TRUE' ? 'FALSE' : 'TRUE' }];
    });
  }

  async function save() {
    try {
      await step2Service.savePermissions(shown);
      setMsg('Permission berhasil disimpan untuk peran yang dipilih. Peran lain tetap dipertahankan.');
      await load();
    } catch (e) {
      setMsg(e.message);
    }
  }

  const cols = [{ key: 'Module', label: 'Modul' }, ...['CanView', 'CanCreate', 'CanEdit', 'CanDelete'].map(k => ({ key: k, label: k.replace('Can', ''), render: (_, r) => <input type="checkbox" checked={String(r[k]).toUpperCase() === 'TRUE'} onChange={() => toggle(r, k)} /> }))];

  return <>
    <PageHeader eyebrow="AKSES" title="Role Permission" description="Khusus ADMIN. Simpan hanya mengubah peran yang sedang dibuka. Backend tetap memvalidasi setiap operasi." />
    <section className="panel">
      <div className="toolbar">
        <select value={role} onChange={e => setRole(e.target.value)}><option>PENGURUS</option><option>ANGGOTA</option></select>
        <button className="btn primary" onClick={save}>Simpan Permission</button>
      </div>
      {msg && <div className="alert">{msg}</div>}
      <DataTable columns={cols} rows={shown} empty="Memuat permission..." />
    </section>
  </>;
}
