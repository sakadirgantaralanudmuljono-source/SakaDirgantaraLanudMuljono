import {useEffect,useState} from 'react';
import {MapPin,CheckCircle2,CalendarDays,RefreshCw} from 'lucide-react';
import {getCurrentLocation} from '../../hooks/useGeolocation';
import {attendanceService} from '../../services/attendance.service';
import PageHeader from '../../components/common/PageHeader';

export default function AttendancePage(){
  const [activities,setActivities]=useState([]);
  const [permissionActivities,setPermissionActivities]=useState([]);
  const [selected,setSelected]=useState('');
  const [status,setStatus]=useState('idle');
  const [message,setMessage]=useState('Pilih kegiatan yang sedang membuka absensi.');

  async function load(){
    setStatus('loading');
    try{
      const rows=await attendanceService.activeActivities();
      setActivities(Array.isArray(rows)?rows:[]);
      try{const pr=await attendanceService.permissionActivities();setPermissionActivities(Array.isArray(pr)?pr:[])}catch(_){setPermissionActivities([])}
      if(rows?.length===1)setSelected(String(rows[0].ID));
      setMessage(rows?.length?'Pilih kegiatan lalu lakukan absensi.':'Saat ini tidak ada kegiatan yang membuka absensi.');
      setStatus('idle');
    }catch(e){setStatus('error');setMessage(e.message);}
  }
  useEffect(()=>{load()},[]);


  async function submitPermission(k){
    const jenis=prompt('Jenis pengajuan: ketik Izin atau Sakit','Izin');if(!jenis)return;
    const alasan=prompt('Alasan pengajuan izin/sakit:','');if(!alasan)return;
    setStatus('loading');
    try{
      await attendanceService.submitPermission({KegiatanID:k.ID,JenisPengajuan:jenis,Alasan:alasan,JenisBukti:'Surat Izin'});
      setStatus('success');setMessage('Pengajuan berhasil dikirim dan menunggu verifikasi.');await load();
    }catch(e){setStatus('error');setMessage(e.message)}
  }

  async function attend(){
    if(!selected){setStatus('error');setMessage('Pilih kegiatan terlebih dahulu.');return;}
    setStatus('loading');
    try{
      const rule=await attendanceService.locationRule(selected);
      let position={};
      if(rule?.enabled){
        setMessage(`Radius kegiatan ${rule.radius} m. Mengambil lokasi perangkat...`);
        position=await getCurrentLocation();
        setMessage(`GPS ditemukan (akurasi ±${Math.round(position.accuracy)} m). Backend sedang memvalidasi radius...`);
      }
      const result=await attendanceService.submit(selected,position);
      setStatus('success');
      setMessage(`Absensi berhasil dicatat${result?.StatusKehadiran?' sebagai '+result.StatusKehadiran:''}.`);
      await load();
    }catch(e){setStatus('error');setMessage(e.message);}
  }

  return <><PageHeader eyebrow="KEHADIRAN" title="Absensi Saya" description="Kegiatan dan aturan radius dibaca langsung dari backend SAKA Dirgantara."/>
    <section className="panel attendance-panel">
      <div className={'location-icon '+status}><MapPin/></div>
      <h2>Absensi Kegiatan</h2>
      <label className="attendance-select">Kegiatan
        <select value={selected} onChange={e=>setSelected(e.target.value)} disabled={status==='loading'}>
          <option value="">Pilih kegiatan...</option>
          {activities.map(k=><option key={k.ID} value={k.ID}>{k.NamaKegiatan||k.Nama||k.ID} — {String(k.Tanggal||'').slice(0,10)}</option>)}
        </select>
      </label>
      <p>{message}</p>
      <div className="attendance-actions">
        <button className="btn" onClick={load} disabled={status==='loading'}><RefreshCw size={17}/> Muat Ulang</button>
        <button className="btn primary" onClick={attend} disabled={status==='loading'||!selected}>
          <CalendarDays size={17}/>{status==='loading'?' Memproses...':' Absen Sekarang'}
        </button>
      </div>
      {status==='success'&&<div className="success-line"><CheckCircle2 size={18}/> Kehadiran tersimpan di backend</div>}
    </section>
    <section className="panel"><h2>Pengajuan Izin / Sakit</h2><p>Daftar berikut hanya menampilkan kegiatan yang masih membuka pengajuan dan belum memiliki absensi/pengajuan Anda.</p>
      {permissionActivities.length===0?<div className="empty compact">Tidak ada kegiatan yang membuka pengajuan izin.</div>:permissionActivities.map(k=><div className="permission-row" key={k.ID}><div><strong>{k.NamaKegiatan}</strong><br/><small>{String(k.Tanggal||'').slice(0,10)} · {k.message||''}</small></div><button className="btn" onClick={()=>submitPermission(k)} disabled={status==='loading'}>Ajukan Izin</button></div>)}
    </section>
  </>;
}
