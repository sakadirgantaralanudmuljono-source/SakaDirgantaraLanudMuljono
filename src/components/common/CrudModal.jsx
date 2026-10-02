import {useEffect,useState} from 'react';import {X} from 'lucide-react';
export default function CrudModal({open,title,fields,initial,onClose,onSave,saving}){
 const [form,setForm]=useState({});
 useEffect(()=>{if(open)setForm(initial||{})},[open,initial]);
 useEffect(()=>{if(!open)return;const key=e=>{if(e.key==='Escape'&&!saving)onClose()};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key)},[open,saving,onClose]);
 if(!open)return null;
 const change=(key,val)=>setForm(x=>({...x,[key]:val}));
 return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget&&!saving)onClose()}}>
  <div className="crud-modal" role="dialog" aria-modal="true" aria-label={title}><div className="modal-head"><div><h2>{title}</h2><p className="muted">Lengkapi informasi berikut, lalu simpan perubahan.</p></div><button className="icon-btn" aria-label="Tutup" onClick={onClose} type="button"><X size={18}/></button></div>
  <form onSubmit={e=>{e.preventDefault();onSave(form)}}><div className="form-grid">
   {fields.map(f=><label key={f.key} className={f.full?'full':''}><span>{f.label}{f.required&&<b aria-hidden="true"> *</b>}</span>{f.type==='select'
    ?<select value={form[f.key]??''} required={f.required} onChange={e=>change(f.key,e.target.value)}><option value="">Pilih...</option>{(f.options||[]).map(o=>{const v=typeof o==='object'?o.value:o,l=typeof o==='object'?o.label:o;return <option key={v} value={v}>{l}</option>})}</select>
    :f.type==='textarea'?<textarea value={form[f.key]??''} required={f.required} placeholder={f.placeholder||'Masukkan keterangan...'} onChange={e=>change(f.key,e.target.value)}/>
    :<input type={f.type||'text'} value={form[f.key]??''} required={f.required} min={f.min} step={f.step} placeholder={f.placeholder||''} onChange={e=>change(f.key,e.target.value)}/>}</label>)}
  </div><div className="modal-actions"><button className="btn" type="button" disabled={saving} onClick={onClose}>Batal</button><button className="btn primary" disabled={saving}>{saving?'Menyimpan...':'Simpan Perubahan'}</button></div></form></div>
 </div>
}
