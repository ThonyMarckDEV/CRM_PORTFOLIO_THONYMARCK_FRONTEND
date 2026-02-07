import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { index, destroy, show } from 'services/tecnologiaService';
import Table from 'components/Shared/Tables/Table';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import ConfirmModal from 'components/Shared/Modals/ConfirmModal';
import ViewModal from 'components/Shared/Modals/ViewModal';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';
import { CpuChipIcon, PencilSquareIcon, TrashIcon, EyeIcon, PhotoIcon } from '@heroicons/react/24/outline';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [tecnologias, setTecnologias] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({ currentPage: 1, totalPages: 1 });
  
  const [filters, setFilters] = useState({ search: '' });
  const filtersRef = useRef(filters);
  const [alert, setAlert] = useState(null);


  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const fetchTecnologias = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await index(page, filtersRef.current);
      setTecnologias(response.data || []);
      setPaginationInfo({
        currentPage: response.current_page,
        totalPages: response.last_page,
      });
    } catch (err) {
      setAlert(handleApiError(err, 'Error al cargar las tecnologías'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTecnologias(1); }, [fetchTecnologias]);

  const handleAskDelete = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    setLoading(true);
    try {
      await destroy(idToDelete);
      setAlert({ type: 'success', message: 'Tecnología eliminada correctamente.' });
      await fetchTecnologias(paginationInfo.currentPage);
    } catch (err) {
      setAlert(handleApiError(err, 'Error al eliminar la tecnología'));
    } finally {
      setLoading(false);
      setIdToDelete(null);
    }
  };

  const handleView = async (id) => {
    setIsViewOpen(true);
    setViewLoading(true);
    setViewData(null);
    try {
      const response = await show(id);
      setViewData(response.data || response);
    } catch (error) {
      setAlert(handleApiError(error, 'Error al cargar detalles'));
      setIsViewOpen(false);
    } finally {
      setViewLoading(false);
    }
  };

  const columns = useMemo(() => [
    {
      header: 'Imagen',
      render: (row) => (
        <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg p-1 flex items-center justify-center">
            <img 
                src={row.imagen_url} 
                alt={row.nombre} 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {e.target.src = 'https://placehold.co/40x40?text=?';}} 
            />
        </div>
      )
    },
    {
      header: 'Tecnología',
      render: (row) => (
        <div className="flex flex-col">
           <span className="font-bold text-slate-800 text-sm">{row.nombre}</span>
        </div>
      )
    },
    {
      header: 'Acciones',
      render: (row) => (
        <div className="flex items-center gap-2">
          {/* Botón Ver (Ojo) */}
          <button 
            onClick={() => handleView(row.id)}
            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
            title="Ver detalles"
          >
            <EyeIcon className="w-5 h-5" />
          </button>

          {/* Botón Editar */}
          <Link to={`/tecnologia/editar/${row.id}`} className="p-2 text-slate-600 hover:text-black hover:bg-slate-100 rounded-lg transition-all">
            <PencilSquareIcon className="w-5 h-5" />
          </Link>

          {/* Botón Eliminar */}
          <button 
            onClick={() => handleAskDelete(row.id)}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ], []);

  const handleClearFilters = () => { 
      const c = { search:'' };
      setFilters(c); 
      filtersRef.current = c; 
      fetchTecnologias(1); 
  };

  return (
    <div className="container mx-auto p-6">
      <PageHeader title="Gestión de Tecnologías" icon={CpuChipIcon} buttonText="+ Nueva Tecnología" buttonLink="/tecnologia/agregar" />
      <AlertMessage type={alert?.type} message={alert?.message} details={alert?.details} onClose={() => setAlert(null)} />
      
      <Table
        columns={columns}
        data={tecnologias}
        loading={loading}
        filters={filters}
        onFilterChange={(name, val) => setFilters(prev => ({...prev, [name]: val}))}
        onFilterSubmit={() => { filtersRef.current = filters; fetchTecnologias(1); }}
        onFilterClear={handleClearFilters}
        pagination={{
          currentPage: paginationInfo.currentPage,
          totalPages: paginationInfo.totalPages,
          onPageChange: fetchTecnologias
        }}
        filterConfig={[
            { name: 'search', type: 'text', label: 'Búsqueda', placeholder: 'React, Laravel...', colSpan: 'col-span-12' },
        ]}
      />

      {/* Modal de Confirmación de Eliminación */}
      {showConfirm && (
        <ConfirmModal 
            message="¿Estás seguro de eliminar esta tecnología? Esta acción no se puede deshacer."
            confirmText="Sí, eliminar"
            cancelText="Cancelar"
            confirmColor="bg-red-600 hover:bg-red-700"
            onConfirm={handleConfirmDelete}
            onCancel={() => { setShowConfirm(false); setIdToDelete(null); }}
        />
      )}

      {/* Modal de Ver Detalles */}
      <ViewModal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Detalles de Tecnología" isLoading={viewLoading}>
        {viewData && (
            <div className="space-y-6">
                {/* Cabecera con Imagen */}
                <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl border border-gray-100 border-dashed">
                    <div className="w-32 h-32 bg-white rounded-lg p-2 shadow-sm flex items-center justify-center mb-4">
                        <img 
                            src={viewData.imagen_url} 
                            alt={viewData.nombre} 
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {e.target.style.display = 'none';}}
                        />
                         {/* Fallback si falla la imagen */}
                         <PhotoIcon className="w-10 h-10 text-gray-200 absolute -z-10" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800">{viewData.nombre}</h2>
                </div>

                {/* Detalles Técnicos */}
                <div className="grid grid-cols-1 gap-4">
                     <div className="p-4 border border-gray-100 rounded-lg">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">URL de la Imagen</h4>
                        <a href={viewData.imagen_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline truncate block">
                            {viewData.imagen_url}
                        </a>
                    </div>
                </div>
            </div>
        )}
      </ViewModal>

    </div>
  );
};

export default Index;