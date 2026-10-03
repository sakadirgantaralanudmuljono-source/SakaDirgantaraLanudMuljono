import { Search } from 'lucide-react';
import { useState } from 'react';

export default function GlobalSearch(){
 const [q,setQ]=useState('');
 return <div className="global-search">
   <Search size={16}/>
   <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari anggota, kegiatan, laporan..." />
 </div>
}
