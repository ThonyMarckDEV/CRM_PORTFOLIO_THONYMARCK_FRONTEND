import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from 'services/experienciaService';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import ExperienciaForm from 'components/Shared/Formularios/experiencia/ExperienciaForm';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';

const Store = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        puesto: '', empresa: '', descripcion: '', tipo_contrato: '', ubicacion: '',
        fecha_inicio: '', fecha_fin: '', es_actual: false,
        tecnologias: [],
        logo: null, certificado: null
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert(null);
        
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'tecnologias' && key !== 'logo' && key !== 'certificado') {
                    if (typeof formData[key] === 'boolean') {
                        data.append(key, formData[key] ? '1' : '0');
                    } else {
                        data.append(key, formData[key] || '');
                    }
                }
            });

            formData.tecnologias.forEach(t => data.append('tecnologias[]', t.id));
            
            if (formData.logo) data.append('logo', formData.logo);
            if (formData.certificado) data.append('certificado', formData.certificado);

            await store(data);
            setAlert({ type: 'success', message: '¡Experiencia agregada correctamente!' });
            setTimeout(() => navigate('/experiencia/listar'), 1500);
        } catch (err) {
            setAlert(handleApiError(err, 'Error al guardar experiencia'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <PageHeader title="Nueva Experiencia" icon={BriefcaseIcon} buttonText="Volver" buttonLink="/experiencia/listar" />
            <AlertMessage type={alert?.type} message={alert?.message} details={alert?.details} />
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm">
                <ExperienciaForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    onSubmit={handleSubmit} 
                    loading={loading} 
                    buttonText="Guardar Experiencia" 
                />
            </div>
        </div>
    );
};

export default Store;