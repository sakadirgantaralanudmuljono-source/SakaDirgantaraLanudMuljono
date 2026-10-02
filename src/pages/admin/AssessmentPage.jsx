import PageHeader from '../../components/common/PageHeader';
import ModuleToolbar from '../../components/common/ModuleToolbar';
import DataTable from '../../components/common/DataTable';
const columns=[{'key': 'c0', 'label': 'Anggota'}, {'key': 'c1', 'label': 'Komponen'}, {'key': 'c2', 'label': 'Nilai'}, {'key': 'c3', 'label': 'Status'}];
export default function Page(){return <><PageHeader eyebrow="PENILAIAN" title="Penilaian & SKK" description="Kelola komponen penilaian, capaian anggota, dan checklist SKK."/><section className="panel"><ModuleToolbar placeholder="Cari penilaian & skk..." addLabel="Tambah Penilaian & SKK"/><DataTable columns={columns} rows={[]} empty="Belum ada data penilaian & skk. Data aktual akan dimuat melalui service API."/></section></>}