/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Authentic Logo Green Spectrum
          'green-deep': '#0E1D0A',
          'green-dark': '#183313',
          'green-forest': '#22431A',
          green: '#3B6324',
          'green-leaf': '#528328',
          'green-bright': '#689B24',
          'green-light': '#84BD3A',
          'green-tint': '#F0F6EB',

          // Authentic Logo Amber & Warm Gold Spectrum
          amber: '#EC973C',
          'amber-dark': '#C9741D',
          'amber-light': '#F5BA6A',
          'amber-pale': '#FDE8BD',
          'amber-tint': '#FDF7EE',

          // Neutrals & Base Colors
          cream: '#FDFBF7',
          stone: '#F5F1EA',
          charcoal: '#1F1D1D',
          'charcoal-light': '#2A2727',
          'charcoal-card': '#252222',

          // Semantic Brand Accents mapped to Logo Palette
          terracotta: '#EC973C',
          'terracotta-dark': '#C9741D',
          'terracotta-light': '#F5BA6A',
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          'gold-dark': '#AA8C2C',
          sage: '#3B6324',
          'sage-dark': '#183313',
          'sage-light': '#528328',
          border: '#E8E2D8',
          'border-dark': '#2B3D26',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(31, 29, 29, 0.08), 0 0 1px 1px rgba(236, 151, 60, 0.15)',
        'luxury-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.4), 0 0 1px 1px rgba(236, 151, 60, 0.25)',
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.35)',
        'amber-glow': '0 0 25px -5px rgba(236, 151, 60, 0.45)',
        'green-glow': '0 0 25px -5px rgba(104, 155, 36, 0.4)',
        'terracotta-glow': '0 0 25px -5px rgba(236, 151, 60, 0.35)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #EC973C 0%, #F5BA6A 50%, #C9741D 100%)',
        'terracotta-gradient': 'linear-gradient(135deg, #EC973C 0%, #F5BA6A 100%)',
        'amber-gradient': 'linear-gradient(135deg, #EC973C 0%, #F5BA6A 100%)',
        'hero-green': 'radial-gradient(circle at 80% 20%, rgba(236, 151, 60, 0.15) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(104, 155, 36, 0.2) 0%, transparent 50%), linear-gradient(145deg, #152E11 0%, #22431A 50%, #0F200C 100%)',
        'hero-gradient': 'radial-gradient(circle at 80% 20%, rgba(236, 151, 60, 0.15) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(104, 155, 36, 0.2) 0%, transparent 50%), linear-gradient(145deg, #152E11 0%, #22431A 50%, #0F200C 100%)',
      }
    },
  },
  plugins: [],
}
