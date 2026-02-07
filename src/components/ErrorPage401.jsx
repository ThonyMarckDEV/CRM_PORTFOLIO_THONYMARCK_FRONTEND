import React from 'react';
import { FaLock } from 'react-icons/fa'; // Icono de candado es más semántico para 401

const ErrorPage401 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black overflow-hidden relative selection:bg-black selection:text-white">
      
      {/* Fondo geométrico minimalista */}
      <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-black"></div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        
        {/* Icono Candado */}
        <div className="flex justify-center mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="p-6 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
                <FaLock className="text-5xl text-black" />
            </div>
        </div>

        {/* Título */}
        <h1 className="text-8xl font-bold tracking-tighter mb-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          401
        </h1>
        
        <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-6 uppercase tracking-widest animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Acceso Denegado
        </h2>

        {/* Línea decorativa */}
        <div className="w-16 h-1 bg-black mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.35s' }}></div>

        {/* Mensaje */}
        <p className="text-lg text-gray-600 mb-10 font-light leading-relaxed animate-fade-up" style={{ animationDelay: '0.4s' }}>
            No tienes los permisos necesarios para ver este recurso. <br className="hidden md:block"/>
            Si crees que esto es un error, contacta al administrador del sistema.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <a
            href="/"
            className="px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-gray-800 transition-all hover:shadow-lg transform hover:-translate-y-1"
          >
            Ir al Inicio
          </a>
          <a
            href="/login" // Asumiendo que tienes una ruta de login
            className="px-8 py-3 bg-white text-black border border-black text-sm font-bold uppercase tracking-wide rounded hover:bg-gray-50 transition-all hover:shadow-lg transform hover:-translate-y-1"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-up {
          opacity: 0;
          animation: fade-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage401;