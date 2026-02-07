import React from 'react';
import { PhotoIcon, CpuChipIcon } from '@heroicons/react/24/outline';

const TecnologiaForm = ({ data, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6">
      <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
        <CpuChipIcon className="w-5 h-5" /> Datos de la Tecnología
      </h3>
      
      <div className="grid grid-cols-1 gap-5">
        {/* Nombre */}
        <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nombre de la Tecnología <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={data.nombre || ''}
                onChange={(e) => onChange('nombre', e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                placeholder="Ej: React, Spring Boot, Laravel"
                required
            />
        </div>
        
        {/* URL Imagen */}
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL de la Imagen (Logo) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <PhotoIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                        type="url"
                        value={data.imagen_url || ''}
                        onChange={(e) => onChange('imagen_url', e.target.value)}
                        className="w-full pl-10 p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                        placeholder="https://ejemplo.com/logo.png"
                        required
                    />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Recomendamos usar imágenes SVG o PNG transparentes.</p>
            </div>

            {/* Previsualización */}
            <div className="w-full md:w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden relative">
                {data.imagen_url ? (
                    <img 
                        src={data.imagen_url} 
                        alt="Preview" 
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {e.target.style.display = 'none';}}
                    />
                ) : (
                    <span className="text-xs text-gray-400 text-center px-2">Vista previa</span>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TecnologiaForm;