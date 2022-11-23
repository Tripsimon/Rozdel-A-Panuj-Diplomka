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

app.provide('gvRaces',{
  names:['Anhilarský člověk', 'Maanský člověk', 'Grobr', 'Inu-im'],
  'Anhilarský člověk':{
    name:'Anhilarský člověk',
    description: "Lidézrozeni v anhilarské říši",
    bonusStats:{
      sila: +1,
      charisma: +1,
      intelifence: +1,
    },
    bonusAbilities:[
      {
        name:'Hlas císaře',
        desciption:'Tento jedinec je schopný využít svého vrozeného hlasu k rozkazu a tak',
        abilityId: 69
      }
    ],
    recomendedClasses:["Bojovník"]
  }
});

app.provide('gvClasses',{
  names:['Kolos', 'Harcovník', 'Hraničář', 'Lupič', 'Čaroděj', 'Vizír'],
  kolos:{
    name:'Kolos',
    
  }
});
  app.use(router)
  .use(vuetify)
  .use(pinia).mount('#app')
