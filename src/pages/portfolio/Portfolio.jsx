import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Download, Calendar, Award } from 'lucide-react';
import logo from '../../assets/img/logo.png';

import Projects from './Components/Projects';
import Technologies from './Components/Technologies';

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const experiences = [
    {
      company: "TechCorp Solutions",
      position: "Senior Full Stack Developer",
      startDate: "2022",
      endDate: "Actual",
      description: "Liderazgo técnico en desarrollo de aplicaciones empresariales escalables",
      certificate: "https://verify.techcorp.com/cert/123",
      logo: "https://ui-avatars.com/api/?name=TechCorp&background=0a0a0a&color=fff&size=64"
    },
    {
      company: "StartupHub Inc",
      position: "Full Stack Developer",
      startDate: "2020",
      endDate: "2022",
      description: "Desarrollo de MVP y productos digitales para startups tecnológicas",
      certificate: "https://verify.startuphub.com/cert/456",
      logo: "https://ui-avatars.com/api/?name=StartupHub&background=0a0a0a&color=fff&size=64"
    },
    {
      company: "Digital Agency Pro",
      position: "Frontend Developer",
      startDate: "2018",
      endDate: "2020",
      description: "Creación de interfaces web responsive y aplicaciones React modernas",
      certificate: "https://verify.digitalagency.com/cert/789",
      logo: "https://ui-avatars.com/api/?name=Digital+Agency&background=0a0a0a&color=fff&size=64"
    }
  ];

return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .05) 75%, rgba(0, 0, 0, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .05) 75%, rgba(0, 0, 0, .05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 flex justify-center">
            <img src={logo} alt="ThonyMarckDev" className="h-20 w-auto" />
          </div>

          <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-tight">
            ANTHONY MARCK
          </h1>
          <h2 className="text-3xl md:text-5xl font-light mb-8 text-gray-600">
            Full Stack Developer
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Creando experiencias digitales excepcionales con código limpio y arquitecturas escalables
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 font-medium"
            >
              Ver Proyectos
            </button>
            <a
              href="/cv-thonymarck.pdf"
              download
              className="px-8 py-4 border border-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 font-medium inline-flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Descargar CV
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            <a href="https://github.com/ThonyMarckDev" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
              <Github size={28} className="hover:opacity-60" />
            </a>
            <a href="https://linkedin.com/in/thonymarckdev" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
              <Linkedin size={28} className="hover:opacity-60" />
            </a>
            <a href="mailto:thonymarckdev@gmail.com" className="hover:scale-110 transition-transform duration-300">
              <Mail size={28} className="hover:opacity-60" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-black to-transparent"></div>
        </div>
      </section>


      <Projects />

      <Technologies />

      {/* Experience Section */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm font-medium tracking-widest text-gray-400 block mb-2">04</span>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-4">Experiencia</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Trayectoria profesional en desarrollo de software
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-8 hover:border-black transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img src={exp.logo} alt={exp.company} className="w-16 h-16 rounded" />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-medium mb-1">{exp.position}</h3>
                        <p className="text-lg text-gray-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 md:mt-0">
                        <Calendar size={16} />
                        <span>{exp.startDate} - {exp.endDate}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{exp.description}</p>
                    
                    <a
                      href={exp.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all duration-300"
                    >
                      <Award size={16} />
                      Ver Certificado
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className="text-sm font-medium tracking-widest text-gray-400 block mb-2">05</span>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-4">Contacto</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              ¿Tienes un proyecto en mente? Hablemos y hagamos realidad tu idea
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-6 py-4 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-6 py-4 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
              />
            </div>
            
            <input
              type="text"
              placeholder="Asunto"
              className="w-full px-6 py-4 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
            />
            
            <textarea
              placeholder="Cuéntame sobre tu proyecto..."
              rows="8"
              className="w-full px-6 py-4 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 resize-none"
            ></textarea>
            
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 font-medium"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © 2026 ThonyMarckDev. Crafted with precision and passion.
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/ThonyMarckDev" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gray-600 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/thonymarckdev" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gray-600 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:thonymarck@gmail.com" className="text-sm hover:text-gray-600 transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;