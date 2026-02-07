import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Download, Eye } from 'lucide-react';
import logo from 'assets/img/logo.png'; 

import { indexLanding } from 'services/cvService';
import PdfModal from 'components/Shared/Modals/PdfModal';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);

  const [cvData, setCvData] = useState(null);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    fetchCv();
  }, []);

  const fetchCv = async () => {
    try {
      const response = await indexLanding();
      if (response.data && response.data.length > 0) {
        setCvData(response.data[0]);
      }
    } catch (error) {
      console.error("No se pudo cargar el CV", error);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width, height;
    let particles = [];
    
    const particleConfig = {
      count: window.innerWidth < 768 ? 50 : 100,
      connectionDistance: 150,
      speed: 0.6,
      color: '0, 0, 0',
      opacity: 0.2
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * particleConfig.speed;
        this.vy = (Math.random() - 0.5) * particleConfig.speed;
        this.size = Math.random() * 3 + 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleConfig.color}, ${particleConfig.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleConfig.count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < particleConfig.connectionDistance) {
            const opacity = 0.6 - (distance / particleConfig.connectionDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${particleConfig.color}, ${opacity * 0.5})`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12 bg-white overflow-hidden">
      
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/90 pointer-events-none z-0"></div>

      <div className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="mb-8 flex justify-center animate-float">
          <img src={logo} alt="ThonyMarckDev" className="h-20 w-auto drop-shadow-sm" />
        </div>

        <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-tight text-black">
          ANTHONY MARCK
        </h1>
        <h2 className="text-3xl md:text-5xl font-light mb-8 text-gray-600">
          Full Stack Developer
        </h2>
        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Creando experiencias digitales excepcionales con código limpio y arquitecturas escalables.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-4 bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 font-medium shadow-lg hover:shadow-xl"
          >
            Ver Proyectos
          </button>
          
          {cvData ? (
            <button
              onClick={() => setShowPdf(true)}
              className="px-8 py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 font-medium inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm cursor-pointer"
            >
              <Eye size={20} />
              Ver CV
            </button>
          ) : (
            <button disabled className="px-8 py-4 border border-gray-300 text-gray-400 font-medium inline-flex items-center justify-center gap-2 cursor-not-allowed">
               <Download size={20} />
               Cargando CV...
            </button>
          )}
        </div>

        <div className="flex gap-6 justify-center">
          <a href="https://github.com/ThonyMarckDev" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 text-gray-700 hover:text-black">
            <Github size={28} />
          </a>
          <a href="https://www.linkedin.com/in/anthony-mendoza-a7a1aa311" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 text-gray-700 hover:text-blue-700">
            <Linkedin size={28} />
          </a>
          <a href="mailto:thonymarckdev@gmail.com" className="hover:scale-110 transition-transform duration-300 text-gray-700 hover:text-red-600">
            <Mail size={28} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-black to-transparent"></div>
      </div>

      {cvData && (
        <PdfModal 
            isOpen={showPdf}
            onClose={() => setShowPdf(false)}
            title={cvData.titulo || "Curriculum Vitae"}
            pdfUrl={cvData.url}
            isPrintable={false}
        />
      )}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;