import {apiRequest} from './api';

async function modules(names){
  const data=await apiRequest('modules.get',{modules:Array.isArray(names)?names:[names]});
  return data?.modules||{};
}

export const moduleService={
  dashboard:(forceRefresh=false)=>apiRequest('dashboard.get',{forceRefresh}),
  permissions:()=>apiRequest('permissions.get'),
  modules,
  members:async()=> (await modules('anggota')).anggota||[],
  activities:async()=> (await modules('kegiatan')).kegiatan||[],
  activitiesPaged:(params={})=>apiRequest('activity.list',params),
  attendance:async()=> (await modules('absensi')).absensi||[],
  cash:async()=> (await modules('kas')).kas||[],
  inventory:async()=> (await modules('inventaris')).inventaris||[],
  letters:async()=> (await modules('surat')).surat||[],
  structure:async()=> (await modules('pengurus')).pengurus||[],
  users:async()=> (await modules('users')).users||[],
  profile:async()=>{const {user}=await apiRequest('auth.me');if(!user?.AnggotaID)return user||null;const rows=(await modules('anggota')).anggota||[];return rows.find(x=>String(x.ID)===String(user.AnggotaID))||user;},
  systemStructure:()=>apiRequest('system.structure')
};
