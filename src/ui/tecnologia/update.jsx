import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { show, update } from 'services/tecnologiaService';
import LoadingScreen from 'components/Shared/LoadingScreen';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';
import PageHeader from 'components/Shared/Headers/PageHeader';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import TecnologiaForm from 'components/Shared/Formularios/tecnologia/TecnologiaForm';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ nombre: '', imagen_url: '' });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await show(id);
        const data = response.data || response;
        setFormData({
            nombre: data.nombre,
            imagen_url: data.imagen_url
        });
      } catch (err) {
        setAlert(handleApiError(err,'No se pudo cargar la información.'));
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      await update(id, formData);
      setAlert({ type: 'success', message: 'Tecnología actualizada correctamente.' });
      setTimeout(() => navigate('/tecnologia/listar'), 1500);
    } catch (err) {
      setAlert(handleApiError(err, 'Error al actualizar'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Editar Tecnología"
        subtitle={`Modificando: ${formData.nombre}`}
        icon={PencilSquareIcon}
        buttonText="← Volver"
        buttonLink="/tecnologia/listar"
      />

      <AlertMessage type={alert?.type} message={alert?.message} details={alert?.details}  onClose={() => setAlert(null)} />

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <TecnologiaForm data={formData} onChange={handleChange} />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/tecnologia/listar')}
              className="px-6 py-3 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200 uppercase text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-black text-white px-10 py-3 rounded-lg font-black uppercase shadow-lg hover:bg-zinc-800 transition-all disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;