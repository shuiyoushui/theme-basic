/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite/**/*.{js,ts}',
    './components/**/*.{js,ts,vue}',
    './layouts/**/*.{js,ts,vue}',
    './pages/**/*.{js,ts,vue}',
    './app.vue',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: '#00ffff',
        neonPink: '#ff00ff',
        cyberPurple: '#9b59b6',
        deepBlack: '#0d0d0d',
        glassDark: 'rgba(0,0,0,0.6)',
        glassLight: 'rgba(255,255,255,0.1)',
        lightText: '#ffffff',
      },
      boxShadow: {
        neon: '0 0 5px #00ffff, 0 0 10px #00ffff',
        cyber: '0 0 10px #ff00ff, 0 0 20px #00ffff',
      },
      fontFamily: {
        cyber: ['Inter', 'sans-serif'],
        orbitron: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.lightText'),
            fontFamily: theme('fontFamily.cyber'),
            strong: { color: theme('colors.lightText') },
            h1: { color: theme('colors.lightText') },
            h2: { color: theme('colors.lightText') },
            h3: { color: theme('colors.lightText') },
            a: { color: theme('colors.neonBlue') },
            code: { color: theme('colors.neonBlue') },
          },
        },
      }),
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [
      {
        cyberpunk: {
          primary: '#00ffff',
          secondary: '#ff00ff',
          accent: '#9b59b6',
          neutral: '#0d0d0d',
          'base-100': '#0f0f1a',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
}