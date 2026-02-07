import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Loader2, Eye } from 'lucide-react';
import { indexLanding } from 'services/proyectoService'; 
import ViewModal from 'components/Shared/Modals/ViewModal';


const ProjectModalContent = ({ project }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = project.imagenes && project.imagenes.length > 0 
    ? project.imagenes.map(img => img.imagen_url) 
    : ["https://via.placeholder.com/800x600?text=No+Image"];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-6">
      {/* Carrusel Grande */}
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
        <img
          src={images[currentImage]}
          alt={project.titulo}
          className="w-full h-full object-contain"
        />
        
        {/* Controles del Carrusel */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>
            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentImage ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Descripción Completa */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Descripción</h4>
        <p className="text-gray-700 leading-relaxed text-base">
          {project.descripcion}
        </p>
      </div>

      {/* Tecnologías */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Stack Tecnológico</h4>
        <div className="flex flex-wrap gap-2">
          {project.tecnologias && project.tecnologias.map((tech) => (
            <span
              key={tech.id}
              className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              {tech.imagen_url && (
                <img src={tech.imagen_url} alt={tech.nombre} className="w-5 h-5 object-contain" />
              )}
              {tech.nombre}
            </span>
          ))}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
        {project.url_web ? (
          <a
            href={project.url_web}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[150px] flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <ExternalLink size={20} />
            Ver Demo en Vivo
          </a>
        ) : (
          <button disabled className="flex-1 min-w-[150px] flex items-center justify-center gap-2 bg-gray-100 text-gray-400 px-6 py-3 rounded-lg cursor-not-allowed font-medium">
             <ExternalLink size={20} />
             Demo No Disponible
          </button>
        )}

        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[150px] flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-black hover:text-black transition-colors font-medium"
          >
            <Github size={20} />
            Ver Código
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0
  });

  const fetchProjects = async (page = 1) => {
    setLoading(true);
    try {
      const response = await indexLanding(page);
      const { data, current_page, last_page, total } = response;
      
      setProjects(data);
      setPagination({
        currentPage: current_page,
        lastPage: last_page,
        total: total
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      fetchProjects(newPage);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handlers para el Modal
  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <span className="text-sm font-medium tracking-widest text-gray-400 block mb-2">02</span>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-4">Proyectos Destacados</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Una selección de mis últimos trabajos y desarrollos tecnológicos.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-10 w-10 text-gray-400" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onClick={() => handleOpenModal(project)} // Pasamos la función de abrir
                />
              ))}
            </div>

            {/* Paginación */}
            {pagination.lastPage > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 border border-gray-300 disabled:opacity-30 hover:bg-black hover:text-white transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium">
                  Página {pagination.currentPage} de {pagination.lastPage}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.lastPage}
                  className="p-2 border border-gray-300 disabled:opacity-30 hover:bg-black hover:text-white transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <ViewModal
        isOpen={!!selectedProject} 
        onClose={handleCloseModal}
        title={selectedProject?.titulo || "Detalle del Proyecto"}
      >
        {selectedProject && <ProjectModalContent project={selectedProject} />}
      </ViewModal>

    </section>
  );
};


const ProjectCard = ({ project, index, onClick }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = project.imagenes && project.imagenes.length > 0 
    ? project.imagenes.map(img => img.imagen_url) 
    : ["https://via.placeholder.com/800x600?text=No+Image"];

  const nextImage = (e) => {
    e.stopPropagation(); 
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 overflow-hidden hover:border-black transition-all duration-500 group opacity-0 animate-fade-in flex flex-col h-full cursor-pointer hover:shadow-lg"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {/* Image Carousel (Pequeño) */}
      <div className="relative h-64 overflow-hidden bg-gray-100 flex-shrink-0 group/image">
        <img
          src={images[currentImage]}
          alt={project.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay con icono de "Ver más" */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Eye size={16} /> Ver Detalles
            </span>
        </div>

        {/* Carousel Controls (Solo visibles si hay más de 1 imagen) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 transition-all duration-300 opacity-0 group-hover/image:opacity-100 z-10 rounded-full"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 transition-all duration-300 opacity-0 group-hover/image:opacity-100 z-10 rounded-full"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-auto">
            <h3 className="text-xl font-medium mb-3 group-hover:text-blue-600 transition-colors">{project.titulo}</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
              {project.descripcion}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
            {project.tecnologias && project.tecnologias.slice(0, 4).map((tech) => (
                <span
                  key={tech.id}
                  className="text-xs px-3 py-1 border border-gray-300 bg-gray-50 flex items-center gap-2"
                >
                  {tech.imagen_url && (
                    <img src={tech.imagen_url} alt={tech.nombre} className="w-3 h-3 object-contain" />
                  )}
                  {tech.nombre}
                </span>
            ))}
            {project.tecnologias && project.tecnologias.length > 4 && (
                <span className="text-xs px-2 py-1 text-gray-500">+{project.tecnologias.length - 4}</span>
            )}
            </div>
        </div>

        {/* Links (stopPropagation para que no abran el modal) */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
          {project.github_url && (
             <a
             href={project.github_url}
             target="_blank"
             rel="noopener noreferrer"
             onClick={(e) => e.stopPropagation()} 
             className="text-sm font-medium hover:gap-2 inline-flex items-center gap-1 transition-all duration-300 hover:text-blue-600"
           >
             <Github size={16} />
             GitHub
           </a>
          )}
         
          {project.url_web && (
            <a
              href={project.url_web}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-medium hover:gap-2 inline-flex items-center gap-1 transition-all duration-300 hover:text-blue-600"
            >
              <ExternalLink size={16} />
              Demo / Web
            </a>
          )}
        </div>
      </div>
      
       <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Projects;