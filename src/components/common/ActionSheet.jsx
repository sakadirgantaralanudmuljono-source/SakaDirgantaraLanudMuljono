export default function ActionSheet({open,title='Aksi',items=[],onClose}){
 if(!open) return null;
 return <div className="action-overlay" onClick={onClose}>
   <div className="action-sheet" onClick={e=>e.stopPropagation()}>
    <div className="action-sheet-head"><b>{title}</b><button className="icon-btn" onClick={onClose}>×</button></div>
    {items.map((x,i)=><button key={i} className={x.danger?'action-item danger':''} onClick={()=>{onClose();x.onClick();}}>{x.icon||'•'} {x.label}</button>)}
   </div>
 </div>
}
