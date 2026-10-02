import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import {moduleService} from '../../services/module.service';
import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'NomorSurat',label:'Nomor'},{key:'Perihal',label:'Perihal'},{key:'Jenis',label:'Jenis'},{key:'Tanggal',label:'Tanggal'}];
export default function Page(){
 const {data,loading,error,reload}=useRemoteData(()=>moduleService.letters(),[]);
 const rows=(data||[]).map((r,i)=>({...r,id:r.ID||i}));
 return <><PageHeader eyebrow="ADMINISTRASI" title="Surat" description="Surat masuk dan keluar organisasi."/>
 <section className="panel"><div className="toolbar"><span>{loading?'Memuat data...':`${rows.length} data`}</span><button className="btn" onClick={reload} disabled={loading}>Muat Ulang</button></div>
 {error&&<div className="alert">{error}</div>}<DataTable columns={columns} rows={rows} empty="Belum ada data."/></section></>;
}
