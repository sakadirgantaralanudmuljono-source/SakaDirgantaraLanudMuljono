import { AlertTriangle, X, Trash2 } from "lucide-react";

export default function ConfirmDialog({open,title="Konfirmasi",message,confirmText="Ya, lanjutkan",onConfirm,onCancel,danger=true}){
 if(!open) return null;
 return <div className="confirm-overlay">
   <div className="confirm-dialog">
    <button className="confirm-close" onClick={onCancel}><X size={18}/></button>
    <div className="confirm-icon"><AlertTriangle size={22}/></div>
    <h3>{title}</h3>
    <p>{message}</p>
    <div className="confirm-actions">
      <button className="btn" onClick={onCancel}>Batal</button>
      <button className={danger?"btn danger":"btn primary"} onClick={onConfirm}>{danger&&<Trash2 size={15}/>} {confirmText}</button>
    </div>
   </div>
 </div>
}
