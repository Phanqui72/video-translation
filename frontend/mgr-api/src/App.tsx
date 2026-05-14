import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from './features/auth/pages/ResetPasswordPage';
import UserManagementPage from './features/admin/pages/UserManagementPage';
import RoleManagementPage from './features/admin/pages/RoleManagementPage';
import ProjectManagementPage from './features/video/pages/ProjectManagementPage';
import VideoManagementPage from './features/video/pages/VideoManagementPage';
import AIPipelinePage from './features/video/pages/AIPipelinePage';
import VideoEditorPage from './features/video/pages/VideoEditorPage';
import DashboardPage from './features/video/pages/DashboardPage';
import LandingPage from './features/video/pages/LandingPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* Core App Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><ProjectManagementPage /></ProtectedRoute>} />
        <Route path="/videos" element={<ProtectedRoute><VideoManagementPage /></ProtectedRoute>} />
        <Route path="/editor/:projectId" element={<ProtectedRoute><VideoEditorPage /></ProtectedRoute>} />
        <Route path="/ai-pipeline" element={<ProtectedRoute><AIPipelinePage /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/users" element={<ProtectedRoute><UserManagementPage /></ProtectedRoute>} />
        <Route path="/admin/rbac" element={<ProtectedRoute><RoleManagementPage /></ProtectedRoute>} />
        
        {/* Default Redirects */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
