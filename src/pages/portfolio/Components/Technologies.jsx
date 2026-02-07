import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { indexLanding } from 'services/tecnologiaService';

const Technologies = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const response = await indexLanding();
        const dataList = response.data || response;
        setTechs(dataList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechs();
  }, []);

  const marqueeContent = [...techs, ...techs, ...techs]; 

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-gray-300" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
         <span className="text-sm font-medium tracking-widest text-gray-400 block mb-2">03</span>
         <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Stack Tecnológico</h2>
         <p className="text-gray-500">Herramientas y plataformas que potencian mis desarrollos</p>
      </div>

      {/* Contenedor del Carrusel */}
      <div className="relative w-full overflow-hidden mask-linear-gradient">
        
        {/* Track de animación */}
        <div className="flex w-max animate-infinite-scroll hover:pause">
          {marqueeContent.map((tech, index) => (
            <div
              key={`${tech.id}-${index}`}
              className="flex flex-col items-center justify-center mx-8 w-24 group cursor-pointer"
            >
              <div className="w-16 h-16 mb-4 relative transition-all duration-300 transform group-hover:scale-110">
                {/* Imagen: Grayscale por defecto, Color en hover */}
                <img 
                  src={tech.imagen_url} 
                  alt={tech.nombre} 
                  className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-black transition-colors">
                {tech.nombre}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS en línea para la animación y máscaras */}
      <style jsx>{`
        /* Animación del desplazamiento infinito */
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Se mueve la mitad porque duplicamos el contenido */
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }

        /* Pausar animación al pasar el mouse */
        .hover:pause:hover {
          animation-play-state: paused;
        }

        /* Máscara para desvanecer los bordes izquierdo y derecho */
        .mask-linear-gradient {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
      `}</style>
    </section>
  );
};

export default Technologies;