/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'ochre':"#FAEDDD",
        'ochredark':"#D3C5B0",
        "fadeochre":"#9A8261",
        "darkbrown":"#312E2A",
        "fadebrown":"#7A756E",
      },
      fontFamily: {
        opensans:['Open Sans']
      },
    },
    screens: {
      'es': '360px',
      'ls': '688px',
    }
  },
  plugins: [],
}
