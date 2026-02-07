import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// Componentes Globales
import { ToastContainer } from 'react-toastify';
import SidebarLayout from 'layouts/SidebarLayout';

// UIS AUTH & ERRORS
import ErrorPage404 from 'components/ErrorPage404';
import ErrorPage401 from 'components/ErrorPage401';
import Login from 'pages/auth/Login/Login';

// UI HOME
import Home from 'pages/home/Home';

//UI PORTFOLIO
import Portfolio from 'pages/portfolio/Portfolio';

//UI CLIENTE
import IndexCliente from 'pages/cliente/index';
import StoreCliente from 'pages/cliente/store';
import UpdateCliente from 'pages/cliente/update';

//UI TECNOLOGIA
import IndexTecnologia from 'pages/tecnologia/index';
import StoreTecnologia from 'pages/tecnologia/store';
import UpdateTecnologia from 'pages/tecnologia/update';

//UI PROYECTO
import IndexProyecto from 'pages/proyecto/index';
import StoreProyecto from 'pages/proyecto/store';
import UpdateProyecto from 'pages/proyecto/update';

//UI EXPERIENCIA
import IndexExperiencia from 'pages/experiencia/index';
import StoreExperiencia from 'pages/experiencia/store';
import UpdateExperiencia from 'pages/experiencia/update';

//UI CV
import IndexCv from 'pages/cv/index';
import StoreCv from 'pages/cv/store';
import UpdateCv from 'pages/cv/update';

// Utilities
import ProtectedRouteHome from 'utilities/ProtectedRoutes/ProtectedRouteHome';
import ProtectedRoute from 'utilities/ProtectedRoutes/ProtectedRoute';
import { AuthProvider } from 'context/AuthContext';

function AppContent() {
  return (
    <Routes>
      {/* PORTFOLIO */}
      <Route path="/" element={<ProtectedRouteHome element={<Portfolio />} />} />


      {/* Login */}
      <Route path="/login" element={<ProtectedRouteHome element={<Login />} />} />

      {/* LAYOUT GLOBAL */}
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

        {/* =======================================================
            MÓDULO: EXPERIENCIA
           ======================================================= */}

        <Route element={<ProtectedRoute element={<Outlet />} allowedRoles={['superadmin']} />}>
            <Route path="/experiencia/agregar" element={<StoreExperiencia />} />
            <Route path="/experiencia/editar/:id" element={<UpdateExperiencia />} />
            <Route path="/experiencia/listar" element={<IndexExperiencia  />} />
        </Route>

        {/* =======================================================
            MÓDULO: CV
           ======================================================= */}

        <Route element={<ProtectedRoute element={<Outlet />} allowedRoles={['superadmin']} />}>
            <Route path="/cv/agregar" element={<StoreCv />} />
            <Route path="/cv/editar/:id" element={<UpdateCv />} />
            <Route path="/cv/listar" element={<IndexCv />} />
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