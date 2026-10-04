import {apiRequest} from './api';
export const activityService={
 inventory:(kegiatanId)=>apiRequest('activity.inventory.get',{kegiatanId}),
 saveInventory:(kegiatanId,data)=>apiRequest('activity.inventory.save',{kegiatanId,data}),
 deleteInventory:(id)=>apiRequest('activity.inventory.delete',{id}),
 uploadInventoryPhoto:(kegiatanId,recordId,phase,file)=>apiRequest('activity.inventory.photo',{kegiatanId,recordId,phase,file}),
 report:(kegiatanId)=>apiRequest('activity.report.get',{kegiatanId}),
 saveReport:(kegiatanId,data)=>apiRequest('activity.report.save',{kegiatanId,data}),
 uploadDocumentation:(kegiatanId,file)=>apiRequest('activity.documentation.upload',{kegiatanId,file}),
 previewDocumentation:(id)=>apiRequest('activity.documentation.preview',{id}),
 updateDocumentation:(id,data)=>apiRequest('activity.documentation.update',{id,data}),
 deleteDocumentation:(id)=>apiRequest('activity.documentation.delete',{id}),
 attendanceLink:(kegiatanId)=>apiRequest('activity.attendanceLink',{kegiatanId}),
 permissionLink:(kegiatanId)=>apiRequest('activity.permissionLink',{kegiatanId}),
 permissionSummary:async(kegiatanId)=>{const rows=await apiRequest('activity.permissionSummary',{kegiatanId});if(!Array.isArray(rows))return rows;return {total:rows.length,menunggu:rows.filter(x=>['Menunggu Verifikasi','Terkirim'].includes(x.Status)).length,disetujui:rows.filter(x=>x.Status==='Disetujui').length,ditolak:rows.filter(x=>x.Status==='Ditolak').length};},
 generateReportPdf:(kegiatanId)=>apiRequest('activity.report.pdf',{kegiatanId})
};
