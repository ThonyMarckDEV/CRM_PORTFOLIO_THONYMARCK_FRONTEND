import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from 'services/clienteService';
import PageHeader from 'components/Shared/Headers/PageHeader';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';

import DatosPersonalesForm from 'components/Shared/Formularios/cliente/DatosPersonalesForm';
import ContactosForm from 'components/Shared/Formularios/cliente/ContactosForm';
import UsuarioForm from 'components/Shared/Formularios/cliente/UsuarioForm';

const Store = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    datos_cliente: {
      dni: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '',
      fechaNacimiento: '', sexo: '', direccion: ''
    },
    usuario: {
      username: '', 
      password: ''
    },
    contactos: {
      telefono: '', correo: ''
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

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
    setLoading(true);
    setAlert(null);

    try {
      await store(formData);
      
      setAlert({ 
        type: 'success', 
        message: 'Cliente registrado exitosamente.' 
      });

      setTimeout(() => {
        navigate('/cliente/listar');
      }, 1500);

    } catch (error) {
      setAlert(handleApiError(error, 'Error al registrar el cliente'));
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <PageHeader 
        title="Nuevo Cliente" 
        icon={UserPlusIcon} 
        buttonText="Volver" 
        buttonLink="/cliente/listar" 
      />
      
      <AlertMessage 
        type={alert?.type} 
        message={alert?.message} 
        details={alert?.details} 
        onClose={() => setAlert(null)} 
      />

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        {/* Contenedor Grid: 1 columna en móvil, 2 en pantallas grandes (lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Columna Izquierda: Datos Personales */}
          <div className="space-y-6">
            <DatosPersonalesForm 
              data={formData} 
              handleNestedChange={handleNestedChange}
            />
          </div>

          {/* Columna Derecha: Contactos y Usuario */}
          <div className="space-y-6">
            <ContactosForm 
              data={formData} 
              handleNestedChange={handleNestedChange} 
            />
            
            <UsuarioForm 
              data={formData} 
              handleNestedChange={handleNestedChange}
              isEditing={false}
            />

            {/* Botón de envío dentro de la columna derecha para cerrar el diseño */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-primary text-secondary py-4 rounded-xl font-black uppercase text-lg hover:bg-primary-hover transition-all shadow-lg disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Registrar Cliente'}
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default Store;