import React from 'react';
import { IdentificationIcon } from '@heroicons/react/24/outline';

const DatosPersonalesForm = ({ data, handleNestedChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
        <IdentificationIcon className="w-5 h-5" /> Datos Personales del Cliente
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* DNI */}
        <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                DNI <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={data.datos_cliente.dni || ''}
                onChange={(e) => handleNestedChange('datos_cliente', 'dni', e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all placeholder-slate-400"
                placeholder="8 dígitos"
                required
            />
        </div>

        {/* Nombres */}
        <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nombres <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={data.datos_cliente.nombre || ''}
                onChange={(e) => handleNestedChange('datos_cliente', 'nombre', e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all placeholder-slate-400"
                required
            />
        </div>

        {/* Apellido Paterno */}
        <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Apellido Paterno <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={data.datos_cliente.apellidoPaterno || ''}
                onChange={(e) => handleNestedChange('datos_cliente', 'apellidoPaterno', e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all placeholder-slate-400"
                required
            />
        </div>

        {/* Apellido Materno */}
        <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Apellido Materno <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={data.datos_cliente.apellidoMaterno || ''}
                onChange={(e) => handleNestedChange('datos_cliente', 'apellidoMaterno', e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all placeholder-slate-400"
                required
            />
        </div>
        
        {/* Sexo */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Sexo <span className="text-red-500">*</span>
          </label>
          <select
              value={data.datos_cliente.sexo || ''}
              onChange={(e) => handleNestedChange('datos_cliente', 'sexo', e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none bg-white"
              required
          >
              <option value="">Seleccione...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
          </select>
        </div>

        {/* Fecha Nacimiento */}
        <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Fecha Nacimiento <span className="text-red-500">*</span>
            </label>
            <input
                type="date"
                value={data.datos_cliente.fechaNacimiento || ''}
                onChange={(e) => handleNestedChange('datos_cliente', 'fechaNacimiento', e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all placeholder-slate-400"
                required
            />
        </div>
        
        {/* Dirección */}
        <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Dirección Domiciliaria <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={data.datos_cliente.direccion || ''}
                onChange={(e) => handleNestedChange('datos_cliente', 'direccion', e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all placeholder-slate-400"
                placeholder="Av. Principal 123..."
                required
            />
        </div>
      </div>
    </div>
  );
};

export default DatosPersonalesForm;