import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from 'services/tecnologiaService';
import PageHeader from 'components/Shared/Headers/PageHeader';
import { PlusIcon } from '@heroicons/react/24/outline';
import AlertMessage from 'components/Shared/Errors/AlertMessage';
import { handleApiError } from 'utilities/Errors/apiErrorHandler';

import TecnologiaForm from 'components/Shared/Formularios/tecnologia/TecnologiaForm';

const Store = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    nombre: '', 
    imagen_url: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      await store(formData);
      setAlert({ type: 'success', message: 'Tecnología registrada exitosamente.' });
      setTimeout(() => { navigate('/tecnologia/listar'); }, 1500);
    } catch (error) {
      setAlert(handleApiError(error, 'Error al registrar la tecnología'));
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <PageHeader 
        title="Nueva Tecnología" 
        icon={PlusIcon} 
        buttonText="Volver" 
        buttonLink="/tecnologia/listar" 
      />
      
      <AlertMessage type={alert?.type} message={alert?.message} onClose={() => setAlert(null)} />

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
         <div className="space-y-6">
            <TecnologiaForm data={formData} onChange={handleChange} />
            
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-black text-white py-4 rounded-xl font-black uppercase text-lg hover:bg-zinc-800 transition-all shadow-lg disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Registrar Tecnología'}
              </button>
            </div>
         </div>
      </form>
    </div>
  );
};

export default Store;