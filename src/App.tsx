import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/public/Home';
import Portfolio from './pages/public/Portfolio';
import Services from './pages/public/Services';
import Blog from './pages/public/Blog';
import BlogPost from './pages/public/BlogPost';
import Quote from './pages/public/Quote';
import Login from './pages/auth/Login';
import ClientDashboard from './pages/client/Dashboard';
import ClientProjects from './pages/client/Projects';
import ClientFiles from './pages/client/Files';
import ClientMessages from './pages/client/Messages';
import ClientMeetings from './pages/client/Meetings';
import AdminDashboard from './pages/admin/Dashboard';
import AdminClients from './pages/admin/Clients';
import AdminProjects from './pages/admin/Projects';
import AdminFiles from './pages/admin/Files';
import AdminBlog from './pages/admin/Blog';
import AdminChatbot from './pages/admin/Chatbot';
import AdminMeetings from './pages/admin/Meetings';
import AdminSettings from './pages/admin/Settings';
import ClientLayout from './components/layout/ClientLayout';
import AdminLayout from './components/layout/AdminLayout';
import Chatbot from './components/chatbot/Chatbot';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/auth/login" element={<Login />} />
            </Route>

            {/* Client Routes (Protected) */}
            <Route path="/client" element={
              <ProtectedRoute requiredRole="client">
                <ClientLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<ClientDashboard />} />
              <Route path="projects" element={<ClientProjects />} />
              <Route path="files" element={<ClientFiles />} />
              <Route path="messages" element={<ClientMessages />} />
              <Route path="meetings" element={<ClientMeetings />} />
            </Route>

            {/* Admin Routes (Protected) */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="files" element={<AdminFiles />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="chatbot" element={<AdminChatbot />} />
              <Route path="meetings" element={<AdminMeetings />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      <Chatbot />
    </AuthProvider>
  );
}

export default App;
