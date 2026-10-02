import PageHeader from '../../components/common/PageHeader';
import ModuleToolbar from '../../components/common/ModuleToolbar';
import DataTable from '../../components/common/DataTable';
const columns=[{'key': 'c0', 'label': 'Nama'}, {'key': 'c1', 'label': 'Jabatan'}, {'key': 'c2', 'label': 'Periode'}, {'key': 'c3', 'label': 'Status'}];
export default function Page(){return <><PageHeader eyebrow="ORGANISASI" title="Struktur Pengurus" description="Kelola susunan pengurus, jabatan, dan periode kepengurusan."/><section className="panel"><ModuleToolbar placeholder="Cari struktur pengurus..." addLabel="Tambah Struktur Pengurus"/><DataTable columns={columns} rows={[]} empty="Belum ada data struktur pengurus. Data aktual akan dimuat melalui service API."/></section></>}