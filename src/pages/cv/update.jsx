import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { show, update } from 'services/cvService';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import CvForm from 'components/Shared/Formularios/cv/CvForm';
import LoadingScreen from 'components/Shared/LoadingScreen';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';

const UpdateCv = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState(null);
    
    const [formData, setFormData] = useState({
        titulo: '',
        es_principal: false,
        url: null,
        file: null 
    });

    useEffect(() => {
        const load = async () => {
            try {
                const res = await show(id);
                const data = res.data || res;
                
                setFormData({
                    titulo: data.titulo,
                    es_principal: Boolean(data.es_principal),
                    url: data.url,
                    file: null
                });
            } catch (err) {
                setAlert(handleApiError(err, 'Error al cargar el CV'));
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const data = new FormData();
            data.append('titulo', formData.titulo);
            data.append('es_principal', formData.es_principal ? '1' : '0');
            
            if (formData.file) {
                data.append('file', formData.file);
            }

            data.append('_method', 'PUT');

            await update(id, data);
            setAlert({ type: 'success', message: 'CV actualizado correctamente' });
            setTimeout(() => navigate('/cv/listar'), 1500);
        } catch (err) {
            setAlert(handleApiError(err, 'Error al actualizar'));
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <div className="container mx-auto p-6">
            <PageHeader title={`Editar CV`} icon={PencilSquareIcon} buttonText="Volver" buttonLink="/cv/listar" />
            <AlertMessage type={alert?.type} message={alert?.message} details={alert?.details} onClose={() => setAlert(null)} />
            
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <CvForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    onSubmit={handleSubmit} 
                    loading={saving} 
                    buttonText="Actualizar Documento" 
                />
            </div>
        </div>
    );
};

export default UpdateCv;