import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { show, update } from 'services/clienteService';
import LoadingScreen from 'components/Shared/LoadingScreen';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';
import PageHeader from 'components/Shared/Headers/PageHeader';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import DatosPersonalesForm from 'components/Shared/Formularios/cliente/DatosPersonalesForm';
import ContactosForm from 'components/Shared/Formularios/cliente/ContactosForm';
import UsuarioForm from 'components/Shared/Formularios/cliente/UsuarioForm';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    datos_cliente: {},
    usuario: { username: '', password: '' },
    contactos: {}
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  
  useEffect(() => {
    const loadCliente = async () => {
      try {
        const response = await show(id);
        const data = response.data || response;
        
        setFormData({
            datos_cliente: data,
            usuario: {
                username: data.usuario?.username || '',
                password: ''
            },
            contactos: {
                telefono: data.contacto?.telefono || '',
                correo: data.contacto?.correo || ''
            }
        });

      } catch (e) {
        setAlert({ type: 'error', message: 'No se pudo cargar la información.' });
      } finally {
        setLoading(false);
      }
    };
    loadCliente();
  }, [id]);

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      await update(id, formData);
      setAlert({ type: 'success', message: 'Cliente actualizado correctamente.' });
      setTimeout(() => navigate('/cliente/listar'), 1500); // Redirige al Index
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
        title="Editar Cliente"
        subtitle={`Modificando: ${formData.datos_cliente.nombre || ''} ${formData.datos_cliente.apellidoPaterno || ''}`}
        icon={PencilSquareIcon}
        buttonText="← Volver"
        buttonLink="/cliente/listar"
      />

      <AlertMessage type={alert?.type} message={alert?.message} onClose={() => setAlert(null)} />

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <DatosPersonalesForm 
            data={formData} 
            handleNestedChange={handleNestedChange} 
          />

          <ContactosForm 
            data={formData} 
            handleNestedChange={handleNestedChange} 
          />

          <UsuarioForm 
            data={formData} 
            handleNestedChange={handleNestedChange}
            isEditing={true}
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/cliente/listar')}
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