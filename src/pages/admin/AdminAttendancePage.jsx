import {useMemo} from 'react';import CrudPage from '../../components/common/CrudPage';import {moduleService} from '../../services/module.service';import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'NamaAnggota',label:'Anggota'},{key:'KegiatanNama',label:'Kegiatan'},{key:'StatusKehadiran',label:'Status'},{key:'Tanggal',label:'Tanggal'}];
export default function Page(){const {data:members}=useRemoteData(()=>moduleService.members(),[]);const {data:acts}=useRemoteData(()=>moduleService.activities(),[]);
 const fields=useMemo(()=>[
 {key:'KegiatanID',label:'Kegiatan',type:'select',required:true,options:(acts||[]).map(x=>({value:x.ID,label:`${x.NamaKegiatan} — ${x.Tanggal}`}))},
 {key:'AnggotaID',label:'Anggota',type:'select',options:(members||[]).map(x=>({value:x.ID,label:x.Nama}))},
 {key:'StatusKehadiran',label:'Status',type:'select',required:true,options:['Hadir','Izin','Sakit','Alpa','Libur']},
 {key:'Catatan',label:'Catatan',type:'textarea',full:true}
 ],[members,acts]);return <CrudPage eyebrow="KEHADIRAN" title="Absensi" description="Input dan koreksi absensi manual." module="absensi" loader={()=>moduleService.attendance()} columns={columns} fields={fields}/>}
