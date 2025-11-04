import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs principales inspirées de MesDépanneurs.fr
        primary: {
          DEFAULT: '#0A1F44', // Bleu marine foncé (hero)
          foreground: '#ffffff',
          50: '#E8EBF0',
          100: '#C7D0DD',
          200: '#A3B3C9',
          300: '#7F96B5',
          400: '#637FA5',
          500: '#476995',
          600: '#3B5A80',
          700: '#2F496A',
          800: '#223854',
          900: '#0A1F44',
        },
        secondary: {
          DEFAULT: '#6B21FF', // Violet (CTA box urgence)
          foreground: '#ffffff',
          50: '#F3EBFF',
          100: '#E1CCFF',
          200: '#CDAAFF',
          300: '#B988FF',
          400: '#A566FF',
          500: '#9144FF',
          600: '#7D22FF',
          700: '#6B21FF',
          800: '#5600E6',
          900: '#4100B8',
        },
        accent: {
          DEFAULT: '#FFE500', // Jaune vif (CTA principal)
          foreground: '#0A1F44',
          50: '#FFFEF0',
          100: '#FFFBD6',
          200: '#FFF8AD',
          300: '#FFF584',
          400: '#FFF25B',
          500: '#FFEF32',
          600: '#FFE500',
          700: '#E6CF00',
          800: '#CDB900',
          900: '#B3A300',
        },
        success: {
          DEFAULT: '#00B67A', // Vert Trustpilot
          foreground: '#ffffff',
          50: '#E5F9F1',
          100: '#B8EFDA',
          200: '#8AE5C3',
          300: '#5CDBAC',
          400: '#2ED195',
          500: '#00C77E',
          600: '#00B67A',
          700: '#009D68',
          800: '#008556',
          900: '#006C44',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
