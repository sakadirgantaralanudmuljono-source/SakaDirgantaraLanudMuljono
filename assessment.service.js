import {apiRequest} from './api';
export const assessmentService={
  monthly:(period)=>apiRequest('assessment.month',{period}),
  memberHistory:(anggotaId)=>apiRequest('assessment.memberHistory',{anggotaId}),
  skk:(anggotaId)=>apiRequest('assessment.skk',{anggotaId})
};
