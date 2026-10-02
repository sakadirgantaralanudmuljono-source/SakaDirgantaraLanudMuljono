import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export default function ProtectedRoute({children}){
  const {session,authReady}=useAuth();
  if(!authReady) return <main className="route-loading">Memeriksa sesi...</main>;
  return session ? children : <Navigate to="/login" replace/>;
}
