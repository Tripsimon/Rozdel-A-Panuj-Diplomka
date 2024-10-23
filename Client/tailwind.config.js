/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#001d3d',
        'secondary': "#b49306",
        'secondary-100': "#d1ff00",
        'backdrop': "#121212"
      },
      fontSize: {
        '10xl': '12rem',
        '11xl': '14rem'
      },
      fontFamily: {
        'catchy-mager': ["Catchy Mager"],
        'dm': ["DM", 'sans-serif'],
        'coco-gothic': ["Coco Gothic"],
        'lovelo': ["Lovelo"]
      },
      boxShadow: {
        'innerColor': '0 0 0px 1000px #B49E87 inset',
      },
    }

  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'dark', 'cupcake']
  }

}