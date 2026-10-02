import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import {moduleService} from '../../services/module.service';
import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'Nama',label:'Nama Anggota'},{key:'NTA',label:'NTA'},{key:'Status',label:'Status'},{key:'Krida',label:'Krida'}];
export default function Page(){
 const {data,loading,error,reload}=useRemoteData(()=>moduleService.members(),[]);
 const rows=(data||[]).map((r,i)=>({...r,id:r.ID||i}));
 return <><PageHeader eyebrow="DATA ANGGOTA" title="Anggota" description="Kelola identitas dan status keanggotaan."/>
 <section className="panel"><div className="toolbar"><span>{loading?'Memuat data...':`${rows.length} data`}</span><button className="btn" onClick={reload} disabled={loading}>Muat Ulang</button></div>
 {error&&<div className="alert">{error}</div>}<DataTable columns={columns} rows={rows} empty="Belum ada data."/></section></>;
}
