/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a', // Azul pizarra muy oscuro (Slate-900)
          hover: '#1e293b',   // Slate-800
          light: '#f1f5f9',   // Slate-100
        },
        secondary: {
          DEFAULT: '#ffffff',
          text: '#475569',    // Slate-600
          muted: '#94a3b8',   // Slate-400
        }
      },
    }
  },
  plugins: [],
}