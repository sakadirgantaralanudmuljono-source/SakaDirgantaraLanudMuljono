import {apiRequest} from './api';
export const assessmentStepService={
 saveComponent:(data)=>apiRequest('assessment.component.save',{data}),
 deleteComponent:(id)=>apiRequest('assessment.component.delete',{id}),
 saveEntry:(data)=>apiRequest('assessment.entry.save',{data}),
 deleteEntry:(id)=>apiRequest('assessment.entry.delete',{id}),
 saveSkk:(anggotaId,tanggal,changes)=>apiRequest('assessment.skk.save',{anggotaId,tanggal,changes}),
 generatePdf:(period)=>apiRequest('assessment.pdf.generate',{period})
};
