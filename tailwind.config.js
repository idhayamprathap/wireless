/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#050811',
          900: '#0a0f1d',
          850: '#0e1629',
          800: '#131f38',
          750: '#172747',
          700: '#1c2d52',
          600: '#2b4478',
        },
        neon: {
          cyan: '#00f2fe',
          teal: '#14b8a6',
          orange: '#f97316',
          amber: '#f59e0b',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          green: '#10b981',
          rose: '#f43f5e'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
        tech: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -2px rgba(0, 242, 254, 0.35)',
        'glow-cyan-sm': '0 0 10px -1px rgba(0, 242, 254, 0.25)',
        'glow-teal': '0 0 20px -2px rgba(20, 184, 166, 0.35)',
        'glow-orange': '0 0 20px -2px rgba(249, 115, 22, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'signal-wave': 'wave 2s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
