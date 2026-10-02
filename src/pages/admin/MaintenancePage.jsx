import PageHeader from '../../components/common/PageHeader';
import ModuleToolbar from '../../components/common/ModuleToolbar';
import DataTable from '../../components/common/DataTable';
const columns=[{'key': 'c0', 'label': 'Fitur'}, {'key': 'c1', 'label': 'Keterangan'}, {'key': 'c2', 'label': 'Status'}, {'key': 'c3', 'label': 'Aksi'}];
export default function Page(){return <><PageHeader eyebrow="SISTEM" title="System Maintenance" description="Konfigurasi, pemeriksaan data, impor/ekspor, dan pemeliharaan aplikasi."/><section className="panel"><ModuleToolbar placeholder="Cari system maintenance..." addLabel="Tambah System Maintenance"/><DataTable columns={columns} rows={[]} empty="Belum ada data system maintenance. Data aktual akan dimuat melalui service API."/></section></>}