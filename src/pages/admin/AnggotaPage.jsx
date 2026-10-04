import {useEffect, useState} from 'react';
import CrudPage from '../../components/common/CrudPage';
import {moduleService} from '../../services/module.service';
import {Download} from 'lucide-react';

const columns=[{key:"Nama",label:"Nama"},{key:"Jabatan",label:"Jabatan"},{key:"SekolahInstansi",label:"Sekolah / Instansi"},{key:"Status",label:"Status"}];
const statusOptions=["Calon Anggota","Aktif","Nonaktif","Alumni","Keluar"];
const fields=[
 {"key":"Nama","label":"Nama","required":true},
 {"key":"JenisKelamin","label":"Jenis Kelamin","type":"select","options":["Laki-laki","Perempuan"]},
 {"key":"TempatLahir","label":"Tempat Lahir"},
 {"key":"TanggalLahir","label":"Tanggal Lahir","type":"date"},
 {"key":"Telepon","label":"No. HP"},
 {"key":"Krida","label":"Krida"},
 {"key":"Status","label":"Status","type":"select","options":statusOptions,"required":true},
 {"key":"Alamat","label":"Alamat","type":"textarea","full":true}
];

function generatePdf(rows){
 const statusOrder=['PENGURUS','AKTIF','NONAKTIF','CALON ANGGOTA','KELUAR'];
 const jabatanOrder=['Ketua','Wakil Ketua','Sekretaris','Bendahara','Pimpinan Krida'];
 const excludeAktif=['Anggota Muda Dirgantara','Anggota Dewasa Dirgantara'];
 const sorted=(items)=>[...items].sort((a,b)=>{
   const ja=jabatanOrder.indexOf(a.Jabatan);
   const jb=jabatanOrder.indexOf(b.Jabatan);
   if(ja!==-1 || jb!==-1) return (ja===-1?99:ja)-(jb===-1?99:jb);
   return String(a.Nama||'').localeCompare(String(b.Nama||''));
 });
 const jabatanOrder=['Ketua','Ketua Saka','Wakil Ketua','Sekretaris','Bendahara','Pimpinan Krida'];
 const withJabatan=(x)=>x.Jabatan && x.Jabatan !== 'Anggota';
 const sortRows=(items)=>[...items].sort((a,b)=>{
   const ja=jabatanOrder.indexOf(a.Jabatan);
   const jb=jabatanOrder.indexOf(b.Jabatan);
   if(ja!==-1 || jb!==-1) return (ja===-1?99:ja)-(jb===-1?99:jb);
   return String(a.Nama||'').localeCompare(String(b.Nama||''));
 });
 const sections=[
  {status:'PENGURUS',rows:sortRows(rows.filter(x=>withJabatan(x)))},
  {status:'AKTIF',rows:sortRows(rows.filter(x=>x.Status==='Aktif' && !withJabatan(x) && !excludeAktif.includes(x.Jabatan)))},
  {status:'NONAKTIF',rows:rows.filter(x=>x.Status==='Nonaktif')},
  {status:'CALON ANGGOTA',rows:rows.filter(x=>x.Status==='Calon Anggota')},
  {status:'KELUAR',rows:rows.filter(x=>x.Status==='Keluar')}
 ].filter(x=>x.rows.length);
 const total=rows.length;
 const recap=statusOrder.map(s=>({s,n:rows.filter(x=>x.Status===s).length}));
 const sectionHtml=sections.map(sec=>`
 <h3>${sec.status.toUpperCase()}</h3>
 <table><tr><th>No</th><th>Nama</th><th>Jabatan</th><th>Sekolah / Instansi</th><th>Status</th></tr>
 ${sec.rows.map((x,i)=>`<tr><td>${i+1}</td><td>${x.Nama||'-'}</td><td>${x.Jabatan||'-'}</td><td>${x.SekolahInstansi||x.Sekolah||x.Instansi||'-'}</td><td>${sec.status}</td></tr>`).join('')}
 </table>`).join('');
 const html=`<!doctype html><html><head><title>Laporan Anggota SAKA Dirgantara</title><style>
 body{font-family:"Times New Roman",serif;padding:35px;color:#111}h1,h2{text-align:center}table{width:100%;border-collapse:collapse;margin-top:15px;margin-bottom:25px}td,th{border:1px solid #333;padding:6px;font-size:12px}.center{text-align:center}
 </style></head><body>
 <div class="center"><b>SAKA DIRGANTARA</b><br>KWARTIR CABANG / PANGKALAN ....................</div><hr/>
 <h1>LAPORAN DATA ANGGOTA</h1><h2>SAKA DIRGANTARA</h2>
 <p class="center">Dalam rangka pendataan administrasi organisasi dan pembinaan bersama TNI Angkatan Udara</p>
 <h3>REKAPITULASI ANGGOTA</h3>
 <table><tr><th>Status</th><th>Jumlah</th></tr>${recap.map(x=>`<tr><td>${x.s}</td><td>${x.n}</td></tr>`).join('')}<tr><th>Total</th><th>${total}</th></tr></table>
 ${sectionHtml}
 <p>Mengetahui,<br>Pembina SAKA Dirgantara<br><br><br>(________________)</p>
 </body></html>`;
 const w=window.open('','_blank');
 w.document.write(html);w.document.close();w.print();
}

export default function Page(){
 const [rows,setRows]=useState([]);
 useEffect(()=>{moduleService.members().then(setRows).catch(()=>setRows([]));},[]);
 return <div className="module-page">
   <div className="toolbar toolbar-between" style={{marginBottom:16}}>
    <span></span>
    <button className="btn primary" onClick={()=>generatePdf(rows)}><Download size={16}/> Download Laporan TNI AU</button>
   </div>
   <CrudPage eyebrow="DATA ANGGOTA" title="Anggota" description="Tambah atau perbarui data anggota, status keanggotaan, lalu buat laporan pendataan organisasi." module="anggota" loader={()=>moduleService.members()} columns={columns} fields={fields}/>
 </div>
}
