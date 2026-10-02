import {apiRequest} from './api';

export const attendanceService={
  dashboardActivities:()=>apiRequest('member.activities.dashboard'),
  activeActivities:()=>apiRequest('member.activities.active'),
  permissionActivities:()=>apiRequest('member.activities.permission'),
  locationRule:(kegiatanId)=>apiRequest('member.attendance.rule',{kegiatanId}),
  submit:(kegiatanId,position)=>apiRequest('member.attendance.submit',{
    kegiatanId,
    position:{
      latitude:Number(position.latitude),
      longitude:Number(position.longitude),
      accuracy:Number(position.accuracy),
      timestamp:Number(position.timestamp||Date.now())
    }
  }),
  submitPermission:(payload)=>apiRequest('member.permission.submit',payload)
};
