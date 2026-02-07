import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from 'services/proyectoService';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import ProyectoForm from 'components/Shared/Formularios/proyecto/ProyectoForm';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';

const Store = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: '', descripcion: '', cliente: '', fecha_realizacion: '', url_web: '',
        tecnologias: [], 
        imagenes: []   
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const data = new FormData();
            data.append('titulo', formData.titulo);
            data.append('descripcion', formData.descripcion || '');
            data.append('cliente', formData.cliente || '');
            data.append('fecha_realizacion', formData.fecha_realizacion || '');
            data.append('url_web', formData.url_web || '');
            
            formData.tecnologias.forEach(t => data.append('tecnologias[]', t.id));

            formData.imagenes.forEach(file => data.append('imagenes[]', file));

            await store(data);
            setAlert({ type: 'success', message: 'Proyecto creado exitosamente' });
            setTimeout(() => navigate('/proyecto/listar'), 1500);
        } catch (err) {
            setAlert(handleApiError(err,'Error al crear proyecto'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <PageHeader title="Nuevo Proyecto" icon={FolderPlusIcon} buttonText="Volver" buttonLink="/proyecto/listar" />
            <AlertMessage type={alert?.type} message={alert?.message} details={alert?.details} />
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm">
                <ProyectoForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    onSubmit={handleSubmit} 
                    loading={loading} 
                    buttonText="Crear Proyecto" 
                />
            </div>
        </div>
    );
};

export default Store;