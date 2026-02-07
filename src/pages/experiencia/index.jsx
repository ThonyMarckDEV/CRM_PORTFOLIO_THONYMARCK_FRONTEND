import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { index, destroy } from 'services/experienciaService';
import Table from 'components/Shared/Tables/Table';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import ConfirmModal from 'components/Shared/Modals/ConfirmModal';
import PdfModal from 'components/Shared/Modals/PdfModal'; 
import { BriefcaseIcon, PencilSquareIcon, TrashIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';

const Index = () => {
    const [experiencias, setExperiencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
    const [filters, setFilters] = useState({ search: '' });
    const [alert, setAlert] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // 2. Estado para controlar el Modal PDF
    const [pdfViewer, setPdfViewer] = useState({ isOpen: false, url: '', title: '' });

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const res = await index(page, filters);
            setExperiencias(res.data);
            setPagination({ currentPage: res.current_page, totalPages: res.last_page });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(1); }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await destroy(deleteId);
            setAlert({ type: 'success', message: 'Experiencia eliminada correctamente.' });
            fetchData(pagination.currentPage);
        } catch (err) {
            setAlert(handleApiError(err, 'Error al eliminar'));
        } finally {
            setDeleteId(null);
        }
    };

    const columns = useMemo(() => [
        { header: 'Empresa', render: (row) => (
            <div className="flex items-center gap-3">
                {row.logo_url ? (
                    <img src={row.logo_url} alt="" className="w-10 h-10 object-contain rounded border bg-white"/>
                ) : (
                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-400">?</div>
                )}
                <div>
                    <p className="font-bold text-slate-800">{row.empresa}</p>
                    <p className="text-xs text-slate-500">{row.ubicacion}</p>
                </div>
            </div>
        )},
        { header: 'Puesto', render: (row) => <span className="text-sm font-medium">{row.puesto}</span> },
        { header: 'Periodo', render: (row) => (
            <div className="text-xs">
                <span className="block">{row.fecha_inicio}</span>
                <span className="block font-bold text-slate-600">{row.es_actual ? 'Actualidad' : row.fecha_fin}</span>
            </div>
        )},
        { header: 'Docs', render: (row) => (
            row.certificado_url && (
                <button 
                    onClick={() => setPdfViewer({ 
                        isOpen: true, 
                        url: row.certificado_url, 
                        title: `Certificado - ${row.empresa}` 
                    })} 
                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded transition-colors" 
                    title="Ver Certificado"
                >
                    <PaperClipIcon className="w-5 h-5"/>
                </button>
            )
        )},
        { header: 'Acciones', render: (row) => (
            <div className="flex gap-2">
                <Link to={`/experiencia/editar/${row.id}`} className="text-slate-600 hover:bg-slate-100 p-1 rounded"><PencilSquareIcon className="w-5 h-5"/></Link>
                <button onClick={() => setDeleteId(row.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><TrashIcon className="w-5 h-5"/></button>
            </div>
        )}
    ], []);

    return (
        <div className="container mx-auto p-6">
            <PageHeader title="Experiencia Laboral" icon={BriefcaseIcon} buttonText="+ Nueva" buttonLink="/experiencia/agregar" />
            <AlertMessage type={alert?.type} message={alert?.message} details={alert?.details} onClose={() => setAlert(null)} />
            
            <Table 
                columns={columns} 
                data={experiencias} 
                loading={loading}
                filters={filters}
                onFilterChange={(k, v) => setFilters(p => ({...p, [k]: v}))}
                onFilterSubmit={() => fetchData(1)}
                pagination={{ currentPage: pagination.currentPage, totalPages: pagination.totalPages, onPageChange: fetchData }}
                filterConfig={[{ name: 'search', type: 'text', label: 'Buscar', placeholder: 'Empresa o Puesto' }]}
            />

            {deleteId && (
                <ConfirmModal 
                    message="¿Estás seguro de eliminar esta experiencia? Se borrarán el logo y certificado asociados."
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteId(null)}
                />
            )}

            <PdfModal 
                isOpen={pdfViewer.isOpen}
                onClose={() => setPdfViewer({ ...pdfViewer, isOpen: false })}
                title={pdfViewer.title}
                pdfUrl={pdfViewer.url}
            />
        </div>
    );
};

export default Index;