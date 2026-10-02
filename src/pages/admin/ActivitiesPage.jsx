import PageHeader from '../../components/common/PageHeader';
import ModuleToolbar from '../../components/common/ModuleToolbar';
import DataTable from '../../components/common/DataTable';
const columns=[{'key': 'c0', 'label': 'Nama Kegiatan'}, {'key': 'c1', 'label': 'Tanggal'}, {'key': 'c2', 'label': 'Lokasi'}, {'key': 'c3', 'label': 'Radius'}];
export default function Page(){return <><PageHeader eyebrow="KEGIATAN" title="Kegiatan" description="Atur agenda, periode kegiatan, lokasi, serta ketentuan radius absensi."/><section className="panel"><ModuleToolbar placeholder="Cari kegiatan..." addLabel="Tambah Kegiatan"/><DataTable columns={columns} rows={[]} empty="Belum ada data kegiatan. Data aktual akan dimuat melalui service API."/></section></>}