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

//UI TECNOLOGIA
import IndexTecnologia from 'ui/tecnologia/index';
import StoreTecnologia from 'ui/tecnologia/store';
import UpdateTecnologia from 'ui/tecnologia/update';

//UI PROYECTO
import IndexProyecto from 'ui/proyecto/index';
import StoreProyecto from 'ui/proyecto/store';
import UpdateProyecto from 'ui/proyecto/update';


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

        <Route element={<ProtectedRoute element={<Outlet />} allowedRoles={['superadmin']} />}>
            <Route path="/cliente/agregar" element={<StoreCliente />} />
            <Route path="/cliente/editar/:id" element={<UpdateCliente />} />
            <Route path="/cliente/listar" element={<IndexCliente />} />
        </Route>

        {/* =======================================================
            MÓDULO: TECNOLOGIAS
           ======================================================= */}

        <Route element={<ProtectedRoute element={<Outlet />} allowedRoles={['superadmin']} />}>
            <Route path="/tecnologia/agregar" element={<StoreTecnologia />} />
            <Route path="/tecnologia/editar/:id" element={<UpdateTecnologia />} />
            <Route path="/tecnologia/listar" element={<IndexTecnologia />} />
        </Route>

        {/* =======================================================
            MÓDULO: PROYECTOS
           ======================================================= */}

        <Route element={<ProtectedRoute element={<Outlet />} allowedRoles={['superadmin']} />}>
            <Route path="/proyecto/agregar" element={<StoreProyecto />} />
            <Route path="/proyecto/editar/:id" element={<UpdateProyecto />} />
            <Route path="/proyecto/listar" element={<IndexProyecto />} />
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