import React from 'react';

import Hero from './Components/Hero';
import Projects from './Components/Projects';
import Technologies from './Components/Technologies';
import Experiences from './Components/Experiences';
import Contact from './Components/Contact';

const Portfolio = () => {

  return (
    <div className="min-h-screen bg-white text-black">
      
      {/* 1. Hero */}
      <Hero />

      {/* 2. Proyectos */}
      <Projects />

      {/* 3. Tecnologías */}
      <Technologies />

      {/* 4. Experiencia */}
      <Experiences />

      {/* 5. Contacto */}
      <Contact />

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