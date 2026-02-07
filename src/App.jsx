import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// Componentes Globales
import { ToastContainer } from 'react-toastify';
import SidebarLayout from 'layouts/SidebarLayout';

// UIS AUTH & ERRORS
import ErrorPage404 from 'components/ErrorPage404';
import ErrorPage401 from 'components/ErrorPage401';
import Login from 'ui/auth/Login/Login';

// UI HOME
import Home from 'ui/home/Home';

//UI CLIENTE
import IndexCliente from 'ui/cliente/index';
import StoreCliente from 'ui/cliente/store';
import UpdateCliente from 'ui/cliente/update';

// Utilities
import ProtectedRouteHome from 'utilities/ProtectedRoutes/ProtectedRouteHome';
import ProtectedRoute from 'utilities/ProtectedRoutes/ProtectedRoute';
import { AuthProvider } from 'context/AuthContext';

function AppContent() {
  return (
    <Routes>
      {/* 1. LOGIN */}
      <Route path="/" element={<ProtectedRouteHome element={<Login />} />} />

      {/* 2. LAYOUT GLOBAL */}
      <Route
        element={
          <ProtectedRoute 
            element={<SidebarLayout />} 
            allowedRoles={['superadmin', 'admin', 'usuario']} 
          />
        }
      >
        <Route path="/home" element={<Home />} />

        {/* =======================================================
            MÓDULO: CLIENTES
           ======================================================= */}

        <Route element={<ProtectedRoute element={<Outlet />} allowedRoles={['superadmin' ,  'admin']} />}>
            <Route path="/cliente/agregar" element={<StoreCliente />} />
            <Route path="/cliente/editar/:id" element={<UpdateCliente />} />
            <Route path="/cliente/listar" element={<IndexCliente />} />
        </Route>

      </Route>

      {/* 3. ERRORES */}
      <Route path="/401" element={<ErrorPage401 />} />
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white text-primary">
          <AppContent />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;