/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.html'],
  theme: {
    extend: {
      backgroundImage:{
        toggleOn: "url('./assets/img/orderList/Check.png') no-repeat -4px -4px/100%"
      },
      colors: {
        /* Colors */
        black: '#000000',
        secondary: '#bd76ff',
        white: ' #ffffff',
        primary: '#5f0080',
        content: '#333333',
        gray50: '#f9f9f9',
        gray100: '#e1e1e1',
        gray200: '#c4c4c4',
        gray300: '#a6a6a6',
        gray400: '#898989',
        gray500: '#6b6b6b',
        gray600: '#565656',
        gray700: '#404040',
        gray800: '#2b2b2b',
        gray900: '#151515',
        accentOrange: '#fa622f',
        blue100: '#cce0ff',
        blue200: '#99c2ff',
        blue300: '#66a3ff',
        blue400: '#3385ff',
        blue500: '#0066ff',
        blue600: '#0052cc',
        blue700: '#003d99',
        blue800: '#002966',
        blue900: '#001433',
        infoError: '#f03f40',
      },
    },
  },
  plugins: [],
};