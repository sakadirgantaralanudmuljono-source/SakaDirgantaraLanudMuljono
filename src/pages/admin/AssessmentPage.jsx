import {useMemo,useState} from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import {assessmentService} from '../../services/assessment.service';
import {useRemoteData} from '../../hooks/useRemoteData';

function currentPeriod(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`}
const columns=[
 {key:'NTA',label:'NTA'}, {key:'Nama',label:'Nama'}, {key:'Krida',label:'Krida'},
 {key:'score',label:'Nilai',render:v=>v==null?'—':Number(v).toFixed(2)},
 {key:'predicate',label:'Predikat'},
 {key:'attendance',label:'Kehadiran',render:v=>v?`${v.Hadir||0} hadir / ${v.meetings||0} kegiatan`:'—'}
];
export default function AssessmentPage(){
 const [period,setPeriod]=useState(currentPeriod());
 const loader=useMemo(()=>()=>assessmentService.monthly(period),[period]);
 const {data,loading,error,reload}=useRemoteData(loader,[period]);
 const rows=data?.rows||[];
 return <><PageHeader eyebrow="PENILAIAN" title="Penilaian & SKK" description="Rekap penilaian aktual dari backend Google Apps Script."/>
 <section className="panel"><div className="toolbar"><label>Periode <input type="month" value={period} onChange={e=>setPeriod(e.target.value)}/></label><span>{loading?'Memuat...':`${rows.length} anggota`}</span><button className="btn" onClick={reload}>Muat Ulang</button></div>
 {error&&<div className="alert">{error}</div>}
 {data?.summary&&<div className="stat-grid compact-stats"><article className="stat-card"><small>Anggota Dinilai</small><strong>{data.summary.assessedMembers}/{data.summary.totalMembers}</strong></article><article className="stat-card"><small>Rata-rata</small><strong>{Number(data.summary.averageScore||0).toFixed(2)}</strong></article><article className="stat-card"><small>Kegiatan</small><strong>{data.meetingCount||0}</strong></article><article className="stat-card"><small>SKK Selesai</small><strong>{data.summary.skkCompleted||0}</strong></article></div>}
 <DataTable columns={columns} rows={rows} empty={loading?'Memuat data penilaian...':'Belum ada data penilaian pada periode ini.'}/></section></>;
}
