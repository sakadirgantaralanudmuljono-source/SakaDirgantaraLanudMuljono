import {useMemo} from 'react';import CrudPage from '../../components/common/CrudPage';import {moduleService} from '../../services/module.service';import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'Username',label:'Nama pengguna'},{key:'Nama',label:'Nama'},{key:'Role',label:'Peran'},{key:'Status',label:'Status'}];
export default function Page(){const {data:members}=useRemoteData(()=>moduleService.members(),[]);const fields=useMemo(()=>[
 {key:'Username',label:'Nama pengguna',required:true},{key:'Nama',label:'Nama',required:true},
 {key:'Role',label:'Peran',type:'select',options:['ADMIN','PENGURUS','ANGGOTA'],required:true},
 {key:'AnggotaID',label:'Hubungkan Anggota',type:'select',options:(members||[]).map(x=>({value:x.ID,label:`${x.Nama} (${x.NTA||'-'})`}))},
 {key:'Status',label:'Status',type:'select',options:['Aktif','Nonaktif'],required:true},
 {key:'Password',label:'Kata sandi (kosongkan jika tidak diubah)',type:'password',placeholder:'Minimal 8 karakter'}
],[members]);return <CrudPage eyebrow="AKSES SISTEM" title="Pengguna" description="Tambah akun, hubungkan ke anggota, dan atur perannya." module="users" loader={()=>moduleService.users()} columns={columns} fields={fields}/>}
