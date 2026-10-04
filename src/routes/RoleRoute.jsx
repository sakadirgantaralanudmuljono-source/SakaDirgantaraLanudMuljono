import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export default function RoleRoute({roles,children}){
  const {session}=useAuth();
  const role=String(session?.user?.Role || session?.user?.role || session?.role || '').toUpperCase();
  const allowed=roles.map(x=>String(x).toUpperCase());
  return allowed.includes(role) ? children : <Navigate to="/dashboard" replace/>;
}
