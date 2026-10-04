import CrudPage from '../../components/common/CrudPage';import {moduleService} from '../../services/module.service';
const columns=[{key:'NomorSurat',label:'Nomor'},{key:'Perihal',label:'Perihal'},{key:'Jenis',label:'Jenis'},{key:'Tanggal',label:'Tanggal'},{key:'Status',label:'Status'}];
const fields=[
 {key:'Tanggal',label:'Tanggal',type:'date',required:true},{key:'Jenis',label:'Jenis',type:'select',options:['Surat Masuk','Surat Keluar'],required:true},
 {key:'Perihal',label:'Perihal',required:true},{key:'Penomoran',label:'Penomoran Surat Keluar',type:'select',options:['Otomatis','Manual']},
 {key:'FormatSurat',label:'Format Nomor Surat Keluar',type:'select',options:['PANPEL-SADIRGA','SADIRGA-SDA','SK/MUSAKA']},
 {key:'NomorSurat',label:'Nomor Surat (wajib Surat Masuk / manual)',placeholder:'Kosongkan jika Surat Keluar otomatis'},
 {key:'Status',label:'Status',type:'select',options:['Draft','Diproses','Selesai','Diarsipkan']},{key:'LinkFile',label:'Link File'},
 {key:'Keterangan',label:'Keterangan',type:'textarea',full:true}
];
export default function Page(){return <CrudPage eyebrow="ADMINISTRASI" title="Surat" description="Kelola surat masuk/keluar dan penomoran otomatis." module="surat" loader={()=>moduleService.letters()} columns={columns} fields={fields} normalize={x=>({...x,Penomoran:x.Penomoran||'Otomatis',FormatSurat:x.FormatSurat||'SADIRGA-SDA'})}/>}
