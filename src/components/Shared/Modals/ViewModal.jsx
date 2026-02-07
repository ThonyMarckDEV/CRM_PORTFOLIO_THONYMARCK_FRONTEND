import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ViewModal = ({ isOpen, onClose, title, children, isLoading = false }) => {
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all animate-modal-entry border border-white/20">

                <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-white">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
                        <div className="h-1 w-12 bg-black mt-2 rounded-full"></div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="group p-2 rounded-full hover:bg-gray-50 transition-all duration-200"
                    >
                        <XMarkIcon className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </button>
                </div>

                <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-[3px] border-gray-100 border-t-black rounded-full animate-spin mb-4"></div>
                            <p className="text-sm font-medium text-gray-400 tracking-wider uppercase">Cargando detalles...</p>
                        </div>
                    ) : (
                        <div className="animate-fade-in-up">
                            {children}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes modal-entry {
                    0% { opacity: 0; transform: scale(0.95) translateY(10px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-modal-entry { animation: modal-entry 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
                
                /* Scrollbar fino y elegante */
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #d1d5db; }
            `}</style>
        </div>
    );
};

export default ViewModal;