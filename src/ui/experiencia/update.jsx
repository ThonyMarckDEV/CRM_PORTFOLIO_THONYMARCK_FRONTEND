import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { show, update } from 'services/experienciaService';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import ExperienciaForm from 'components/Shared/Formularios/experiencia/ExperienciaForm';
import LoadingScreen from 'components/Shared/LoadingScreen';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState(null);
    
    const [formData, setFormData] = useState({
        puesto: '', empresa: '', descripcion: '', tipo_contrato: '', ubicacion: '',
        fecha_inicio: '', fecha_fin: '', es_actual: false,
        tecnologias: [],
        logo: null, certificado: null, 
        logo_url: null, certificado_url: null 
    });

    useEffect(() => {
        const load = async () => {
            try {
                const res = await show(id);
                const data = res.data || res;
                
                setFormData({
                    puesto: data.puesto,
                    empresa: data.empresa,
                    descripcion: data.descripcion,
                    tipo_contrato: data.tipo_contrato,
                    ubicacion: data.ubicacion,
                    fecha_inicio: data.fecha_inicio,
                    fecha_fin: data.fecha_fin || '',
                    es_actual: Boolean(data.es_actual),
                    tecnologias: data.tecnologias || [],
                    logo_url: data.logo_url,
                    certificado_url: data.certificado_url,
                    logo: null,
                    certificado: null
                });
            } catch (err) {
                setAlert(handleApiError(err, 'Error al cargar la experiencia'));
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
            
            Object.keys(formData).forEach(key => {
                if (!['tecnologias', 'logo', 'certificado', 'logo_url', 'certificado_url'].includes(key)) {
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

            data.append('_method', 'PUT');

            await update(id, data);
            setAlert({ type: 'success', message: 'Experiencia actualizada correctamente' });
            setTimeout(() => navigate('/experiencia/listar'), 1500);
        } catch (err) {
            setAlert(handleApiError(err, 'Error al actualizar'));
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <div className="container mx-auto p-6">
            <PageHeader title={`Editar: ${formData.empresa}`} icon={PencilSquareIcon} buttonText="Volver" buttonLink="/experiencia/listar" />
            <AlertMessage type={alert?.type} message={alert?.message} details={alert?.details} onClose={() => setAlert(null)} />
            
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm">
                <ExperienciaForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    onSubmit={handleSubmit} 
                    loading={saving} 
                    buttonText="Actualizar Experiencia" 
                />
            </div>
        </div>
    );
};

export default Update;