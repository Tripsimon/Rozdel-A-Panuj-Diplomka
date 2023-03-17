import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { loadFonts } from './plugins/webfontloader'
import axios from "axios";

let app=createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

loadFonts()

//Konstanty

axios.defaults.baseURL = 'http://46.36.40.226:50102'

app.provide('configFile',{
  backendAdress:'http://46.36.40.226:50102'
})

app.provide('gvRaces',{
  names:['Anhilarský člověk', 'Grobr', 'Hruurský člověk','Ork','Inu-Im'],
    'Anhilarský člověk':{
    name:'Anhilarský člověk',
    description: "Lidé zrozeni v říši pojmenované podle východního Anhilar. Zdejší obyvatelé jsou vynalézavý lidé, kteří se jen tak nezaleknou jakékoliv překážky.",
    bonusStats:{
      sila: 1,
      charisma: +1,
      intelifence: +1,
    },
    bonusAbilities:['63cc4bdf61646806b6b8fae8','63cc4caa61646806b6b8fae9'],
    avaliableClasses:['Bojovník','Kněz','Lupič']
  },
  'Grobr':{
    name:'Grobr',
    description: "Hrdý lid žijící zejmémna v hlubinách pod východním pohořím Anhilaru vyniká ve své podnikavosti stejně jako tvrdohlavosti",
    bonusStats:{
      houzevnatost: 1,
      znalost: +1,
      sila: +1,
    },
    bonusAbilities:[
      {
        name:'Prastaré dedictví',
        description:'Pradávná tradice a tajemství předků umožnuje Grobrům využívat jejich prestižní runovou výbavu',
        effect: 'Dovolí Dobrodruhovy nosit runovou výbavu' ,
        abilityId: 69
      },{
        name:'železná krev',
        description:'Po letech v podzemí zhoustla Grobrská krev stejně jako jejich nátura',
        effect:'Dovolí dobrodruhovy přehodit kostku záchrany',
        abilityId: 70,
      }
    ],
    avaliableClasses:["Bojovník",'Kněz','Kolos']
  },
  'Hruurský člověk':{
    name:'Hruurský člověk',
    description:'Ostatními nazívaní barbaři, Hruurové jsou tradicionalistický lid bohatý ve svých tradicích, pověrách a kodu cti',
    bonusStats:{
      znalost: +2,
      sila: +1,
    },
    bonusAbilities:[
      {
        name:'Dary země',
        description:' Díky své bujné historii a spojení s přírodou jsou Hruurští lidé schopni využíat lépe biliny a rostliny',
        effect: 'Tato postava lépe pracuje s rostlinamy bilinamy a výrobkami z nich ' ,
        abilityId: 69
      },{
        name:'Nedoplneno',
        description:'Nedoplneno',
        effect:'Nedoplneno',
        abilityId: 70,
      }
    ],
    avaliableClasses:["Bojovník",'Kněz','Kolos']
  },
  'Ork':{
    name:'Ork',
    description:'Ostatními nazívaní barbaři, Hruurové jsou tradicionalistický lid bohatý ve svých tradicích, pověrách a kodu cti',
    bonusStats:{
      znalost: +2,
      sila: +1,
    },
    bonusAbilities:[
      {
        name:'Dary země',
        description:' Díky své bujné historii a spojení s přírodou jsou Hruurští lidé schopni využíat lépe biliny a rostliny',
        effect: 'Tato postava lépe pracuje s rostlinamy bilinamy a výrobkami z nich ' ,
        abilityId: 69
      },{
        name:'Nedoplneno',
        description:'Nedoplneno',
        effect:'Nedoplneno',
        abilityId: 70,
      }
    ],
    avaliableClasses:["Bojovník",'Kněz','Kolos']
  },
  'Inu-Im':{
    name:'Inu-Im',
    description:'Ostatními nazívaní barbaři, Hruurové jsou tradicionalistický lid bohatý ve svých tradicích, pověrách a kodu cti',
    bonusStats:{
      znalost: +2,
      sila: +1,
    },
    bonusAbilities:[
      {
        name:'Dary země',
        description:' Díky své bujné historii a spojení s přírodou jsou Hruurští lidé schopni využíat lépe biliny a rostliny',
        effect: 'Tato postava lépe pracuje s rostlinamy bilinamy a výrobkami z nich ' ,
        abilityId: 69
      },{
        name:'Nedoplneno',
        description:'Nedoplneno',
        effect:'Nedoplneno',
        abilityId: 70,
      }
    ],
    avaliableClasses:["Bojovník",'Kněz','Kolos']
  }
});

app.provide('gvClasses',{
  names:['Bojovník','Kněz','Lupič','Kolos','šaman','Hraničář',"Berzerk",'Mág','Vizír'],
  
  'Bojovník':{
    name:'Bojovník',
    description: 'Hrdý válečník',
    passive: "Tohle neco dela",
    abilities: [
    ],
    mainGear:['63c723d7b1f3a96286014792'],
    secondaryGear:["63cd4164590a36f414778487"],
    bonusGear:['63cd418a590a36f41477848b'],
  },
  'Kněz':{
    name:'Kněz'
  },
  'lupic':{
    name:'Lupič'
  },
  'kolos':{
    name:'Kolos',
  },
  'saman':{
    name:'šaman'
  },
  'hranicar':{
    name:'Hraničář'
  },
  'berzerk':{
    name:"Berzerk"
  },
  'mag':{
    name:'Mág'
  },
  'vizir':{
    name:'Vizír'
  }

});
  app.use(router)
  .use(vuetify)
  .use(pinia).mount('#app')
