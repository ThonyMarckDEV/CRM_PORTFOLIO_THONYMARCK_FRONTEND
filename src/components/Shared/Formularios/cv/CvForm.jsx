import React from 'react';
import { DocumentTextIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

const CvForm = ({ formData, setFormData, onSubmit, loading, buttonText }) => {
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            file: e.target.files[0]
        }));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                
                {/* Título */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título del CV</label>
                    <input 
                        type="text" 
                        name="titulo" 
                        value={formData.titulo} 
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 focus:border-black focus:ring-black transition-colors"
                        placeholder="Ej: CV Fullstack 2026"
                        required
                    />
                </div>

                {/* Es Principal */}
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <input
                        type="checkbox"
                        id="es_principal"
                        name="es_principal"
                        checked={formData.es_principal}
                        onChange={handleChange}
                        className="h-5 w-5 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="es_principal" className="text-sm font-medium text-gray-700 cursor-pointer">
                        ¿Es este el CV Principal?
                        <span className="block text-xs text-gray-500 font-normal">
                            Si marcas esto, aparecerá como descarga principal en el Hero.
                        </span>
                    </label>
                </div>

                {/* Subida de Archivo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Archivo PDF</label>
                    
                    {/* Visualización si ya existe URL (Modo Edición) */}
                    {formData.url && !formData.file && (
                        <div className="flex items-center gap-2 p-2 bg-blue-50 text-blue-700 rounded-md mb-2 text-sm">
                            <DocumentTextIcon className="w-5 h-5" />
                            <span className="truncate">Archivo actual cargado</span>
                            <a href={formData.url} target="_blank" rel="noreferrer" className="underline hover:text-blue-900 ml-auto">Ver</a>
                        </div>
                    )}

                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer relative">
                        <div className="space-y-1 text-center">
                            <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600 justify-center">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none">
                                    <span>Subir un archivo</span>
                                    <input id="file-upload" name="file" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                                </label>
                                <p className="pl-1">o arrastrar y soltar</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF hasta 5MB</p>
                            {formData.file && (
                                <p className="text-sm font-bold text-green-600 mt-2">
                                    Seleccionado: {formData.file.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium shadow-lg shadow-gray-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Guardando...' : buttonText}
                </button>
            </div>
        </form>
    );
};

export default CvForm;