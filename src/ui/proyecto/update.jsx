import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { show, update } from 'services/proyectoService';
import PageHeader from 'components/Shared/Headers/PageHeader';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import ProyectoForm from 'components/Shared/Formularios/proyecto/ProyectoForm';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState(null);
    
    const [formData, setFormData] = useState({
        titulo: '', descripcion: '', cliente: '', fecha_realizacion: '', url_web: '',
        tecnologias: [],
        imagenes: [],          
        imagenes_actuales: [],
        imagenes_eliminadas: [] 
    });

    useEffect(() => {
        const load = async () => {
            try {
                const res = await show(id);
                const data = res.data || res;
                setFormData({
                    titulo: data.titulo,
                    descripcion: data.descripcion || '',
                    cliente: data.cliente || '',
                    fecha_realizacion: data.fecha_realizacion || '',
                    url_web: data.url_web || '',
                    tecnologias: data.tecnologias || [],
                    imagenes: [],
                    imagenes_actuales: data.imagenes || [], 
                    imagenes_eliminadas: []
                });
            } catch (e) {
                setAlert({ type: 'error', message: 'Error al cargar proyecto' });
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
            data.append('descripcion', formData.descripcion || '');
            data.append('cliente', formData.cliente || '');
            data.append('fecha_realizacion', formData.fecha_realizacion || '');
            data.append('url_web', formData.url_web || '');
            
            formData.tecnologias.forEach(t => data.append('tecnologias[]', t.id));
            
            if (formData.imagenes.length > 0) {
                 formData.imagenes.forEach(file => data.append('imagenes[]', file));
            }

            if (formData.imagenes_eliminadas.length > 0) {
                formData.imagenes_eliminadas.forEach(id => data.append('imagenes_eliminadas[]', id));
            }

            await update(id, data);
            setAlert({ type: 'success', message: 'Proyecto actualizado correctamente' });
            setTimeout(() => navigate('/proyecto/listar'), 1500);
        } catch (error) {
            setAlert({ type: 'error', message: 'Error al actualizar', details: error.message });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="container mx-auto p-6">
            <PageHeader title="Editar Proyecto" icon={PencilSquareIcon} buttonText="Volver" buttonLink="/proyecto/listar" />
            <AlertMessage type={alert?.type} message={alert?.message} />
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm">
                <ProyectoForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    onSubmit={handleSubmit} 
                    loading={saving} 
                    buttonText="Guardar Cambios" 
                />
            </div>
        </div>
    );
};

export default Update;