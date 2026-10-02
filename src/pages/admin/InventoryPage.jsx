import PageHeader from '../../components/common/PageHeader';
import ModuleToolbar from '../../components/common/ModuleToolbar';
import DataTable from '../../components/common/DataTable';
const columns=[{'key': 'c0', 'label': 'Barang'}, {'key': 'c1', 'label': 'Jumlah'}, {'key': 'c2', 'label': 'Kondisi'}, {'key': 'c3', 'label': 'Lokasi'}];
export default function Page(){return <><PageHeader eyebrow="ASET" title="Inventaris" description="Kelola barang, jumlah, kondisi, dan riwayat inventaris organisasi."/><section className="panel"><ModuleToolbar placeholder="Cari inventaris..." addLabel="Tambah Inventaris"/><DataTable columns={columns} rows={[]} empty="Belum ada data inventaris. Data aktual akan dimuat melalui service API."/></section></>}