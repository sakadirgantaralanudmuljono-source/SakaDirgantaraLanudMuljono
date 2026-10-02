import PageHeader from '../../components/common/PageHeader';
import {User,Phone,MapPin} from 'lucide-react';
import {moduleService} from '../../services/module.service';
import {useRemoteData} from '../../hooks/useRemoteData';
export default function ProfilePage(){
 const {data:u,loading,error}=useRemoteData(()=>moduleService.profile(),[]);
 return <><PageHeader eyebrow="AKUN ANGGOTA" title="Profil Saya" description="Data anggota dari Google Sheets melalui backend GAS."/>
 {error&&<div className="alert">{error}</div>}
 <div className="profile-grid"><section className="panel profile-summary"><div className="avatar"><User size={32}/></div><h2>{loading?'Memuat...':u?.Nama||'-'}</h2><p className="muted">{u?.NTA||'-'}</p><span className="status-badge success">{u?.Status||'-'}</span></section>
 <section className="panel detail-list"><h2>Informasi Anggota</h2><div><Phone/><span><small>Telepon</small><b>{u?.NoHP||u?.Telepon||'-'}</b></span></div><div><MapPin/><span><small>Alamat</small><b>{u?.Alamat||'-'}</b></span></div></section></div></>;
}
