import PageHeader from '../../components/common/PageHeader';
import ModuleToolbar from '../../components/common/ModuleToolbar';
import DataTable from '../../components/common/DataTable';
const columns=[{'key': 'c0', 'label': 'Username'}, {'key': 'c1', 'label': 'Nama'}, {'key': 'c2', 'label': 'Role'}, {'key': 'c3', 'label': 'Status'}];
export default function Page(){return <><PageHeader eyebrow="AKSES SISTEM" title="Pengguna" description="Kelola akun login, role, status, dan hak akses pengguna."/><section className="panel"><ModuleToolbar placeholder="Cari pengguna..." addLabel="Tambah Pengguna"/><DataTable columns={columns} rows={[]} empty="Belum ada data pengguna. Data aktual akan dimuat melalui service API."/></section></>}