import React, { useState, useEffect, useRef } from 'react';
import { index } from 'services/tecnologiaService'; 
import { MagnifyingGlassIcon, CpuChipIcon, CodeBracketIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TecnologiaSearchSelect = ({ form, setForm, disabled, isFilter = false }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const wrapperRef = useRef(null);
    const debounceRef = useRef(null); 

    // Sincronizar input con el estado del formulario externo
    useEffect(() => {
        if (form && form.tecnologiaNombre) {
            setInputValue(form.tecnologiaNombre);
        } else if (form && !form.tecnologia_id) {
            setInputValue('');
        }
    }, [form]);

    // Cerrar sugerencias al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const fetchTecnologias = async (searchTerm = '') => {
        setLoading(true);
        try {
            const response = await index(1, { search: searchTerm });
            // Asumiendo que la API devuelve { data: [...] } o directamente el array
            const lista = response.data || [];
            setSuggestions(lista);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error al buscar tecnologías", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const texto = e.target.value;
        setInputValue(texto);

        // Si el usuario escribe, limpiamos la selección previa para obligar a seleccionar de la lista
        if (form.tecnologia_id) {
            setForm(prev => ({ ...prev, tecnologia_id: '', tecnologiaNombre: '' }));
        }

        if (debounceRef.current) clearTimeout(debounceRef.current);
        
        // Debounce para no saturar la API
        debounceRef.current = setTimeout(() => {
            fetchTecnologias(texto);
        }, 500);
    };

    const handleInputClick = () => {
        if (!showSuggestions) {
            if (suggestions.length === 0) {
                fetchTecnologias('');
            } else {
                setShowSuggestions(true);
            }
        }
    };

    const handleSelect = (tech) => {
        setInputValue(tech.nombre);
        setForm(prev => ({ 
            ...prev, 
            tecnologia_id: tech.id, 
            tecnologiaNombre: tech.nombre,
            // Opcional: si necesitas la imagen en el padre
            tecnologiaImagen: tech.imagen_url 
        }));
        setShowSuggestions(false);
    };

    const handleClear = (e) => {
        e.stopPropagation();
        setInputValue('');
        setForm(prev => ({ ...prev, tecnologia_id: '', tecnologiaNombre: '' }));
        fetchTecnologias('');
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            
            {!isFilter && (
                <label className="block text-sm font-black text-slate-700 uppercase mb-2">
                    Tecnología <span className="text-red-500">*</span>
                </label>
            )}
            
            <div className="relative flex items-center group">

                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onClick={handleInputClick}
                    disabled={disabled}
                    placeholder={isFilter ? "Todas las tecnologías" : "Buscar tecnología (React, PHP...)"}
                    className={`w-full border border-slate-300 rounded-md shadow-sm pl-9 pr-8 text-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all placeholder-slate-400 
                        ${isFilter ? 'py-2' : 'py-3'} 
                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                    `}
                    autoComplete="off"
                />

                {/* Icono izquierdo (Chip) */}
                <div className="absolute left-3 text-slate-400">
                    <CpuChipIcon className="w-4 h-4" />
                </div>

                <div className="absolute right-2 flex items-center">
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-slate-300 border-t-black rounded-full animate-spin"></div>
                    ) : inputValue ? (
                        <button onClick={handleClear} type="button" className="text-slate-400 hover:text-red-500">
                            <XMarkIcon className="w-4 h-4" />
                        </button>
                    ) : (
                        <MagnifyingGlassIcon className="w-4 h-4 text-slate-400" />
                    )}
                </div>


                {showSuggestions && (
                    <ul className="absolute z-50 top-full left-0 w-full bg-white border border-slate-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl animate-in fade-in zoom-in duration-100">
                        {suggestions.length > 0 ? (
                            suggestions.map((tech) => (
                                <li
                                    key={tech.id}
                                    onClick={() => handleSelect(tech)}
                                    className={`px-4 py-2.5 cursor-pointer text-sm flex items-center gap-3 transition-colors ${
                                        form.tecnologia_id === tech.id 
                                        ? 'bg-slate-100 text-black font-bold' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                                    }`}
                                >
                                    {/* Imagen miniatura de la tecnología */}
                                    <div className="w-6 h-6 flex-shrink-0 bg-white border border-gray-200 rounded p-0.5 flex items-center justify-center">
                                        <img 
                                            src={tech.imagen_url} 
                                            alt="" 
                                            className="max-w-full max-h-full object-contain"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                        <CodeBracketIcon className="w-4 h-4 text-gray-300 absolute -z-10" />
                                    </div>
                                    
                                    <span>{tech.nombre}</span>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-3 text-slate-400 text-xs text-center italic">
                                {loading ? 'Buscando...' : 'No se encontraron tecnologías'}
                            </li>
                        )}
                    </ul>
                )}
            </div>

            {!isFilter && (
                <div className="mt-2 text-xs h-4">
                    {form.tecnologia_id ? (
                        <span className="text-green-600 font-bold flex items-center gap-1 animate-pulse">
                            ✓ Seleccionado: {form.tecnologiaNombre}
                        </span>
                    ) : (
                        <span className="text-gray-400 italic">
                            {inputValue && !loading ? 'Selecciona una opción de la lista' : 'Busca y selecciona una tecnología'}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default TecnologiaSearchSelect;