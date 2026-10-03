import { X } from 'lucide-react';

export default function ActionSheet({open,title='Aksi',items=[],onClose}){
 if(!open) return null;
 return <div className="action-overlay" onClick={onClose}>
   <div className="action-sheet" onClick={e=>e.stopPropagation()}>
    <div className="action-handle" />
    <div className="action-sheet-head">
      <div>
        <small>KELOLA KEGIATAN</small>
        <b>{title}</b>
      </div>
      <button className="icon-btn" onClick={onClose}><X size={18}/></button>
    </div>
    <div className="action-list">
    {items.map((x,i)=><button key={i} className={`action-item ${x.danger?'danger':''}`} onClick={()=>{onClose();x.onClick();}}>
      <span className="action-item-icon">{x.icon}</span>
      <span>{x.label}</span>
    </button>)}
    </div>
   </div>
 </div>
}
