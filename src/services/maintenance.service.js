import {apiRequest} from './api';
export const maintenanceService={
 check:()=>apiRequest('system.structure'),
 update:(confirmCleanup=false)=>apiRequest('system.updateStructure',{confirmCleanup}),
 resetSessions:()=>apiRequest('system.safeReset'),
 importBatch:(sheetName,rows,context)=>apiRequest('system.importBatch',{sheetName,rows,context}),
 finishImport:summary=>apiRequest('system.importFinish',{summary})
};
