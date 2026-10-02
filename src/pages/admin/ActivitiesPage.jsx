import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import {moduleService} from '../../services/module.service';
import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'NamaKegiatan',label:'Nama Kegiatan'},{key:'Tanggal',label:'Tanggal'},{key:'Lokasi',label:'Lokasi'},{key:'Status',label:'Status'}];
export default function Page(){
 const {data,loading,error,reload}=useRemoteData(()=>moduleService.activities(),[]);
 const rows=(data||[]).map((r,i)=>({...r,id:r.ID||i}));
 return <><PageHeader eyebrow="KEGIATAN" title="Kegiatan" description="Agenda, lokasi, waktu, dan radius absensi."/>
 <section className="panel"><div className="toolbar"><span>{loading?'Memuat data...':`${rows.length} data`}</span><button className="btn" onClick={reload} disabled={loading}>Muat Ulang</button></div>
 {error&&<div className="alert">{error}</div>}<DataTable columns={columns} rows={rows} empty="Belum ada data."/></section></>;
}
