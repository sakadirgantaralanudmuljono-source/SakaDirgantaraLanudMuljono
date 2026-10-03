import {useEffect,useRef,useState} from 'react';
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

  const [permission,setPermission]=useState(null);
  const [kind,setKind]=useState('Izin');
  const [proofKind,setProofKind]=useState('Surat Izin');
  const [reason,setReason]=useState('');
  const [proof,setProof]=useState(null);
  const [formError,setFormError]=useState('');
  const [refreshWarning,setRefreshWarning]=useState('');
  const [successText,setSuccessText]=useState('');
  const submitting=useRef(false);

  async function load({preserveResult=false}={}){
    if(!preserveResult){setStatus('loading');setSuccessText('')}
    setRefreshWarning('');
    try{
      const rows=await attendanceService.activeActivities();
      setActivities(Array.isArray(rows)?rows:[]);
      try{const pr=await attendanceService.permissionActivities();setPermissionActivities(Array.isArray(pr)?pr:[])}catch(_){setPermissionActivities([]);setRefreshWarning('Daftar izin belum dapat dimuat. Silakan muat ulang.')}
      setSelected(previous=>rows?.some(x=>String(x.ID)===previous)?previous:rows?.length===1?String(rows[0].ID):'');
      if(!preserveResult){setMessage(rows?.length?'Pilih kegiatan lalu lakukan absensi.':'Saat ini tidak ada kegiatan yang membuka absensi.');
      setStatus('idle');}
    }catch(e){if(preserveResult)setRefreshWarning('Data berhasil dikirim, tetapi daftar belum diperbarui: '+e.message);else{setStatus('error');setMessage(e.message)}}
  }
  useEffect(()=>{load()},[]);


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
        setMessage(`GPS ditemukan (akurasi ±${Math.round(position.accuracy)} m). Backend sedang memvalidasi radius...`);
      }
      const result=await attendanceService.submit(selected,position);
      const text=`Absensi berhasil dicatat${result?.StatusKehadiran?' sebagai '+result.StatusKehadiran:''}.`;
      setMessage(text);setSuccessText(text);
      await load({preserveResult:true});setStatus('success');
    }catch(e){setStatus('error');setMessage(e.message);}finally{submitting.current=false}
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
      <p role="status" aria-live="polite">{message}</p>{refreshWarning&&<div className="alert" role="alert">{refreshWarning}</div>}
      <div className="attendance-actions">
        <button className="btn" onClick={()=>load()} disabled={status==='loading'}><RefreshCw size={17}/> Muat Ulang</button>
        <button className="btn primary" onClick={attend} disabled={status==='loading'||!selected}>
          <CalendarDays size={17}/>{status==='loading'?' Memproses...':' Absen Sekarang'}
        </button>
      </div>
      {status==='success'&&<div className="success-line"><CheckCircle2 size={18}/> {successText}</div>}
    </section>
    <section className="panel"><h2>Pengajuan Izin / Sakit</h2><p>Daftar berikut hanya menampilkan kegiatan yang masih membuka pengajuan dan belum memiliki absensi/pengajuan Anda.</p>
      {permissionActivities.length===0?<div className="empty compact">Tidak ada kegiatan yang membuka pengajuan izin.</div>:permissionActivities.map(k=><div className="permission-row" key={k.ID}><div><strong>{k.NamaKegiatan}</strong><br/><small>{String(k.Tanggal||'').slice(0,10)} · {k.message||''}</small></div><button className="btn" onClick={()=>openPermission(k)} disabled={status==='loading'}>Ajukan Izin</button></div>)}
    </section>
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
