import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import { loadFonts } from './plugins/webfontloader'

let app=createApp(App)

const pinia = createPinia()
loadFonts()

//Konstanty

app.provide('gvRaces',['Anhilarský člověk', 'Maanský člověk', 'Grobr', 'Inu-im']);
app.provide('gvClasses',{
  names:['Kolos', 'Harcovník', 'Hraničář', 'Lupič', 'Čaroděj', 'Vizír'],
  kolos:{
    name:'Kolos',
    
  }
});
  app.use(router)
  .use(vuetify)
  .use(pinia).mount('#app')
