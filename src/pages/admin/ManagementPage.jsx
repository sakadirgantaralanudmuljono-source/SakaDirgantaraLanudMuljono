import {useMemo} from 'react';import CrudPage from '../../components/common/CrudPage';import {moduleService} from '../../services/module.service';import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'Nama',label:'Nama'},{key:'Jabatan',label:'Jabatan'},{key:'Periode',label:'Periode'},{key:'Status',label:'Status'}];
export default function Page(){const {data:members}=useRemoteData(()=>moduleService.members(),[]);const fields=useMemo(()=>[
 {key:'AnggotaID',label:'Anggota',type:'select',required:true,options:(members||[]).map(x=>({value:x.ID,label:`${x.Nama} (${x.NTA||'-'})`}))},
 {key:'Jabatan',label:'Jabatan',required:true},{key:'Periode',label:'Periode'},{key:'Urutan',label:'Urutan',type:'number',min:'0'},
 {key:'Status',label:'Status',type:'select',options:['Aktif','Nonaktif'],required:true}
],[members]);return <CrudPage eyebrow="ORGANISASI" title="Struktur Pengurus" description="Kelola susunan pengurus organisasi." module="pengurus" loader={()=>moduleService.structure()} columns={columns} fields={fields}/>}
