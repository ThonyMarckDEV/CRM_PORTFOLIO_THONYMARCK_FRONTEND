import React, { useRef } from 'react';
import { XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// Agregamos isPrintable con valor por defecto true
const PdfModal = ({ isOpen, onClose, title, pdfUrl, isPrintable = true }) => {
    const iframeRef = useRef(null);

    if (!isOpen) return null;

    const handlePrint = () => {
        if (iframeRef.current) {
            const iframeWindow = iframeRef.current.contentWindow;
            iframeWindow.focus();
            iframeWindow.print();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[95vh] flex flex-col overflow-hidden animate-fade-in">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">Vista Previa del Documento</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Botón Descargar */}
                        <a 
                            href={pdfUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-2 text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                            title="Descargar PDF"
                        >
                            <ArrowDownTrayIcon className="w-6 h-6" />
                        </a>
                        
                        <button 
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                            <XMarkIcon className="w-7 h-7" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 bg-slate-200 overflow-hidden relative">
                    <iframe 
                        ref={iframeRef}
                        src={`${pdfUrl}#toolbar=0`} 
                        className="w-full h-full"
                        title="PDF Viewer"
                    />
                </div>

                {/* Footer */}
                {/* Solo mostramos el footer si es imprimible, o puedes dejar el footer vacío si prefieres */}
                <div className="px-6 py-3 border-t bg-slate-50 flex justify-end gap-3 min-h-[60px]">
                    {isPrintable && (
                        <button 
                            onClick={handlePrint}
                            className="px-6 py-2 bg-slate-800 text-white rounded font-bold hover:bg-black transition-colors flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                            </svg>
                            Imprimir Ahora
                        </button>
                    )}
                </div>
            </div>
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PdfModal;