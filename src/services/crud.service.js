import {apiRequest} from './api';
export const crudService={
 save:(module,data)=>apiRequest(`crud.${module}.save`,{data}),
 remove:(module,id)=>apiRequest(`crud.${module}.delete`,{id})
};
