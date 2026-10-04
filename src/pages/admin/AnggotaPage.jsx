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
 const jabatanPengurus=[
  'Pamong Saka Putri',
  'Pamong Saka Putra',
  'Instruktur',
  'Ketua Dewan',
  'Wakil Ketua Dewan',
  'Sekretaris 1',
  'Sekretaris 2',
  'Bendahara'
 ];
 const jabatanOrder={
  'Pamong Saka Putri':1,
  'Pamong Saka Putra':2,
  'Instruktur':3,
  'Ketua Dewan':4,
  'Wakil Ketua Dewan':5,
  'Sekretaris 1':6,
  'Sekretaris 2':7,
  'Bendahara':8
 };
 const sortRows=(items)=>[...items].sort((a,b)=>{
   const ja=jabatanOrder[a.Jabatan]||99;
   const jb=jabatanOrder[b.Jabatan]||99;
   if(ja!==jb) return ja-jb;
   return String(a.Nama||'').localeCompare(String(b.Nama||''));
 });
 const isPengurus=(x)=>jabatanPengurus.includes(x.Jabatan);
 const sections=[
  {status:'PENGURUS',rows:sortRows(rows.filter(isPengurus))},
  {status:'ANGGOTA AKTIF',rows:rows.filter(x=>x.Status==='Aktif'&&!isPengurus(x))},
  {status:'NONAKTIF',rows:rows.filter(x=>x.Status==='Nonaktif')},
  {status:'CALON ANGGOTA',rows:rows.filter(x=>x.Status==='Calon Anggota')},
  {status:'KELUAR',rows:rows.filter(x=>x.Status==='Keluar')}
 ].filter(x=>x.rows.length);
 const recap=[...sections.map(x=>({s:x.status,n:x.rows.length}))];
 const sectionHtml=sections.map(sec=>`
 <h3>${sec.status}</h3>
 <table><tr><th>No</th><th>Nama</th><th>Jabatan</th><th>Sekolah / Instansi</th><th>Status</th></tr>
 ${sec.rows.map((x,i)=>`<tr><td>${i+1}</td><td>${x.Nama||'-'}</td><td>${x.Jabatan||'-'}</td><td>${x.SekolahInstansi||x.Sekolah||x.Instansi||'-'}</td><td>${x.Status||'-'}</td></tr>`).join('')}
 </table>`).join('');
 const html=`<!doctype html><html><head><title>Laporan Anggota SAKA Dirgantara</title><style>body{font-family:"Times New Roman",serif;padding:35px}h1,h2{text-align:center}table{width:100%;border-collapse:collapse;margin:15px 0}td,th{border:1px solid #333;padding:6px;font-size:12px}</style></head><body>
 <div style="text-align:center"><b>SAKA DIRGANTARA</b><br>KWARTIR CABANG / PANGKALAN ....................</div><hr>
 <h1>LAPORAN DATA ANGGOTA</h1><h2>SAKA DIRGANTARA</h2>
 <h3>REKAPITULASI</h3><table><tr><th>Kategori</th><th>Jumlah</th></tr>${recap.map(x=>`<tr><td>${x.s}</td><td>${x.n}</td></tr>`).join('')}</table>
 ${sectionHtml}
 <p>Mengetahui,<br>Pembina SAKA Dirgantara<br><br><br>________________</p></body></html>`;
 const w=window.open('','_blank');w.document.write(html);w.document.close();w.print();
}

export default function Page(){
 const [rows,setRows]=useState([]);
 const [filterKategori,setFilterKategori]=useState('Semua');
 const excludedJabatan=[
  'Anggota Dewasa Dirgantara',
  'Anggota Muda Dirgantara',
  'Calon Anggota Dirgantara'
 ];
 const jabatanPengurus=(row)=>{
  return Boolean(row.Jabatan) && !excludedJabatan.includes(row.Jabatan);
 };
 const filterRows=(items)=>{
  if(filterKategori==='Pengurus') return items.filter(jabatanPengurus);
  if(filterKategori==='Aktif') return items.filter(x=>x.Status==='Aktif');
  if(filterKategori==='Nonaktif') return items.filter(x=>x.Status==='Nonaktif');
  if(filterKategori==='Keluar') return items.filter(x=>x.Status==='Keluar');
  return items;
 };
 useEffect(()=>{moduleService.members().then(setRows).catch(()=>setRows([]));},[]);
 return <div className="module-page">
   <div className="toolbar toolbar-between" style={{marginBottom:16}}>
    <span></span>
    <button className="btn primary" onClick={()=>generatePdf(rows)}><Download size={16}/> Download Laporan TNI AU</button>
   </div>
   <CrudPage eyebrow="DATA ANGGOTA" title="Anggota" description="Tambah atau perbarui data anggota, status keanggotaan, lalu buat laporan pendataan organisasi." module="anggota" loader={()=>moduleService.members()} filterRows={filterRows} columns={columns} fields={fields}
      toolbarExtra={
       <div className="row-actions">
        <select className="input" value={filterKategori} onChange={e=>setFilterKategori(e.target.value)}>
         <option>Semua</option>
         <option>Pengurus</option>
         <option>Aktif</option>
         <option>Nonaktif</option>
         <option>Keluar</option>
        </select>
       </div>
      }/>
 </div>
}
