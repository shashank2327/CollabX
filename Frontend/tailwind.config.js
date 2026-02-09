/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], // Keep the modern font
      },
      colors: {
        // The "Graphite" Palette
        brand: {
          black: '#09090B',       // Main Background (Almost black)
          graphite: '#18181B',    // Card Backgrounds (Zinc 900)
          border: '#27272A',      // Borders (Zinc 800)
          text: '#E4E4E7',        // Main Text (Zinc 200)
          muted: '#A1A1AA',       // Secondary Text (Zinc 400)
          
          // The "Orange Energy"
          primary: '#F97316',     // Orange 500
          glow: '#FB923C',        // Orange 400
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #F97316 0%, #DC2626 100%)', // Orange to Red
        'glass-gradient': 'linear-gradient(180deg, rgba(24, 24, 27, 0.8) 0%, rgba(24, 24, 27, 0.4) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(249, 115, 22, 0.3)', // Orange glow
      }
    },
  },
  plugins: [],
}

