import {Search} from 'lucide-react';
import {useEffect,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {moduleService} from '../../services/module.service';
import {useAuth} from '../../context/AuthContext';
const sources={anggota:['Nama','NTA'],kegiatan:['NamaKegiatan','Lokasi'],inventaris:['NamaBarang','KodeBarang'],kas:['Keterangan','NoBukti'],surat:['Perihal','NomorSurat']};
export default function GlobalSearch({groups=[]}){
 const {session}=useAuth();const location=useLocation();const [q,setQ]=useState(''),[results,setResults]=useState([]),[loading,setLoading]=useState(false),[error,setError]=useState('');
 const needle=q.trim().toLowerCase();const menus=groups.flatMap(g=>g.items).filter(([path,label])=>`${path} ${label}`.toLowerCase().includes(needle));
 const visiblePaths=groups.flatMap(g=>g.items.map(([p])=>p)).join(',');
 useEffect(()=>{setQ('');setResults([])},[location.pathname,location.search]);
 useEffect(()=>{let live=true;setResults([]);setError('');if(needle.length<2||session?.user?.Role==='ANGGOTA')return;setLoading(true);const timer=setTimeout(async()=>{try{const names=Object.keys(sources).filter(x=>visiblePaths.split(',').includes(x));if(!names.length)return;const data=await moduleService.modules(names);const items=[];names.forEach(module=>(data[module]||[]).forEach(row=>{const text=sources[module].map(k=>String(row[k]||'')).join(' ');if(text.toLowerCase().includes(needle))items.push({key:module+row.ID,label:text,to:module==='kegiatan'?`/activity-details?kegiatanId=${encodeURIComponent(row.ID)}`:`/${module}?q=${encodeURIComponent(row[sources[module][0]]||needle)}`})}));if(live)setResults(items.slice(0,12))}catch(e){if(live)setError(e.message)}finally{if(live)setLoading(false)}},250);return()=>{live=false;clearTimeout(timer)}},[needle,visiblePaths,session?.user?.Role]);
 return <div className="global-search"><Search size={16}/><input aria-label="Pencarian global" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==='Escape')setQ('')}} placeholder="Cari menu atau data..."/>
 {needle&&<div className="search-results" role="region" aria-label="Hasil pencarian">{menus.map(([path,label])=><Link key={path} to={'/'+path}>{label}<small>Menu</small></Link>)}{results.map(x=><Link key={x.key} to={x.to}>{x.label}</Link>)}{loading&&needle.length>=2&&<p>Memuat data...</p>}{error&&<p>{error}</p>}{!loading&&!menus.length&&!results.length&&!error&&<p>Tidak ada hasil.</p>}</div>}</div>;
}
