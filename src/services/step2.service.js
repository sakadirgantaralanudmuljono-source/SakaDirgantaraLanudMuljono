// Compatibility layer. Service lama tetap tersedia agar modul existing tidak rusak.
export {activityService as step2ActivityService} from './activity.service';
export {assessmentStepService as step2AssessmentService} from './assessment.step.service';
export {permissionService as step2PermissionService} from './permission.service';

import {activityService} from './activity.service';
import {assessmentStepService} from './assessment.step.service';
import {permissionService} from './permission.service';

export const step2Service={
 ...activityService,
 ...assessmentStepService,
 ...permissionService,
 saveAssessment:assessmentStepService.saveEntry,
 saveComponent:assessmentStepService.saveComponent,
 deleteComponent:assessmentStepService.deleteComponent,
 deleteAssessment:assessmentStepService.deleteEntry,
 saveSkk:assessmentStepService.saveSkk,
 generateAssessmentPdf:assessmentStepService.generatePdf,
 activityInventory:activityService.inventory,
 saveActivityInventory:activityService.saveInventory,
 deleteActivityInventory:activityService.deleteInventory,
 uploadDoc:activityService.uploadDocumentation,
 previewDoc:activityService.previewDocumentation,
 updateDoc:activityService.updateDocumentation,
 deleteDoc:activityService.deleteDocumentation
};
