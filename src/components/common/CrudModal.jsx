import {useEffect,useState} from 'react';
export default function CrudModal({open,title,fields,initial,onClose,onSave,saving}){
 const [form,setForm]=useState({});
 useEffect(()=>{if(open)setForm(initial||{})},[open,initial]);
 if(!open)return null;
 const change=(key,val)=>setForm(x=>({...x,[key]:val}));
 return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <div className="crud-modal" role="dialog" aria-modal="true"><div className="modal-head"><h2>{title}</h2><button className="icon-btn" onClick={onClose} type="button">×</button></div>
  <form onSubmit={e=>{e.preventDefault();onSave(form)}}><div className="form-grid">
   {fields.map(f=><label key={f.key} className={f.full?'full':''}>{f.label}{f.type==='select'
    ?<select value={form[f.key]??''} required={f.required} onChange={e=>change(f.key,e.target.value)}><option value="">Pilih...</option>{(f.options||[]).map(o=>{const v=typeof o==='object'?o.value:o,l=typeof o==='object'?o.label:o;return <option key={v} value={v}>{l}</option>})}</select>
    :f.type==='textarea'?<textarea value={form[f.key]??''} required={f.required} onChange={e=>change(f.key,e.target.value)}/>
    :<input type={f.type||'text'} value={form[f.key]??''} required={f.required} min={f.min} step={f.step} placeholder={f.placeholder||''} onChange={e=>change(f.key,e.target.value)}/>}</label>)}
  </div><div className="modal-actions"><button className="btn" type="button" onClick={onClose}>Batal</button><button className="btn primary" disabled={saving}>{saving?'Menyimpan...':'Simpan'}</button></div></form></div>
 </div>
}
