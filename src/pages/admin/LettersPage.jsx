import PageHeader from '../../components/common/PageHeader';
import ModuleToolbar from '../../components/common/ModuleToolbar';
import DataTable from '../../components/common/DataTable';
const columns=[{'key': 'c0', 'label': 'Nomor'}, {'key': 'c1', 'label': 'Perihal'}, {'key': 'c2', 'label': 'Jenis'}, {'key': 'c3', 'label': 'Tanggal'}];
export default function Page(){return <><PageHeader eyebrow="ADMINISTRASI" title="Surat" description="Kelola surat masuk, surat keluar, nomor surat, dan dokumen administrasi."/><section className="panel"><ModuleToolbar placeholder="Cari surat..." addLabel="Tambah Surat"/><DataTable columns={columns} rows={[]} empty="Belum ada data surat. Data aktual akan dimuat melalui service API."/></section></>}