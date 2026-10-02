import {Routes,Route,Navigate} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';
import AppLayout from '../components/layout/AppLayout';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import AttendancePage from '../pages/member/AttendancePage';
import AnggotaPage from '../pages/admin/AnggotaPage';
import ActivitiesPage from '../pages/admin/ActivitiesPage';
import AdminAttendancePage from '../pages/admin/AdminAttendancePage';
import AssessmentPage from '../pages/admin/AssessmentPage';
import FinancePage from '../pages/admin/FinancePage';
import InventoryPage from '../pages/admin/InventoryPage';
import LettersPage from '../pages/admin/LettersPage';
import ManagementPage from '../pages/admin/ManagementPage';
import UsersPage from '../pages/admin/UsersPage';
import MaintenancePage from '../pages/admin/MaintenancePage';
import ProfilePage from '../pages/member/ProfilePage';
import MemberAssessmentPage from '../pages/member/MemberAssessmentPage';
import {useAuth} from '../context/AuthContext';

const ADMIN_ROLES=['ADMIN','PENGURUS'];
const AdminOnly=({children})=><RoleRoute roles={ADMIN_ROLES}>{children}</RoleRoute>;

function AttendanceRouter(){
  const {session}=useAuth();
  const role=String(session?.user?.Role||session?.role||'ANGGOTA').toUpperCase();
  return role==='ANGGOTA'?<AttendancePage/>:<AdminAttendancePage/>;
}
function AssessmentRouter(){
  const {session}=useAuth();
  const role=String(session?.user?.Role||session?.role||'ANGGOTA').toUpperCase();
  return role==='ANGGOTA'?<MemberAssessmentPage/>:<AssessmentPage/>;
}
export default function AppRoutes(){
  return <Routes>
    <Route path="/login" element={<LoginPage/>}/>
    <Route element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/profil" element={<ProfilePage/>}/>
      <Route path="/absensi" element={<AttendanceRouter/>}/>
      <Route path="/penilaian" element={<AssessmentRouter/>}/>
      <Route path="/anggota" element={<AdminOnly><AnggotaPage/></AdminOnly>}/>
      <Route path="/kegiatan" element={<AdminOnly><ActivitiesPage/></AdminOnly>}/>
      <Route path="/kas" element={<AdminOnly><FinancePage/></AdminOnly>}/>
      <Route path="/inventaris" element={<AdminOnly><InventoryPage/></AdminOnly>}/>
      <Route path="/surat" element={<AdminOnly><LettersPage/></AdminOnly>}/>
      <Route path="/pengurus" element={<AdminOnly><ManagementPage/></AdminOnly>}/>
      <Route path="/users" element={<AdminOnly><UsersPage/></AdminOnly>}/>
      <Route path="/maintenance" element={<AdminOnly><MaintenancePage/></AdminOnly>}/>
    </Route>
    <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
  </Routes>;
}
