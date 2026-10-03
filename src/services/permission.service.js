import {apiRequest} from './api';
export const permissionService={
 getPermissions:()=>apiRequest('permissions.get'),
 savePermissions:(rows)=>apiRequest('permissions.save',{rows}),
 proofPreview:(izinId)=>apiRequest('permission.proofPreview',{izinId}),
 detail:(id)=>apiRequest('notifications.permissionDetail',{id}),
 verify:(id,decision,note='')=>apiRequest('notifications.permissionVerify',{id,decision,note}),
 notifications:()=>apiRequest('notifications.get'),
 markRead:(ids)=>apiRequest('notifications.read',{ids})
};
