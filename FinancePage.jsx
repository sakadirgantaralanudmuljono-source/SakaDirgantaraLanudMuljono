import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import {moduleService} from '../../services/module.service';
import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'Tanggal',label:'Tanggal'},{key:'Keterangan',label:'Keterangan'},{key:'Jenis',label:'Jenis'},{key:'Nominal',label:'Nominal'}];
export default function Page(){
 const {data,loading,error,reload}=useRemoteData(()=>moduleService.cash(),[]);
 const rows=(data||[]).map((r,i)=>({...r,id:r.ID||i}));
 return <><PageHeader eyebrow="KEUANGAN" title="Kas Organisasi" description="Pemasukan dan pengeluaran organisasi."/>
 <section className="panel"><div className="toolbar"><span>{loading?'Memuat data...':`${rows.length} data`}</span><button className="btn" onClick={reload} disabled={loading}>Muat Ulang</button></div>
 {error&&<div className="alert">{error}</div>}<DataTable columns={columns} rows={rows} empty="Belum ada data."/></section></>;
}
