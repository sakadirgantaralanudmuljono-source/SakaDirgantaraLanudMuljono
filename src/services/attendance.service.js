import { api } from './api';
export const attendanceService={
 submit:(token,activityId,position)=>api('submitMemberAttendance',{token,activityId,position}),
 list:(token)=>api('getAttendanceData',{token})
};
