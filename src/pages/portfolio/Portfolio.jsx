import React from 'react';

import Hero from './Components/Hero';
import Projects from './Components/Projects';
import Technologies from './Components/Technologies';
import Experiences from './Components/Experiences';

const Portfolio = () => {

  return (
    <div className="min-h-screen bg-white text-black">
      
      {/* Hero Section */}
      <Hero />

      {/* Proyectos */}
      <Projects />

      {/* Tecnologías */}
      <Technologies />

      {/* Experiencia */}
      <Experiences />

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
            <a href="https://www.linkedin.com/in/anthony-mendoza-a7a1aa311" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gray-600 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:thonymarckdev@gmail.com" className="text-sm hover:text-gray-600 transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;