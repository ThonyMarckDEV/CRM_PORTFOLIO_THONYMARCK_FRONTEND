import React, { useRef , useEffect} from 'react';
import { XMarkIcon, ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/24/outline';

const PdfModal = ({ isOpen, onClose, title, pdfUrl, isPrintable = true }) => {
    const iframeRef = useRef(null);

    const handlePrint = () => {
        if (iframeRef.current) {
            const iframeWindow = iframeRef.current.contentWindow;
            iframeWindow.focus();
            iframeWindow.print();
        }
    };

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
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
            <div 
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden animate-scale-in border border-white/10">
                
                <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 z-10 shadow-sm">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Documento</span>
                        <h3 className="text-lg font-semibold text-gray-800 truncate max-w-md" title={title}>{title}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <a 
                            href={pdfUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200"
                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Descargar</span>
                        </a>

                        {isPrintable && (
                            <button 
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg shadow-black/20"
                            >
                                <PrinterIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Imprimir</span>
                            </button>
                        )}
                        
                        <div className="w-px h-6 bg-gray-200 mx-2"></div>

                        <button 
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-gray-50 overflow-hidden relative">
                    <iframe 
                        ref={iframeRef}
                        src={`${pdfUrl}#toolbar=0&view=FitH`} 
                        className="w-full h-full border-none"
                        title="PDF Viewer"
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes scale-in {
                    0% { opacity: 0; transform: scale(0.98); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PdfModal;