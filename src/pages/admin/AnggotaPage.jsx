import CrudPage from '../../components/common/CrudPage';
import {moduleService} from '../../services/module.service';
import {Users, UserPlus, Search} from 'lucide-react';

const columns=[{key:"Nama",label:"Nama"},{key:"NTA",label:"NTA"},{key:"Status",label:"Status"},{key:"Krida",label:"Krida"}];
const fields=[{"key":"Nama","label":"Nama","required":true},{"key":"JenisKelamin","label":"Jenis Kelamin","type":"select","options":["Laki-laki","Perempuan"]},{"key":"TempatLahir","label":"Tempat Lahir"},{"key":"TanggalLahir","label":"Tanggal Lahir","type":"date"},{"key":"Telepon","label":"No. HP"},{"key":"Krida","label":"Krida"},{"key":"Status","label":"Status","type":"select","options":["Calon Anggota","Aktif","Nonaktif","Alumni"],"required":true},{"key":"Alamat","label":"Alamat","type":"textarea","full":true}];

export default function Page(){
 return <div className="module-page">
   <div className="module-overview-grid">
    <div className="module-summary"><Users/><div><small>Total Anggota</small><b>Data Terintegrasi</b></div></div>
    <div className="module-summary"><UserPlus/><div><small>Aksi Cepat</small><b>Tambah Anggota Baru</b></div></div>
    <div className="module-summary"><Search/><div><small>Pencarian</small><b>Filter Data Cepat</b></div></div>
   </div>
   <CrudPage eyebrow="DATA ANGGOTA" title="Anggota" description="Tambah atau perbarui data anggota, lalu cari berdasarkan nama atau informasi keanggotaan." module="anggota" loader={()=>moduleService.members()} columns={columns} fields={fields}/>
 </div>
}
