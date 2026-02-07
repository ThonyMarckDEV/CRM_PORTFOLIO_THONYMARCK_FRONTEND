import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from 'services/cvService';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import CvForm from 'components/Shared/Formularios/cv/CvForm';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';

const StoreCv = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: '',
        es_principal: false,
        file: null
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.file) {
            setAlert({ type: 'error', message: 'Debes seleccionar un archivo PDF.' });
            return;
        }

        setLoading(true);
        setAlert(null);
        
        try {
            const data = new FormData();
            data.append('titulo', formData.titulo);
            data.append('es_principal', formData.es_principal ? '1' : '0');
            data.append('file', formData.file);

            await store(data);
            setAlert({ type: 'success', message: '¡CV subido correctamente!' });
            setTimeout(() => navigate('/cv/listar'), 1500);
        } catch (err) {
            setAlert(handleApiError(err, 'Error al guardar CV'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <PageHeader title="Subir Nuevo CV" icon={DocumentPlusIcon} buttonText="Volver" buttonLink="/cv/listar" />
            <AlertMessage type={alert?.type} message={alert?.message} details={alert?.details} />
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <CvForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    onSubmit={handleSubmit} 
                    loading={loading} 
                    buttonText="Subir Documento" 
                />
            </div>
        </div>
    );
};

export default StoreCv;