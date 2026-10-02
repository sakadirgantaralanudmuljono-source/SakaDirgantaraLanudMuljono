import {useMemo} from 'react';import CrudPage from '../../components/common/CrudPage';import {moduleService} from '../../services/module.service';import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'Username',label:'Username'},{key:'Nama',label:'Nama'},{key:'Role',label:'Role'},{key:'Status',label:'Status'}];
export default function Page(){const {data:members}=useRemoteData(()=>moduleService.members(),[]);const fields=useMemo(()=>[
 {key:'Username',label:'Username',required:true},{key:'Nama',label:'Nama',required:true},
 {key:'Role',label:'Role',type:'select',options:['ADMIN','PENGURUS','ANGGOTA'],required:true},
 {key:'AnggotaID',label:'Hubungkan Anggota',type:'select',options:(members||[]).map(x=>({value:x.ID,label:`${x.Nama} (${x.NTA||'-'})`}))},
 {key:'Status',label:'Status',type:'select',options:['Aktif','Nonaktif'],required:true},
 {key:'Password',label:'Password (kosongkan saat edit jika tidak diubah)',type:'password',placeholder:'Minimal 8 karakter'}
],[members]);return <CrudPage eyebrow="AKSES SISTEM" title="Pengguna" description="Kelola akun dan role pengguna." module="users" loader={()=>moduleService.users()} columns={columns} fields={fields}/>}
