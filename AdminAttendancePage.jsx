import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import {moduleService} from '../../services/module.service';
import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'AnggotaID',label:'Anggota ID'},{key:'KegiatanID',label:'Kegiatan ID'},{key:'StatusKehadiran',label:'Status'},{key:'Tanggal',label:'Tanggal'}];
export default function Page(){
 const {data,loading,error,reload}=useRemoteData(()=>moduleService.attendance(),[]);
 const rows=(data||[]).map((r,i)=>({...r,id:r.ID||i}));
 return <><PageHeader eyebrow="KEHADIRAN" title="Absensi" description="Data kehadiran yang tersimpan pada backend."/>
 <section className="panel"><div className="toolbar"><span>{loading?'Memuat data...':`${rows.length} data`}</span><button className="btn" onClick={reload} disabled={loading}>Muat Ulang</button></div>
 {error&&<div className="alert">{error}</div>}<DataTable columns={columns} rows={rows} empty="Belum ada data."/></section></>;
}
