import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { index, show, toggleStatus } from 'services/clienteService';
import Table from 'components/Shared/Tables/Table';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import ConfirmModal from 'components/Shared/Modals/ConfirmModal';
import ViewModal from 'components/Shared/Modals/ViewModal';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';
import { UserGroupIcon, PencilSquareIcon, UserIcon, IdentificationIcon, EyeIcon } from '@heroicons/react/24/outline';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({ currentPage: 1, totalPages: 1 });
  
  const [filters, setFilters] = useState({ search: '', sexo: '' , estado: ''});
  const filtersRef = useRef(filters);
  const [alert, setAlert] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [idToToggle, setIdToToggle] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const fetchClientes = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await index(page, filtersRef.current);
      setClientes(response.data || []);
      setPaginationInfo({
        currentPage: response.current_page,
        totalPages: response.last_page,
      });
    } catch (err) {
      setAlert(handleApiError(err, 'Error al cargar el listado de clientes'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClientes(1); }, [fetchClientes]);

  const handleAskToggle = (id) => {
    setIdToToggle(id);
    setShowConfirm(true);
  };

  const handleConfirmToggle = async () => {
    setShowConfirm(false);
    setLoading(true);
    try {
      await toggleStatus(idToToggle);
      setAlert({ type: 'success', message: 'Estado actualizado correctamente.' });
      await fetchClientes(paginationInfo.currentPage);
    } catch (err) {
      setAlert(handleApiError(err, 'Error al cambiar el estado'));
    } finally {
      setLoading(false);
      setIdToToggle(null);
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
      header: 'Cliente',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-black text-sm border border-slate-200">
            {row.nombre_completo ? row.nombre_completo.charAt(0) : '?'}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 text-sm">{row.nombre_completo}</span>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                    <IdentificationIcon className="w-3 h-3"/> {row.dni}
                </span>
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Usuario',
      render: (row) => (
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <UserIcon className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-slate-600">
                {row.usuario || <span className="text-gray-300 italic">Sin usuario</span>}
            </span>
        </div>
      )
    },
    {
      header: 'Estado',
      render: (row) => (
        <button 
          onClick={() => handleAskToggle(row.id)}
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer hover:opacity-80 transition-opacity
            ${row.estado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}
        >
          {row.estado ? 'Activo' : 'Inactivo'}
        </button>
      )
    },
    {
      header: 'Acciones',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleView(row.id)}
            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <Link to={`/cliente/editar/${row.id}`} className="text-black hover:scale-110 transition-transform">
            <PencilSquareIcon className="w-5 h-5" />
          </Link>
        </div>
      )
    }
  ], []);

  const handleClearFilters = () => { 
      const c = { search:'', sexo: '', estado: '' };
      setFilters(c); 
      filtersRef.current = c; 
      fetchClientes(1); 
  };

  return (
    <div className="container mx-auto p-6">
      <PageHeader title="Gestión de Clientes" icon={UserGroupIcon} buttonText="+ Nuevo Cliente" buttonLink="/cliente/agregar" />
      <AlertMessage type={alert?.type} message={alert?.message} onClose={() => setAlert(null)} />
      
      <Table
        columns={columns}
        data={clientes}
        loading={loading}
        filters={filters}
        onFilterChange={(name, val) => setFilters(prev => ({...prev, [name]: val}))}
        onFilterSubmit={() => { filtersRef.current = filters; fetchClientes(1); }}
        onFilterClear={handleClearFilters}
        pagination={{
          currentPage: paginationInfo.currentPage,
          totalPages: paginationInfo.totalPages,
          onPageChange: fetchClientes
        }}
        filterConfig={[
            { name: 'search', type: 'text', label: 'Búsqueda', placeholder: 'Nombre, DNI...', colSpan: 'col-span-12 md:col-span-6' },
            { name: 'sexo', type: 'select', label: 'Sexo', colSpan: 'col-span-12 md:col-span-2', options: [{ value: '', label: 'Todos' }, { value: 'Masculino', label: 'Masc.' }, { value: 'Femenino', label: 'Fem.' }] },
            { name: 'estado', type: 'select', label: 'Estado', colSpan: 'col-span-12 md:col-span-2', options: [{ value: '', label: 'Todos' }, { value: '1', label: 'Activo' }, { value: '0', label: 'Inactivo' }] }
        ]}
      />

      {showConfirm && (
        <ConfirmModal 
            message="¿Estás seguro de cambiar el estado de acceso de este cliente?"
            confirmText="Sí, cambiar"
            cancelText="Cancelar"
            onConfirm={handleConfirmToggle}
            onCancel={() => { setShowConfirm(false); setIdToToggle(null); }}
        />
      )}

      <ViewModal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Detalles del Cliente" isLoading={viewLoading}>
        {viewData && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Nombre Completo</h4>
                        <p className="text-gray-800 font-medium text-lg">
                            {viewData.nombre} {viewData.apellidoPaterno} {viewData.apellidoMaterno}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">DNI</h4>
                            <p className="text-gray-800 font-medium">{viewData.dni}</p>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Sexo</h4>
                            <p className="text-gray-800">{viewData.sexo}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Fecha Nacimiento</h4>
                        <p className="text-gray-800">{viewData.fechaNacimiento}</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Dirección</h4>
                        <p className="text-gray-800 text-sm truncate">{viewData.direccion}</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-black text-gray-700 uppercase mb-3 flex items-center gap-2">
                        <UserIcon className="w-4 h-4"/> Contacto
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {viewData.contacto && (
                            <>
                                <div>
                                    <p className="text-xs text-gray-500">Teléfono Personal</p>
                                    <p className="font-semibold text-gray-800">{viewData.contacto.telefono || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <p className="font-semibold text-gray-800 break-all">{viewData.contacto.correo || '-'}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}
      </ViewModal>
    </div>
  );
};

export default Index;