import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const email = "thonymarckdev@gmail.com";
    const subject = encodeURIComponent(`${formData.asunto} - Contacto de ${formData.nombre}`);
    const body = encodeURIComponent(`Hola Anthony,\n\nSoy ${formData.nombre}.\n\n${formData.mensaje}`);
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="text-sm font-medium tracking-widest text-gray-400 block mb-2">05</span>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-4">Contacto</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            ¿Tienes un proyecto en mente? Hablemos y hagamos realidad tu idea.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="w-full px-6 py-4 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 rounded-sm"
            />
            <input
              type="email"
              placeholder="Email (opcional)"
              className="w-full px-6 py-4 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 rounded-sm"
            />
          </div>
          
          <input
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            placeholder="Asunto"
            required
            className="w-full px-6 py-4 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 rounded-sm"
          />
          
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Cuéntame sobre tu proyecto..."
            rows="8"
            required
            className="w-full px-6 py-4 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300 resize-none rounded-sm"
          ></textarea>
          
          <button
            type="submit"
            className="w-full md:w-auto px-12 py-4 bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 font-medium rounded-sm shadow-lg hover:shadow-xl"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;