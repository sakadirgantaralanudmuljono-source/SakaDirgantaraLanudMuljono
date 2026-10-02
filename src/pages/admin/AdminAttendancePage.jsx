import PageHeader from '../../components/common/PageHeader';
import ModuleToolbar from '../../components/common/ModuleToolbar';
import DataTable from '../../components/common/DataTable';
const columns=[{'key': 'c0', 'label': 'Anggota'}, {'key': 'c1', 'label': 'Kegiatan'}, {'key': 'c2', 'label': 'Status'}, {'key': 'c3', 'label': 'Waktu'}];
export default function Page(){return <><PageHeader eyebrow="KEHADIRAN" title="Absensi" description="Pantau kehadiran, izin, keterlambatan, dan hasil validasi lokasi anggota."/><section className="panel"><ModuleToolbar placeholder="Cari absensi..." addLabel="Tambah Absensi"/><DataTable columns={columns} rows={[]} empty="Belum ada data absensi. Data aktual akan dimuat melalui service API."/></section></>}