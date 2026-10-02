import { api } from './api';
export const authService={
 login:(username,password)=>api('login',{username,password}),
 logout:(token)=>api('logout',{token}),
 dashboard:(token)=>api('getDashboardData',{token}),
 permissions:(token)=>api('getRolePermissions',{token})
};
