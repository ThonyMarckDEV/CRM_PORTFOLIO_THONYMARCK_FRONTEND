import React from 'react';
import { FaGhost } from 'react-icons/fa'; // Cambié a un fantasma o usa FaRegAngry si prefieres

const ErrorPage404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black overflow-hidden relative selection:bg-black selection:text-white">
      
      {/* Fondo con textura sutil (opcional) */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="relative z-10 text-center px-6">
        
        {/* Animación 1: Icono */}
        <div className="flex justify-center mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {/* Puedes usar FaRegAngry aquí si prefieres */}
            <FaGhost className="text-8xl text-gray-900 animate-float" />
        </div>

        {/* Animación 2: Número Gigante */}
        <h1 className="text-[10rem] md:text-[12rem] leading-none font-black tracking-tighter animate-fade-up" style={{ animationDelay: '0.2s' }}>
          404
        </h1>

        {/* Animación 3: Mensaje */}
        <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-4 uppercase tracking-widest">
                Página no encontrada
            </h2>
            <p className="text-gray-500 mb-10 max-w-md mx-auto font-light">
                Parece que te has perdido en el vacío. La página que buscas no existe o ha sido movida.
            </p>
        </div>

        {/* Animación 4: Botón */}
        <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-black border border-transparent rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-900 hover:scale-105 hover:shadow-2xl hover:shadow-gray-400/50"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <span className="relative flex items-center gap-2">
                Volver al Inicio
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .animate-fade-up {
          opacity: 0; /* Inicia invisible */
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage404;