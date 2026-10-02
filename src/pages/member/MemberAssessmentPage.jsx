import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import {assessmentService} from '../../services/assessment.service';
import {useAuth} from '../../context/AuthContext';
import {useRemoteData} from '../../hooks/useRemoteData';
const columns=[{key:'periodLabel',label:'Periode'},{key:'score',label:'Nilai',render:v=>Number(v||0).toFixed(2)},{key:'predicate',label:'Predikat'},{key:'attendance',label:'Kehadiran',render:v=>v?`${v.Hadir||0} hadir, ${v.Izin||0} izin, ${v.Sakit||0} sakit, ${v.Alpa||0} alpa`:'—'}];
export default function MemberAssessmentPage(){
 const {session}=useAuth();const id=session?.user?.AnggotaID||'';
 const {data,loading,error,reload}=useRemoteData(()=>assessmentService.memberHistory(id),[id]);
 const rows=Array.isArray(data)?data:[];const latest=rows.length?rows[rows.length-1]:null;
 return <><PageHeader eyebrow="PERKEMBANGAN" title="Penilaian Saya" description="Riwayat nilai pribadi dari backend Google Apps Script."/>
 {error&&<div className="alert">{error}</div>}<div className="stat-grid"><article className="stat-card"><small>Nilai Terakhir</small><strong>{latest?Number(latest.score||0).toFixed(2):'—'}</strong><span>{latest?.periodLabel||'Belum ada penilaian'}</span></article><article className="stat-card"><small>Predikat Terakhir</small><strong>{latest?.predicate||'—'}</strong><span>{latest?.review||'Belum ada penilaian'}</span></article></div>
 <section className="panel section-gap"><div className="toolbar"><h2>Riwayat Penilaian</h2><button className="btn" onClick={reload}>Muat Ulang</button></div><DataTable columns={columns} rows={rows} empty={loading?'Memuat riwayat...':'Belum ada data penilaian.'}/></section></>;
}
