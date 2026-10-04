import { LoaderCircle } from 'lucide-react';

export default function LoadingOverlay({open, message='Memproses data', progress=60}){
  if(!open) return null;
  return <div className="loading-overlay">
    <div className="loading-card">
      <LoaderCircle className="loading-icon spin" size={38}/>
      <h3>{message}</h3>
      <div className="progress-track"><span style={{width:`${progress}%`}} /></div>
      <small>Mohon tunggu, data sedang diproses.</small>
    </div>
  </div>
}
