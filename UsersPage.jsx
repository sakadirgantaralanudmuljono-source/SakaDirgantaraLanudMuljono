import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import {moduleService} from '../../services/module.service';
import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'Username',label:'Username'},{key:'Nama',label:'Nama'},{key:'Role',label:'Role'},{key:'Status',label:'Status'}];
export default function Page(){
 const {data,loading,error,reload}=useRemoteData(()=>moduleService.users(),[]);
 const rows=(data||[]).map((r,i)=>({...r,id:r.ID||i}));
 return <><PageHeader eyebrow="AKSES SISTEM" title="Pengguna" description="Akun login dan role pengguna."/>
 <section className="panel"><div className="toolbar"><span>{loading?'Memuat data...':`${rows.length} data`}</span><button className="btn" onClick={reload} disabled={loading}>Muat Ulang</button></div>
 {error&&<div className="alert">{error}</div>}<DataTable columns={columns} rows={rows} empty="Belum ada data."/></section></>;
}
