import PageHeader from '../../components/common/PageHeader';
import {moduleService} from '../../services/module.service';
import {useRemoteData} from '../../hooks/useRemoteData';
export default function MaintenancePage(){
 const {data,loading,error,reload}=useRemoteData(()=>moduleService.systemStructure(),[]);
 return <><PageHeader eyebrow="SISTEM" title="System Maintenance" description="Pemeriksaan struktur backend Google Apps Script dan database."/>
 <section className="panel"><div className="toolbar"><span>{loading?'Memeriksa backend...':'Pemeriksaan selesai'}</span><button className="btn" onClick={reload}>Periksa Ulang</button></div>
 {error&&<div className="alert">{error}</div>}<pre className="system-result">{data?JSON.stringify(data,null,2):''}</pre></section></>;
}
