import React from 'react';
import { PhoneIcon } from '@heroicons/react/24/outline';

const ContactosForm = ({ data, handleNestedChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
        <PhoneIcon className="w-5 h-5" /> Información de Contacto
      </h3>
      
      <div className="space-y-4"> {/* Eliminado el grid para que ocupen todo el ancho */}
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase">Contacto del Cliente</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Grid solo para los inputs internos */}
                {/* Teléfono Personal */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Teléfono Personal <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.contactos.telefono || ''}
                        onChange={(e) => handleNestedChange('contactos', 'telefono', e.target.value)}
                        className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                        required
                    />
                </div>

                {/* Correo Electrónico */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Correo Electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={data.contactos.correo || ''}
                        onChange={(e) => handleNestedChange('contactos', 'correo', e.target.value)}
                        className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                        required
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactosForm;