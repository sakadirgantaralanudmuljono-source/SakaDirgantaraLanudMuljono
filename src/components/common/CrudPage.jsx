import {useMemo,useState} from 'react';
import PageHeader from './PageHeader';import DataTable from './DataTable';import CrudModal from './CrudModal';
import {crudService} from '../../services/crud.service';import {useRemoteData} from '../../hooks/useRemoteData';
export default function CrudPage({eyebrow,title,description,module,loader,columns,fields,normalize=(x)=>x}){
 const {data,loading,error,reload}=useRemoteData(loader,[]);
 const [modal,setModal]=useState(false),[editing,setEditing]=useState(null),[busy,setBusy]=useState(false),[actionError,setActionError]=useState('');
 const rows=useMemo(()=>Array.isArray(data)?data:[],[data]);
 const actionColumns=[...columns,{key:'__actions',label:'Aksi',render:r=><div className="row-actions"><button className="btn small" onClick={()=>{setEditing(r);setModal(true)}}>Edit</button><button className="btn small danger" onClick={()=>remove(r)}>Hapus</button></div>}];
 async function save(form){setBusy(true);setActionError('');try{await crudService.save(module,normalize(form));setModal(false);setEditing(null);await reload()}catch(e){setActionError(e.message)}finally{setBusy(false)}}
 async function remove(row){if(!confirm(`Hapus data ini? Tindakan ini tidak dapat dibatalkan.`))return;setBusy(true);setActionError('');try{await crudService.remove(module,row.ID);await reload()}catch(e){setActionError(e.message)}finally{setBusy(false)}}
 return <><PageHeader eyebrow={eyebrow} title={title} description={description}/><section className="panel"><div className="toolbar"><span>{loading?'Memuat...':`${rows.length} data`}</span><div><button className="btn" onClick={reload}>Muat Ulang</button> <button className="btn primary" onClick={()=>{setEditing(null);setModal(true)}}>+ Tambah Data</button></div></div>
 {(error||actionError)&&<div className="alert">{error||actionError}</div>}<DataTable columns={actionColumns} rows={rows} empty="Belum ada data."/></section>
 <CrudModal open={modal} title={`${editing?'Edit':'Tambah'} ${title}`} fields={fields} initial={editing||{}} saving={busy} onClose={()=>{setModal(false);setEditing(null)}} onSave={save}/></>
}
