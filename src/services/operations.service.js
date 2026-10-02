import {apiRequest} from './api';
export const operationsService={
 transition:(kegiatanId,targetStatus,alasan='')=>apiRequest('activity.transition',{kegiatanId,targetStatus,alasan}),
 updateIzinRule:(payload)=>apiRequest('activity.permissionRule.update',payload),
 closeIzin:(kegiatanId)=>apiRequest('activity.permission.close',{kegiatanId}),
 saveBatchAttendance:(KegiatanID,rows)=>apiRequest('attendance.batch.save',{KegiatanID,rows}),
 getPermissions:(kegiatanId)=>apiRequest('permission.batch.get',{kegiatanId}),
 verifyPermission:(izinId,decision,catatan='')=>apiRequest('permission.verify',{izinId,decision,catatan})
};
