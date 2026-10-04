import {useEffect,useRef,useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {invalidateApiCache} from '../../services/api';
import {MapPin,CheckCircle2,CalendarDays,RefreshCw} from 'lucide-react';
import {getCurrentLocation} from '../../hooks/useGeolocation';
import {attendanceService} from '../../services/attendance.service';
import PageHeader from '../../components/common/PageHeader';

export default function AttendancePage(){
  const [params]=useSearchParams();
  const requestedId=params.get('kegiatanId')||'';
  const [activities,setActivities]=useState([]);
  const [permissionActivities,setPermissionActivities]=useState([]);
  const [selected,setSelected]=useState(requestedId);
  const [status,setStatus]=useState('idle');
  const [message,setMessage]=useState('Pilih kegiatan yang sedang membuka absensi.');

  const [permission,setPermission]=useState(null);
  const [kind,setKind]=useState('Izin');
  const [proofKind,setProofKind]=useState('Surat Izin');
  const [reason,setReason]=useState('');
  const [proof,setProof]=useState(null);
  const [formError,setFormError]=useState('');
  const [refreshWarning,setRefreshWarning]=useState('');
  const [successText,setSuccessText]=useState('');
  const [locationRule,setLocationRule]=useState(null);
  const [radiusMessage,setRadiusMessage]=useState('');
  const [checkingRadius,setCheckingRadius]=useState(false);
  const radiusRequest=useRef(0);
  const submitting=useRef(false);

  async function load({preserveResult=false,force=false}={}){
    if(force)invalidateApiCache();
    if(!preserveResult){setStatus('loading');setSuccessText('')}
    setRefreshWarning('');
    try{
      const rows=await attendanceService.activeActivities();
      setActivities(Array.isArray(rows)?rows:[]);
      try{const pr=await attendanceService.permissionActivities();setPermissionActivities(Array.isArray(pr)?pr:[])}catch(_){setPermissionActivities([]);setRefreshWarning('Daftar izin belum dapat dimuat. Silakan muat ulang.')}
      setSelected(previous=>rows?.some(x=>String(x.ID)===requestedId)?requestedId:rows?.some(x=>String(x.ID)===previous)?previous:rows?.length===1?String(rows[0].ID):'');
      if(!preserveResult){setMessage(rows?.length===1?'Kegiatan siap. Tekan Absen Sekarang untuk mencatat kehadiran.':rows?.length?'Pilih kegiatan yang Anda ikuti, lalu tekan Absen Sekarang.':'Saat ini tidak ada kegiatan yang membuka absensi.');
      setStatus('idle');}
    }catch(e){if(preserveResult)setRefreshWarning('Data berhasil dikirim, tetapi daftar belum diperbarui: '+e.message);else{setStatus('error');setMessage(e.message)}}
  }
  useEffect(()=>{const update=()=>{if(!submitting.current)load()};window.addEventListener('saka:data-updated',update);load();return()=>window.removeEventListener('saka:data-updated',update)},[requestedId]);


  useEffect(()=>{
    let live=true;radiusRequest.current++;setRadiusMessage('');setLocationRule(null);
    if(selected)attendanceService.locationRule(selected).then(rule=>{if(live)setLocationRule(rule)}).catch(e=>{if(live)setRadiusMessage(e.message)});
    return()=>{live=false};
  },[selected]);
  async function checkRadius(){
    const request=++radiusRequest.current;setCheckingRadius(true);setRadiusMessage('Mencari lokasi Anda...');
    try{
      const rule=await attendanceService.locationRule(selected);
      if(request===radiusRequest.current)setLocationRule(rule);
      if(!rule?.enabled){if(request===radiusRequest.current)setRadiusMessage('Kegiatan ini tidak membatasi jarak absensi.');return}
      const position=await getCurrentLocation();
      const rad=Math.PI/180;
      const a=Math.sin((position.latitude-rule.latitude)*rad/2)**2+Math.cos(rule.latitude*rad)*Math.cos(position.latitude*rad)*Math.sin((position.longitude-rule.longitude)*rad/2)**2;
      const distance=6371000*2*Math.atan2(Math.sqrt(Math.min(1,a)),Math.sqrt(Math.max(0,1-a)));
      if(!Number.isFinite(distance))throw new Error('Jarak belum dapat diperiksa. Muat ulang aplikasi lalu coba lagi.');
      const text=position.accuracy>Math.min(rule.radius,100)?'Lokasi belum cukup akurat. Aktifkan lokasi presisi dan coba di tempat terbuka.':distance<=rule.radius?`Anda sudah berada di area absensi. Jarak sekitar ${Math.round(distance)} meter; batas ${rule.radius} meter.`:`Anda belum masuk area absensi. Jarak sekitar ${Math.round(distance)} meter; batas ${rule.radius} meter.`;
      if(request===radiusRequest.current)setRadiusMessage(text);
    }catch(e){if(request===radiusRequest.current)setRadiusMessage(e.message)}finally{setCheckingRadius(false)}
  }

  function openPermission(k){
    setPermission(k);setKind('Izin');setProofKind('Surat Izin');setReason('');setProof(null);setFormError('');
  }
  async function submitPermission(e){
    e.preventDefault();if(submitting.current)return;
    setFormError('');
    if(!reason.trim()||reason.trim().length>500){setFormError('Isi alasan, maksimum 500 karakter.');return}
    if(!proof){setFormError('Lampirkan bukti pendukung.');return}
    if(!['application/pdf','image/jpeg','image/png','image/webp'].includes(proof.type)){setFormError('Gunakan PDF, JPG, PNG, atau WEBP.');return}
    if(!proof.size||proof.size>3*1024*1024){setFormError('Ukuran bukti harus lebih dari 0 dan maksimum 3 MB.');return}
    submitting.current=true;setStatus('loading');setSuccessText('');
    try{
      const base64=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=()=>reject(new Error('Bukti tidak dapat dibaca. Pilih ulang file.'));reader.onabort=()=>reject(new Error('Pembacaan file dibatalkan.'));reader.readAsDataURL(proof)});
      await attendanceService.submitPermission({KegiatanID:permission.ID,JenisPengajuan:kind,Alasan:reason.trim(),JenisBukti:proofKind,MimeType:proof.type,Base64:base64,NamaFile:proof.name});
      setPermission(null);setProof(null);
      const text='Pengajuan '+kind.toLowerCase()+' berhasil dikirim dan menunggu verifikasi.';
      setMessage(text);setSuccessText(text);
      await load({preserveResult:true});setStatus('success');
    }catch(e){setStatus('error');setFormError(e.message)}finally{submitting.current=false}
  }

  async function attend(){
    if(submitting.current)return;
    if(!selected){setStatus('error');setMessage('Pilih kegiatan terlebih dahulu.');return;}
    submitting.current=true;setStatus('loading');setSuccessText('');
    try{
      const rule=await attendanceService.locationRule(selected);
      let position={};
      if(rule?.enabled){
        setMessage(`Radius kegiatan ${rule.radius} m. Mengambil lokasi perangkat...`);
        position=await getCurrentLocation();
        setMessage(`Lokasi ditemukan (ketelitian ±${Math.round(position.accuracy)} m). Memeriksa jarak Anda...`);
      }
      const result=await attendanceService.submit(selected,position);
      const text=`Absensi berhasil dicatat${result?.StatusKehadiran?' sebagai '+result.StatusKehadiran:''}.`;
      setMessage(text);setSuccessText(text);
      await load({preserveResult:true});setStatus('success');
    }catch(e){setStatus('error');setMessage(e.message);}finally{submitting.current=false}
  }

  return <><PageHeader eyebrow="KEHADIRAN" title="Absensi Saya" description="Catat kehadiran Anda atau ajukan izin untuk kegiatan yang Anda ikuti."/>
    <div className="member-attendance-grid">
    <section className="panel attendance-panel">
      <div className="attendance-card-heading"><div className={'location-icon '+status}><MapPin/></div><div><h2>Absensi Kegiatan</h2><p>{activities.length===1?'Kegiatan Anda sudah dipilih. Catat kehadiran dengan tombol di bawah.':'Pilih kegiatan yang Anda ikuti dan catat kehadiran Anda.'}</p></div></div>
      {activities.length===1?<div className="attendance-single"><strong>{activities[0].NamaKegiatan}</strong><span>{String(activities[0].Tanggal||'').slice(0,10)} · {activities[0].Lokasi||'Lokasi belum dicantumkan'}</span>{activities[0].Kategori&&activities[0].Kategori!=='Biasa'&&<small>Anda ditunjuk sebagai peserta kegiatan {activities[0].Kategori.toLowerCase()}.</small>}</div>:activities.length>1&&<label className="attendance-select">Kegiatan
        <select value={selected} onChange={e=>setSelected(e.target.value)} disabled={status==='loading'}>
          <option value="">Pilih kegiatan...</option>
          {activities.map(k=><option key={k.ID} value={k.ID}>{k.NamaKegiatan||k.Nama||k.ID} — {String(k.Tanggal||'').slice(0,10)}</option>)}
        </select>
      </label>}
      <p className={'attendance-status '+status} role="status" aria-live="polite">{message}</p>{refreshWarning&&<div className="alert" role="alert">{refreshWarning}</div>}
      {selected&&<div className="attendance-radius"><p>{locationRule?.enabled?`Absensi berlaku dalam jarak ${locationRule.radius} meter dari lokasi kegiatan.`:locationRule?'Kegiatan ini tidak membatasi jarak absensi.':'Memeriksa aturan lokasi...'}</p>{locationRule?.enabled&&<button className="btn" onClick={checkRadius} disabled={checkingRadius||status==='loading'}><MapPin size={17}/>{checkingRadius?'Mencari lokasi...':'Cek Jarak Saya'}</button>}{radiusMessage&&<p role="status" aria-live="polite">{radiusMessage}</p>}</div>}
      <div className="attendance-actions">
        <button className="btn" onClick={()=>load({force:true})} disabled={status==='loading'}><RefreshCw size={17}/> Muat Ulang</button>
        <button className="btn primary" onClick={attend} disabled={status==='loading'||!selected}>
          <CalendarDays size={17}/>{status==='loading'?' Memproses...':' Absen Sekarang'}
        </button>
      </div>
      {status==='success'&&<div className="success-line"><CheckCircle2 size={18}/> {successText}</div>}
    </section>
    <section className="panel attendance-permission-panel"><div className="attendance-card-heading"><div className="location-icon"><CalendarDays/></div><div><h2>Pengajuan Izin / Sakit</h2><p>Ajukan izin untuk kegiatan yang masih terbuka.</p></div></div><p className="attendance-permission-note">Kegiatan yang sudah memiliki absensi atau pengajuan Anda tidak ditampilkan.</p>
      {permissionActivities.length===0?<div className="empty compact">Tidak ada kegiatan yang membuka pengajuan izin.</div>:permissionActivities.map(k=><div className="permission-row" key={k.ID}><div><strong>{k.NamaKegiatan}</strong><br/><small>{String(k.Tanggal||'').slice(0,10)} · {k.message||''}</small></div><button className="btn" onClick={()=>openPermission(k)} disabled={status==='loading'}>Ajukan Izin</button></div>)}
    </section>
    </div>
    {permission&&<div className="modal-backdrop"><div className="crud-modal" role="dialog" aria-modal="true" aria-labelledby="permission-title">
      <div className="modal-head"><h2 id="permission-title">Pengajuan Izin / Sakit</h2><button className="icon-btn" type="button" aria-label="Tutup" disabled={status==='loading'} onClick={()=>setPermission(null)}>×</button></div>
      <p>{permission.NamaKegiatan}</p>
      <form onSubmit={submitPermission}>
        <fieldset disabled={status==='loading'} style={{border:0,padding:0,margin:0}}><div className="form-grid">
          <label><span>Jenis pengajuan</span><select autoFocus value={kind} onChange={e=>{setKind(e.target.value);setProofKind(e.target.value==='Izin'?'Surat Izin':'Surat Dokter')}}><option>Izin</option><option>Sakit</option></select></label>
          <label><span>Jenis bukti</span><select value={proofKind} onChange={e=>setProofKind(e.target.value)}>{(kind==='Izin'?['Surat Izin']:['Surat Dokter','Bukti Obat']).map(x=><option key={x}>{x}</option>)}</select></label>
          <label className="full"><span>Alasan (maksimum 500 karakter)</span><textarea required maxLength={500} value={reason} onChange={e=>setReason(e.target.value)}/></label>
          <label className="full"><span>Bukti pendukung — PDF/JPG/PNG/WEBP, maksimum 3 MB</span><input type="file" required accept="application/pdf,image/jpeg,image/png,image/webp" onChange={e=>{setProof(e.target.files?.[0]||null);setFormError('')}}/></label>
        </div></fieldset>
        {formError&&<div className="alert" role="alert">{formError}</div>}
        <div className="modal-actions"><button className="btn" type="button" disabled={status==='loading'} onClick={()=>setPermission(null)}>Batal</button><button className="btn primary" disabled={status==='loading'}>{status==='loading'?'Mengirim...':'Kirim Pengajuan'}</button></div>
      </form>
    </div></div>}
  </>;
}
