/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.{js,ts}",
    "./components/**/*.{js,ts,vue}",
    "./layouts/**/*.{js,ts,vue}",
    "./pages/**/*.{js,ts,vue}",
    "./app.vue",
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
      },
      boxShadow: {
        neon: '0 0 5px #00ffff, 0 0 10px #00ffff',
        cyber: '0 0 10px #ff00ff, 0 0 20px #00ffff',
      },
      fontFamily: {
        cyber: ['Orbitron', 'sans-serif'],
      },
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
          ...require("daisyui/src/colors/themes")["[data-theme=cupcake]"],
          primary: "#00ffff",
          secondary: "#ff00ff",
          accent: "#9b59b6",
          neutral: "#0d0d0d",
          "base-100": "#0f0f1a",
        }
      }
    ]
  }
}
