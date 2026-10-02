import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import {moduleService} from '../../services/module.service';
import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'NamaBarang',label:'Barang'},{key:'Jumlah',label:'Jumlah'},{key:'Kondisi',label:'Kondisi'},{key:'Lokasi',label:'Lokasi'}];
export default function Page(){
 const {data,loading,error,reload}=useRemoteData(()=>moduleService.inventory(),[]);
 const rows=(data||[]).map((r,i)=>({...r,id:r.ID||i}));
 return <><PageHeader eyebrow="ASET" title="Inventaris" description="Data barang dan kondisi inventaris."/>
 <section className="panel"><div className="toolbar"><span>{loading?'Memuat data...':`${rows.length} data`}</span><button className="btn" onClick={reload} disabled={loading}>Muat Ulang</button></div>
 {error&&<div className="alert">{error}</div>}<DataTable columns={columns} rows={rows} empty="Belum ada data."/></section></>;
}
