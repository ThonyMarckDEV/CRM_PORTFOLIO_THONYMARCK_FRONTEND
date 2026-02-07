import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, ExternalLink, ChevronLeft, ChevronRight, Download, MapPin, Calendar, Award } from 'lucide-react';
import logo from 'components/Shared/assets/img/';

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Plataforma completa de comercio electrónico con gestión de inventario, carrito y pasarela de pagos",
      images: [
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
      ],
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind"],
      github: "https://github.com/ThonyMarckDev/ecommerce",
      live: "https://demo.thonymarck.dev"
    },
    {
      title: "Task Management System",
      description: "Sistema de gestión de tareas con equipos, prioridades y notificaciones en tiempo real",
      images: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
      ],
      tech: ["Vue.js", "Firebase", "Vuex", "Sass"],
      github: "https://github.com/ThonyMarckDev/task-manager",
      live: "https://tasks.thonymarck.dev"
    },
    {
      title: "Mobile Banking App",
      description: "Aplicación bancaria móvil con transferencias, pagos y gestión de cuentas",
      images: [
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop"
      ],
      tech: ["React Native", "TypeScript", "Redux", "Firebase"],
      github: "https://github.com/ThonyMarckDev/banking-app",
      live: null
    },
    {
      title: "Analytics Dashboard",
      description: "Dashboard interactivo para visualización de datos empresariales con gráficos en tiempo real",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      ],
      tech: ["Next.js", "D3.js", "PostgreSQL", "Python"],
      github: "https://github.com/ThonyMarckDev/analytics",
      live: "https://analytics.thonymarck.dev"
    },
    {
      title: "Social Media Platform",
      description: "Red social con posts, mensajería en tiempo real y sistema de notificaciones",
      images: [
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop"
      ],
      tech: ["React", "Socket.io", "Express", "MySQL"],
      github: "https://github.com/ThonyMarckDev/social-app",
      live: null
    },
    {
      title: "Real Estate Portal",
      description: "Portal inmobiliario con búsqueda avanzada, mapas interactivos y tours virtuales",
      images: [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop"
      ],
      tech: ["Angular", "Mapbox", "Django", "AWS"],
      github: "https://github.com/ThonyMarckDev/real-estate",
      live: "https://realestate.thonymarck.dev"
    }
  ];

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

  const technologies = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "TypeScript", icon: "🔷" },
    { name: "Next.js", icon: "▲" },
    { name: "Vue.js", icon: "💚" },
    { name: "Angular", icon: "🅰️" },
    { name: "React Native", icon: "📱" },
    { name: "MongoDB", icon: "🍃" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MySQL", icon: "🐬" },
    { name: "Firebase", icon: "🔥" },
    { name: "Docker", icon: "🐳" },
    { name: "AWS", icon: "☁️" },
    { name: "Git", icon: "📦" },
    { name: "Python", icon: "🐍" },
    { name: "Express", icon: "🚂" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Redux", icon: "🔄" }
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
          {/* Logo */}
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

          {/* CTA Buttons */}
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

          {/* Social Links */}
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-black to-transparent"></div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm font-medium tracking-widest text-gray-400 block mb-2">02</span>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-4">Proyectos Destacados</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Una selección de proyectos que demuestran mi experiencia en diferentes tecnologías y arquitecturas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm font-medium tracking-widest text-gray-400 block mb-2">03</span>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-4">Tecnologías</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Stack tecnológico con el que trabajo diariamente
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-4 border border-gray-200 hover:border-black transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{tech.icon}</span>
                <span className="text-xs font-medium text-center">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            © 2024 ThonyMarckDev. Crafted with precision and passion.
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

// Project Card Component with Carousel
const ProjectCard = ({ project, index }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div 
      className="bg-white border border-gray-200 overflow-hidden hover:border-black transition-all duration-500 group opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={project.images[currentImage]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Carousel Controls */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentImage ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-medium mb-3">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 border border-gray-300 hover:border-black transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:gap-2 inline-flex items-center gap-1 transition-all duration-300"
          >
            <Github size={16} />
            GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:gap-2 inline-flex items-center gap-1 transition-all duration-300"
            >
              <ExternalLink size={16} />
              Demo
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
