import PageHeader from '../../components/common/PageHeader';
import ModuleToolbar from '../../components/common/ModuleToolbar';
import DataTable from '../../components/common/DataTable';
const columns=[{'key': 'c0', 'label': 'Tanggal'}, {'key': 'c1', 'label': 'Keterangan'}, {'key': 'c2', 'label': 'Jenis'}, {'key': 'c3', 'label': 'Nominal'}];
export default function Page(){return <><PageHeader eyebrow="KEUANGAN" title="Kas Organisasi" description="Catat dan pantau pemasukan, pengeluaran, serta saldo kas organisasi."/><section className="panel"><ModuleToolbar placeholder="Cari kas organisasi..." addLabel="Tambah Kas Organisasi"/><DataTable columns={columns} rows={[]} empty="Belum ada data kas organisasi. Data aktual akan dimuat melalui service API."/></section></>}