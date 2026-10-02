import PageHeader from '../../components/common/PageHeader';
import ModuleToolbar from '../../components/common/ModuleToolbar';
import DataTable from '../../components/common/DataTable';
const columns=[{'key': 'c0', 'label': 'Nama Anggota'}, {'key': 'c1', 'label': 'Nomor Anggota'}, {'key': 'c2', 'label': 'Status'}, {'key': 'c3', 'label': 'Jabatan'}];
export default function Page(){return <><PageHeader eyebrow="DATA ANGGOTA" title="Anggota" description="Kelola identitas, status keanggotaan, dan informasi anggota SAKA Dirgantara."/><section className="panel"><ModuleToolbar placeholder="Cari anggota..." addLabel="Tambah Anggota"/><DataTable columns={columns} rows={[]} empty="Belum ada data anggota. Data aktual akan dimuat melalui service API."/></section></>}