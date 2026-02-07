import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { index, destroy } from 'services/cvService';
import Table from 'components/Shared/Tables/Table';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import ConfirmModal from 'components/Shared/Modals/ConfirmModal';
import PdfModal from 'components/Shared/Modals/PdfModal'; 
import { DocumentTextIcon, PencilSquareIcon, TrashIcon, EyeIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';

const IndexCv = () => {
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
    const [filters, setFilters] = useState({ search: '' });
    const [alert, setAlert] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [pdfViewer, setPdfViewer] = useState({ isOpen: false, url: '', title: '' });

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const res = await index(page, filters);
            setCvs(res.data);
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
            setAlert({ type: 'success', message: 'CV eliminado correctamente.' });
            fetchData(pagination.currentPage);
        } catch (err) {
            setAlert(handleApiError(err, 'Error al eliminar'));
        } finally {
            setDeleteId(null);
        }
    };

    const columns = useMemo(() => [
        { header: 'Título', render: (row) => (
            <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <DocumentTextIcon className="w-6 h-6" />
                </div>
                <div>
                    <p className="font-bold text-slate-800">{row.titulo}</p>
                    <p className="text-xs text-slate-500">Subido: {new Date(row.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        )},
        { header: 'Estado', render: (row) => (
            row.es_principal ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    <CheckBadgeIcon className="w-4 h-4" /> Principal
                </span>
            ) : (
                <span className="text-xs text-slate-400">Secundario</span>
            )
        )},
        { header: 'Acciones', render: (row) => (
            <div className="flex gap-2">
                {/* Ver PDF */}
                <button 
                    onClick={() => setPdfViewer({ isOpen: true, url: row.url, title: row.titulo })}
                    className="text-blue-500 hover:bg-blue-50 p-1 rounded" 
                    title="Ver PDF"
                >
                    <EyeIcon className="w-5 h-5"/>
                </button>
                
                {/* Editar */}
                <Link to={`/cv/editar/${row.id}`} className="text-slate-600 hover:bg-slate-100 p-1 rounded">
                    <PencilSquareIcon className="w-5 h-5"/>
                </Link>
                
                {/* Eliminar */}
                <button onClick={() => setDeleteId(row.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                    <TrashIcon className="w-5 h-5"/>
                </button>
            </div>
        )}
    ], []);

    return (
        <div className="container mx-auto p-6">
            <PageHeader title="Gestión de CVs" icon={DocumentTextIcon} buttonText="+ Subir CV" buttonLink="/cv/agregar" />
            <AlertMessage type={alert?.type} message={alert?.message} details={alert?.details} onClose={() => setAlert(null)} />
            
            <Table 
                columns={columns} 
                data={cvs} 
                loading={loading}
                filters={filters}
                onFilterChange={(k, v) => setFilters(p => ({...p, [k]: v}))}
                onFilterSubmit={() => fetchData(1)}
                pagination={{ currentPage: pagination.currentPage, totalPages: pagination.totalPages, onPageChange: fetchData }}
                filterConfig={[{ name: 'search', type: 'text', label: 'Buscar', placeholder: 'Título del CV' }]}
            />

            {deleteId && (
                <ConfirmModal 
                    message="¿Estás seguro de eliminar este CV? El archivo se borrará permanentemente."
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

export default IndexCv;