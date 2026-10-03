import { useMemo, useState } from 'react';
import PageHeader from './PageHeader';
import DataTable from './DataTable';
import CrudModal from './CrudModal';
import { crudService } from '../../services/crud.service';
import { step2Service } from '../../services/step2.service';
import { useRemoteData } from '../../hooks/useRemoteData';
import { useAuth } from '../../context/AuthContext';

function allowed(flag, role) {
  if (role === 'ADMIN') return true;
  if (flag == null) return false;
  return String(flag).toUpperCase() === 'TRUE';
}

export default function CrudPage({ eyebrow, title, description, module, loader, columns, fields, normalize = x => x }) {
  const { session } = useAuth();
  const role = String(session?.user?.Role || 'ANGGOTA').toUpperCase();
  const { data, loading, error, reload } = useRemoteData(loader, []);
  const { data: perm } = useRemoteData(() => step2Service.permissions().catch(() => null), []);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState('');
  const rows = useMemo(() => Array.isArray(data) ? data : [], [data]);
  const rule = (perm?.rows || []).find(x => String(x.Role).toUpperCase() === role && String(x.Module).toLowerCase() === String(module).toLowerCase());
  const canCreate = allowed(rule?.CanCreate, role);
  const canEdit = allowed(rule?.CanEdit, role);
  const canDelete = allowed(rule?.CanDelete, role);
  const actionColumns = [...columns, {
    key: '__actions',
    label: 'Aksi',
    render: (_, r) => <div className="row-actions">
      {canEdit && <button disabled={busy} className="btn small" onClick={() => { setEditing(r); setModal(true); }}>Edit</button>}
      {canDelete && <button disabled={busy} className="btn small danger" onClick={() => remove(r)}>Hapus</button>}
      {!canEdit && !canDelete && <span className="muted">Hanya lihat</span>}
    </div>
  }];

  async function save(form) {
    setBusy(true);
    setActionError('');
    try {
      await crudService.save(module, normalize(form));
      setModal(false);
      setEditing(null);
      await reload();
    } catch (e) {
      setActionError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(row) {
    if (!confirm('Hapus data ini? Tindakan ini tidak dapat dibatalkan.')) return;
    setBusy(true);
    setActionError('');
    try {
      await crudService.remove(module, row.ID);
      await reload();
    } catch (e) {
      setActionError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return <>
    <PageHeader eyebrow={eyebrow} title={title} description={description} />
    <section className="panel">
      <div className="toolbar toolbar-between">
        <span>{loading ? 'Memuat...' : `${rows.length} data`}</span>
        <div className="row-actions">
          <button className="btn" onClick={reload}>Muat Ulang</button>
          {canCreate && <button disabled={busy} className="btn primary" onClick={() => { setEditing(null); setModal(true); }}>+ Tambah Data</button>}
        </div>
      </div>
      {(error || actionError) && <div className="alert">{error || actionError}</div>}
      <DataTable columns={actionColumns} rows={rows} empty="Belum ada data." searchable pageSize={12} />
    </section>
    <CrudModal open={modal} title={`${editing ? 'Edit' : 'Tambah'} ${title}`} fields={fields} initial={editing || {}} saving={busy} onClose={() => { setModal(false); setEditing(null); }} onSave={save} />
  </>;
}
