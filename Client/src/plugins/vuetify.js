// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'



// Vuetify
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'



export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        variables: {}, 

        colors: {
          primary: '#001d3d',
          secondary: '#cca000',
          accent: '#003566',
          error: '#f44336',
          warning: '#ff9800',
          info: '#795548',
          success: '#4caf50'
          },
      },
    },
  },
});
