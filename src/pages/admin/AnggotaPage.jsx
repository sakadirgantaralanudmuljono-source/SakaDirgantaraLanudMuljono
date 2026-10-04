import {useEffect, useState} from 'react';
import CrudPage from '../../components/common/CrudPage';
import {moduleService} from '../../services/module.service';
import {Download} from 'lucide-react';

const columns=[{key:"Nama",label:"Nama"},{key:"NTA",label:"NTA"},{key:"Status",label:"Status"},{key:"Krida",label:"Krida"}];
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
 const statusOrder=['Alumni','Aktif','Nonaktif','Calon Anggota','Keluar'];
 const jabatanOrder=['Ketua','Wakil Ketua','Sekretaris','Bendahara','Pimpinan Krida'];
 const excludeAktif=['Anggota Muda Dirgantara','Anggota Dewasa Dirgantara'];
 const sorted=(items)=>[...items].sort((a,b)=>{
   const ja=jabatanOrder.indexOf(a.Jabatan);
   const jb=jabatanOrder.indexOf(b.Jabatan);
   if(ja!==-1 || jb!==-1) return (ja===-1?99:ja)-(jb===-1?99:jb);
   return String(a.Nama||'').localeCompare(String(b.Nama||''));
 });
 const sections=statusOrder.map(status=>({
   status,
   rows: status==='Aktif'
    ? sorted(rows.filter(x=>x.Status===status && !excludeAktif.includes(x.Jabatan)))
    : sorted(rows.filter(x=>x.Status===status))
 })).filter(x=>x.rows.length);
 const total=rows.length;
 const recap=statusOrder.map(s=>({s,n:rows.filter(x=>x.Status===s).length}));
 const sectionHtml=sections.map(sec=>`
 <h3>${sec.status.toUpperCase()}</h3>
 <table><tr><th>No</th><th>Nama</th><th>NTA</th><th>Jabatan</th><th>Krida</th><th>Keterangan</th></tr>
 ${sec.rows.map((x,i)=>`<tr><td>${i+1}</td><td>${x.Nama||'-'}</td><td>${x.NTA||'-'}</td><td>${x.Jabatan||'-'}</td><td>${x.Krida||'-'}</td><td>${x.Keterangan||'-'}</td></tr>`).join('')}
 </table>`).join('');
 const html=`<!doctype html><html><head><title>Laporan Anggota SAKA Dirgantara</title><style>
 body{font-family:Arial;padding:30px;color:#111}h1,h2{text-align:center}table{width:100%;border-collapse:collapse;margin-top:15px;margin-bottom:25px}td,th{border:1px solid #333;padding:6px;font-size:12px}.center{text-align:center}
 </style></head><body>
 <h1>LAPORAN DATA ANGGOTA</h1><h2>SAKA DIRGANTARA</h2>
 <p>Dokumen pendataan anggota untuk kebutuhan administrasi organisasi dan pembina TNI AU.</p>
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
