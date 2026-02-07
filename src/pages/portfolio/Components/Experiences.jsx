import React, { useState, useEffect } from 'react';
import { Calendar, Award, ExternalLink, Loader2, ChevronLeft, ChevronRight, Building2, Eye } from 'lucide-react';
import { indexLanding } from 'services/experienciaService';


import PdfModal from 'components/Shared/Modals/PdfModal';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0
  });

  // Estado para el Modal PDF
  const [pdfModal, setPdfModal] = useState({
    isOpen: false,
    url: '',
    title: ''
  });

  const fetchExperiences = async (page = 1) => {
    setLoading(true);
    try {
      const response = await indexLanding(page);
      const { data, current_page, last_page, total } = response;
      
      setExperiences(data);
      setPagination({
        currentPage: current_page,
        lastPage: last_page,
        total: total
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      fetchExperiences(newPage);
      document.getElementById('experiencia')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00'); 
    return new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric' }).format(date);
  };

  // Handler para abrir el modal
  const handleOpenPdf = (e, url, title) => {
    e.preventDefault(); // Evita que el link navegue
    setPdfModal({
        isOpen: true,
        url: url,
        title: `Certificado - ${title}`
    });
  };

  return (
    <section id="experiencia" className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-sm font-medium tracking-widest text-gray-400 block mb-2">04</span>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-4">Experiencia</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Trayectoria profesional y roles desempeñados.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin h-10 w-10 text-gray-400" />
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white border border-gray-200 p-8 hover:border-black transition-all duration-300 group rounded-lg shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Logo de la empresa */}
                  <div className="flex-shrink-0">
                    {exp.logo_url ? (
                        <img 
                            src={exp.logo_url} 
                            alt={exp.empresa} 
                            className="w-16 h-16 rounded object-contain border border-gray-100" 
                        />
                    ) : (
                        <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                            <Building2 size={32} />
                        </div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-medium mb-1 text-gray-900">{exp.puesto}</h3>
                        <p className="text-lg text-gray-600 font-medium flex items-center gap-2">
                            {exp.empresa}
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full border border-gray-200">
                                {exp.tipo_contrato}
                            </span>
                        </p>
                      </div>
                      
                      {/* Fechas */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 md:mt-0 bg-gray-50 px-3 py-1 rounded-full">
                        <Calendar size={16} />
                        <span className="capitalize">
                            {formatDate(exp.fecha_inicio)} - {exp.es_actual ? 'Actualidad' : formatDate(exp.fecha_fin)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Descripción */}
                    <div className="text-gray-600 mb-4 leading-relaxed">
                        {exp.descripcion && exp.descripcion.split('\r\n').map((line, i) => (
                            <p key={i} className="mb-1">{line}</p>
                        ))}
                    </div>

                    {/* Tecnologías */}
                    {exp.tecnologias && exp.tecnologias.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {exp.tecnologias.map(tech => (
                                <span key={tech.id} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded flex items-center gap-1">
                                    {tech.imagen_url && <img src={tech.imagen_url} alt="" className="w-3 h-3" />}
                                    {tech.nombre}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    {/* Botón Certificado (Modificado para usar Modal) */}
                    {exp.certificado_url && (
                        <button
                            onClick={(e) => handleOpenPdf(e, exp.certificado_url, exp.puesto)}
                            className="inline-flex items-center gap-2 text-sm font-medium text-black hover:gap-3 transition-all duration-300 mt-2 border-b border-transparent hover:border-black pb-0.5 cursor-pointer"
                        >
                            <Award size={16} />
                            Ver Constancia / Certificado
                            <Eye size={14} />
                        </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Paginación */}
            {pagination.lastPage > 1 && (
              <div className="flex justify-center items-center gap-4 pt-8">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 border border-gray-300 disabled:opacity-30 hover:bg-black hover:text-white transition-colors rounded-full"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium text-gray-500">
                  Página {pagination.currentPage} de {pagination.lastPage}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.lastPage}
                  className="p-2 border border-gray-300 disabled:opacity-30 hover:bg-black hover:text-white transition-colors rounded-full"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* IMPLEMENTACIÓN DEL MODAL PDF */}
      <PdfModal 
        isOpen={pdfModal.isOpen}
        onClose={() => setPdfModal({ ...pdfModal, isOpen: false })}
        pdfUrl={pdfModal.url}
        title={pdfModal.title}
        isPrintable={false}
      />
    </section>
  );
};

export default Experiences;