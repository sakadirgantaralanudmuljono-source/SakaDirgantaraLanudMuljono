import {apiRequest} from './api';
export const step2Service={
 saveComponent:data=>apiRequest('assessment.component.save',{data}),deleteComponent:id=>apiRequest('assessment.component.delete',{id}),
 saveAssessment:data=>apiRequest('assessment.entry.save',{data}),deleteAssessment:id=>apiRequest('assessment.entry.delete',{id}),
 saveSkk:(anggotaId,tanggal,changes)=>apiRequest('assessment.skk.save',{anggotaId,tanggal,changes}),
 activityInventory:kegiatanId=>apiRequest('activity.inventory.get',{kegiatanId}),
 saveActivityInventory:(kegiatanId,data)=>apiRequest('activity.inventory.save',{kegiatanId,data}),
 deleteActivityInventory:id=>apiRequest('activity.inventory.delete',{id}),
 report:kegiatanId=>apiRequest('activity.report.get',{kegiatanId}),saveReport:(kegiatanId,data)=>apiRequest('activity.report.save',{kegiatanId,data}),
 uploadDoc:(kegiatanId,file)=>apiRequest('activity.documentation.upload',{kegiatanId,file}),
 previewDoc:id=>apiRequest('activity.documentation.preview',{id}),updateDoc:(id,data)=>apiRequest('activity.documentation.update',{id,data}),deleteDoc:id=>apiRequest('activity.documentation.delete',{id}),
 notifications:()=>apiRequest('notifications.get'),markRead:ids=>apiRequest('notifications.read',{ids}),
 attendanceLink:kegiatanId=>apiRequest('activity.attendanceLink',{kegiatanId}),
 permissionLink:kegiatanId=>apiRequest('activity.permissionLink',{kegiatanId}),
 permissionSummary:kegiatanId=>apiRequest('activity.permissionSummary',{kegiatanId}),
 generateAssessmentPdf:period=>apiRequest('assessment.pdf.generate',{period}),
 generateReportPdf:kegiatanId=>apiRequest('activity.report.pdf',{kegiatanId}),
 uploadInventoryPhoto:(kegiatanId,recordId,phase,file)=>apiRequest('activity.inventory.photo',{kegiatanId,recordId,phase,file}),
 permissionProof:izinId=>apiRequest('permission.proofPreview',{izinId}),
 permissionDetail:id=>apiRequest('notifications.permissionDetail',{id}),
 permissionVerify:(id,decision,note='')=>apiRequest('notifications.permissionVerify',{id,decision,note}),
 permissions:()=>apiRequest('permissions.get'),savePermissions:rows=>apiRequest('permissions.save',{rows})
};
