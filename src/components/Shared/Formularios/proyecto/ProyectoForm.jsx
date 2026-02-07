import React, { useState, useEffect } from 'react';
import TecnologiaSearchSelect from 'components/Shared/Comboboxes/TecnologiaSearchSelect';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

const ProyectoForm = ({ formData, setFormData, onSubmit, loading, buttonText }) => {
    const [techInput, setTechInput] = useState({});
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addTecnologia = () => {
        if (techInput.tecnologia_id) {
            if (!formData.tecnologias.some(t => t.id === techInput.tecnologia_id)) {
                setFormData(prev => ({
                    ...prev,
                    tecnologias: [...prev.tecnologias, { 
                        id: techInput.tecnologia_id, 
                        nombre: techInput.tecnologiaNombre,
                        imagen_url: techInput.tecnologiaImagen 
                    }]
                }));
            }
            setTechInput({ tecnologia_id: '', tecnologiaNombre: '' });
        }
    };

    useEffect(() => {
        if (techInput.tecnologia_id) addTecnologia();
        // eslint-disable-next-line
    }, [techInput.tecnologia_id]);

    const removeTecnologia = (id) => {
        setFormData(prev => ({
            ...prev,
            tecnologias: prev.tecnologias.filter(t => t.id !== id)
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        setFormData(prev => ({ 
            ...prev, 
            imagenes: [...prev.imagenes, ...files]
        }));

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
        
        e.target.value = ''; 
    };

    const removeNewImage = (indexToRemove) => {
        setFormData(prev => {
            const newImages = prev.imagenes.filter((_, index) => index !== indexToRemove);
            return { ...prev, imagenes: newImages };
        });

        setImagePreviews(prev => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[indexToRemove]); 
            return newPreviews.filter((_, index) => index !== indexToRemove);
        });
    };

    const removeExistingImage = (idToRemove) => {
        setFormData(prev => ({
            ...prev,
            imagenes_eliminadas: [...(prev.imagenes_eliminadas || []), idToRemove],
            imagenes_actuales: prev.imagenes_actuales.filter(img => img.id !== idToRemove)
        }));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
             {/* CAMPOS DE TEXTO  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Título del Proyecto</label>
                        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-black focus:border-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Cliente</label>
                        <input type="text" name="cliente" value={formData.cliente} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">URL Web</label>
                        <input type="url" name="url_web" value={formData.url_web} onChange={handleChange} placeholder="https://..." className="mt-1 w-full border border-gray-300 rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Fecha Realización</label>
                        <input type="date" name="fecha_realizacion" value={formData.fecha_realizacion} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg p-2" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Descripción</label>
                        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="4" className="mt-1 w-full border border-gray-300 rounded-lg p-2"></textarea>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tecnologías Usadas</label>
                        <TecnologiaSearchSelect form={techInput} setForm={setTechInput} />
                        <div className="flex flex-wrap gap-2 mt-3">
                            {formData.tecnologias.map(tech => (
                                <span key={tech.id} className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-full text-sm shadow-sm">
                                    <img src={tech.imagen_url} alt="" className="w-4 h-4 object-contain" />
                                    {tech.nombre}
                                    <button type="button" onClick={() => removeTecnologia(tech.id)} className="text-red-500 hover:text-red-700">
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                            {formData.tecnologias.length === 0 && <span className="text-xs text-gray-400 italic">No hay tecnologías seleccionadas</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN IMÁGENES UNIFICADA */}
            <div className="border-t pt-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Imágenes del Proyecto</label>
                
                {/* Input de Subida */}
                <div className="flex items-center justify-center w-full mb-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <PhotoIcon className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500"><span className="font-semibold">Click para subir</span> imágenes</p>
                            <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                        </div>
                        <input type="file" className="hidden" multiple onChange={handleImageChange} accept="image/*" />
                    </label>
                </div>

                {/* Grid de Previsualización (Viejas + Nuevas) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    
                    {/* 1. Imágenes YA EXISTENTES  */}
                    {formData.imagenes_actuales && formData.imagenes_actuales.map((img) => (
                        <div key={`old-${img.id}`} className="relative group">
                            <img 
                                src={`${img.imagen_url}`} 
                                alt="Actual" 
                                className="w-full h-24 object-cover rounded-lg border border-indigo-200" 
                            />
                            <div className="absolute bottom-0 left-0 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-tr-lg rounded-bl-lg">Existente</div>
                            
                            {/* Botón borrar existente */}
                            <button 
                                type="button" 
                                onClick={() => removeExistingImage(img.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors z-10"
                                title="Eliminar imagen existente"
                            >
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    {/* 2. Imágenes NUEVAS (Subidas ahora) - ESTAS USAN Blob local */}
                    {imagePreviews.map((src, idx) => (
                        <div key={`new-${idx}`} className="relative group">
                            <img src={src} alt={`New Preview ${idx}`} className="w-full h-24 object-cover rounded-lg border border-green-300 shadow-sm" />
                            <div className="absolute bottom-0 left-0 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-tr-lg rounded-bl-lg">Nueva</div>
                            
                            {/* Botón borrar nueva */}
                            <button 
                                type="button" 
                                onClick={() => removeNewImage(idx)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors z-10"
                                title="Cancelar subida"
                            >
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
                
                {(!formData.imagenes_actuales?.length && !imagePreviews.length) && (
                    <p className="text-center text-gray-400 text-sm mt-4 italic">No hay imágenes en este proyecto.</p>
                )}
            </div>

            <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-bold uppercase hover:bg-gray-800 transition-all disabled:opacity-50">
                    {loading ? 'Procesando...' : buttonText}
                </button>
            </div>
        </form>
    );
};

export default ProyectoForm;