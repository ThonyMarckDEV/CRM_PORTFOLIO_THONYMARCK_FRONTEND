import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { index, destroy, toggleStatus, show } from 'services/proyectoService';
import Table from 'components/Shared/Tables/Table';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import ConfirmModal from 'components/Shared/Modals/ConfirmModal';
import ViewModal from 'components/Shared/Modals/ViewModal';
import { FolderIcon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';

const Index = () => {
    const [proyectos, setProyectos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
    const [filters, setFilters] = useState({ search: '', estado: '' });
    const [alert, setAlert] = useState(null);

    // Estados para Modales
    const [deleteId, setDeleteId] = useState(null);
    const [toggleId, setToggleId] = useState(null);
    const [viewId, setViewId] = useState(null);  
    const [viewData, setViewData] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const res = await index(page, filters);
            setProyectos(res.data);
            setPagination({ currentPage: res.current_page, totalPages: res.last_page });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // eslint-disable-next-line
    useEffect(() => { fetchData(1); }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await destroy(deleteId);
            setAlert({ type: 'success', message: 'Proyecto eliminado y archivos borrados.' });
            fetchData(pagination.currentPage);
        } catch (err) {
            setAlert(handleApiError(err,  'Error al eliminar' ));
        } finally {
            setDeleteId(null);
        }
    };

    const handleToggleStatus = async () => {
        if (!toggleId) return;
        try {
            await toggleStatus(toggleId);
            setAlert({ type: 'success', message: 'El estado del proyecto ha sido actualizado.' });
            fetchData(pagination.currentPage);
        } catch (err) {
            setAlert(handleApiError(err,  'Error al cambiar el estado' ));
        } finally {
            setToggleId(null);
        }
    };

    const handleView = async (id) => {
        setViewId(id);
        setViewLoading(true);
        try {
            const res = await show(id);
            setViewData(res.data || res);
        } catch (err) {
            setAlert(handleApiError(err,  'Error al cargar detalles' ));
            setViewId(null);
        } finally {
            setViewLoading(false);
        }
    };

    const columns = useMemo(() => [
        { header: 'Proyecto', render: (row) => (
            <div>
                <p className="font-bold text-slate-800">{row.titulo}</p>
                <p className="text-xs text-slate-500">{row.cliente}</p>
            </div>
        )},
        { header: 'Tecnologías', render: (row) => (
            <div className="flex -space-x-2">
                {row.tecnologias?.slice(0, 4).map(t => (
                    <img key={t.id} src={t.imagen_url} className="w-6 h-6 rounded-full border border-white bg-white" title={t.nombre} alt=""/>
                ))}
                {row.tecnologias?.length > 4 && <span className="text-xs pl-3 text-gray-400">+{row.tecnologias.length - 4}</span>}
            </div>
        )},
        { header: 'Estado', render: (row) => (
            <button 
                onClick={() => setToggleId(row.id)}
                className={`px-2 py-1 text-xs rounded-full cursor-pointer hover:opacity-80 transition-opacity ${row.estado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                title="Clic para cambiar estado"
            >
                {row.estado ? 'Activo' : 'Inactivo'}
            </button>
        )},
        { header: 'Acciones', render: (row) => (
            <div className="flex gap-2">
                <button onClick={() => handleView(row.id)} className="text-blue-500 hover:bg-blue-50 p-1 rounded"><EyeIcon className="w-5 h-5"/></button>
                <Link to={`/proyecto/editar/${row.id}`} className="text-slate-600 hover:bg-slate-100 p-1 rounded"><PencilSquareIcon className="w-5 h-5"/></Link>
                <button onClick={() => setDeleteId(row.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><TrashIcon className="w-5 h-5"/></button>
            </div>
        )}
    ], []);

    return (
        <div className="container mx-auto p-6">
            <PageHeader title="Proyectos" icon={FolderIcon} buttonText="+ Nuevo" buttonLink="/proyecto/agregar" />
            
            <AlertMessage type={alert?.type} message={alert?.message} details={alert?.details} onClose={() => setAlert(null)} />
            
            <Table 
                columns={columns} 
                data={proyectos} 
                loading={loading}
                filters={filters}
                onFilterChange={(k, v) => setFilters(p => ({...p, [k]: v}))}
                onFilterSubmit={() => fetchData(1)}
                pagination={{ currentPage: pagination.currentPage, totalPages: pagination.totalPages, onPageChange: fetchData }}
                filterConfig={[{ name: 'search', type: 'text', label: 'Buscar', placeholder: 'Título o Cliente' }]}
            />

            {deleteId && (
                <ConfirmModal 
                    message="¿Estás seguro de eliminar este proyecto? Se borrarán todas las imágenes asociadas del servidor."
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteId(null)}
                />
            )}

            {toggleId && (
                <ConfirmModal 
                    message="¿Estás seguro de cambiar el estado de este proyecto?"
                    onConfirm={handleToggleStatus}
                    onCancel={() => setToggleId(null)}
                />
            )}

            <ViewModal isOpen={!!viewId} onClose={() => setViewId(null)} title="Detalle del Proyecto" isLoading={viewLoading}>
                {viewData && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold">{viewData.titulo}</h3>
                            <span className="text-sm text-gray-500">{viewData.fecha_realizacion}</span>
                        </div>
                        <p className="text-gray-600">{viewData.descripcion}</p>
                        
                        {/* Tecnologías */}
                        <div>
                            <h4 className="font-bold text-sm uppercase text-gray-400 mb-2">Tecnologías</h4>
                            <div className="flex gap-2">
                                {viewData.tecnologias?.map(t => (
                                    <span key={t.id} className="px-2 py-1 bg-gray-100 rounded text-xs flex items-center gap-1">
                                        <img src={t.imagen_url} className="w-4 h-4" alt=""/> {t.nombre}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Imágenes */}
                        <div>
                            <h4 className="font-bold text-sm uppercase text-gray-400 mb-2">Galería</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {viewData.imagenes?.map(img => (
                                    <img key={img.id} src={`${img.imagen_url}`} alt="" className="w-full rounded-lg border hover:scale-105 transition-transform"/>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </ViewModal>
        </div>
    );
};

export default Index;