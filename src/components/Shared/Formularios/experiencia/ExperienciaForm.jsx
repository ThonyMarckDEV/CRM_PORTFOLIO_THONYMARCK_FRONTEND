import React, { useState, useEffect } from 'react';
import { XMarkIcon, PaperClipIcon, EyeIcon } from '@heroicons/react/24/outline';
import TecnologiaSearchSelect from 'components/Shared/Comboboxes/TecnologiaSearchSelect'; 
import PdfModal from 'components/Shared/Modals/PdfModal';

const ExperienciaForm = ({ formData, setFormData, onSubmit, loading, buttonText }) => {
    
    const [showPdfModal, setShowPdfModal] = useState(false);

    const [tempTecnologia, setTempTecnologia] = useState({
        tecnologia_id: '',
        tecnologiaNombre: '',
        tecnologiaImagen: ''
    });

    useEffect(() => {
        if (tempTecnologia.tecnologia_id) {
            addTecnologia({
                id: tempTecnologia.tecnologia_id,
                nombre: tempTecnologia.tecnologiaNombre,
                imagen_url: tempTecnologia.tecnologiaImagen || null 
            });

            setTempTecnologia({
                tecnologia_id: '',
                tecnologiaNombre: '',
                tecnologiaImagen: ''
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tempTecnologia.tecnologia_id]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    const addTecnologia = (tec) => {
        if (!formData.tecnologias.some(t => t.id === tec.id)) {
            setFormData(prev => ({ 
                ...prev, 
                tecnologias: [...prev.tecnologias, tec] 
            }));
        }
    };

    const removeTecnologia = (id) => {
        setFormData(prev => ({
            ...prev,
            tecnologias: prev.tecnologias.filter(t => t.id !== id)
        }));
    };

    return (
        <>
            <form onSubmit={onSubmit} className="space-y-6" encType="multipart/form-data">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Puesto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Puesto *</label>
                        <input type="text" name="puesto" value={formData.puesto} onChange={handleChange} required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"/>
                    </div>

                    {/* Empresa */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Empresa *</label>
                        <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"/>
                    </div>
                </div>

                {/* Fechas y Actualidad */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha Inicio *</label>
                        <input type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
                        <input type="date" name="fecha_fin" value={formData.fecha_fin} onChange={handleChange} 
                            disabled={formData.es_actual}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border p-2 ${formData.es_actual ? 'bg-gray-100 text-gray-400' : ''}`}/>
                    </div>

                    <div className="flex items-center h-10">
                        <input type="checkbox" id="es_actual" name="es_actual" checked={formData.es_actual} onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                        <label htmlFor="es_actual" className="ml-2 block text-sm text-gray-900">Actualmente trabajo aquí</label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tipo Contrato */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Contrato</label>
                        <select name="tipo_contrato" value={formData.tipo_contrato || ''} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2">
                            <option value="">Seleccionar...</option>
                            <option value="Tiempo Completo">Tiempo Completo</option>
                            <option value="Medio Tiempo">Medio Tiempo</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Prácticas">Prácticas</option>
                        </select>
                    </div>
                    {/* Ubicación */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                        <input type="text" name="ubicacion" value={formData.ubicacion || ''} onChange={handleChange} placeholder="Ej: Remoto, Lima, Madrid"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"/>
                    </div>
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción *</label>
                    <textarea name="descripcion" rows={4} value={formData.descripcion} onChange={handleChange} required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"></textarea>
                </div>

                {/* --- SECCIÓN TECNOLOGÍAS --- */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tecnologías Utilizadas</label>
                    
                    {/* Componente Reutilizable */}
                    <div className="mb-4">
                        <TecnologiaSearchSelect 
                            form={tempTecnologia} 
                            setForm={setTempTecnologia}
                            isFilter={false} 
                        />
                    </div>
                    
                    {/* Lista de seleccionados (Chips) */}
                    <div className="flex flex-wrap gap-2">
                        {formData.tecnologias.length === 0 && (
                            <p className="text-sm text-gray-400 italic">No hay tecnologías seleccionadas.</p>
                        )}
                        {formData.tecnologias.map((t) => (
                            <span key={t.id} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                                {t.imagen_url && <img src={t.imagen_url} alt="" className="w-4 h-4 object-contain mr-1"/>}
                                {t.nombre}
                                <button type="button" onClick={() => removeTecnologia(t.id)} className="ml-1 text-indigo-600 hover:text-red-600 focus:outline-none">
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* --- ARCHIVOS (LOGO Y CERTIFICADO) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
                    {/* Logo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Logo Empresa</label>
                        <div className="mt-1 flex items-center gap-4">
                            <input type="file" name="logo" accept="image/*" onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                        </div>
                        {/* Preview si existe URL previa */}
                        {formData.logo_url && !formData.logo && (
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Actual:</p>
                                <img src={formData.logo_url} alt="Logo actual" className="h-12 w-auto object-contain border p-1 rounded"/>
                            </div>
                        )}
                    </div>

                    {/* Certificado */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Certificado (PDF/Img)</label>
                        <div className="mt-1">
                            <input type="file" name="certificado" accept=".pdf,image/*" onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                        </div>
                        
                        {/* Botón para ver el modal si existe certificado previo y no se ha subido uno nuevo */}
                        {formData.certificado_url && !formData.certificado && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                                <PaperClipIcon className="w-4 h-4" />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPdfModal(true)}
                                    className="hover:underline hover:text-green-800 font-medium flex items-center gap-1"
                                >
                                    Ver certificado actual
                                    <EyeIcon className="w-3 h-3"/>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={loading}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
                        {loading ? 'Guardando...' : buttonText}
                    </button>
                </div>
            </form>

            {/* Modal para ver el PDF */}
            <PdfModal 
                isOpen={showPdfModal}
                onClose={() => setShowPdfModal(false)}
                title={`Certificado - ${formData.empresa || 'Experiencia'}`}
                pdfUrl={formData.certificado_url}
            />
        </>
    );
};

export default ExperienciaForm;