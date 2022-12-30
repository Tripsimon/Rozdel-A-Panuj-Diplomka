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
  names:['Anhilarský člověk', 'Grobr', 'Hruurský člověk','Ork','Inu-im'],
  'Anhilarský člověk':{
    name:'Anhilarský člověk',
    description: "Lidé zrozeni v říši pojmenované podle východního Anhilar. Zdejší obyvatelé jsou vynalézavý lidé, kteří se jen tak nezaleknou jakékoliv překážky.",
    bonusStats:{
      sila: 1,
      charisma: +1,
      intelifence: +1,
    },
    bonusAbilities:[
      {
        name:'Hlas císaře',
        description:'Anhilarští lidé jsou rození vůdci a jsou schopni svojí odhodlanost převést na své spolubojovníky podobou ocelového hlasu a nezlomného vůdcovství.',
        effect: 'Jednou za krátký odpočinek můžeš okolnímu dobrodruhy rozkázat přehození jedné kostky.' ,
        abilityId: 69
      },{
        name:'Imperiální konexe',
        description:'Jedině díky semnuté mentalitě a komunální práci se podařilo Anhilarské říši obstát příliv zla který pohltil celí kontinent. V jednotě síla.',
        effect:'Ostatní Anhilarští jsou ti více nápomocni',
        abilityId: 70,
      }
    ],
    avaliableClasses:['Bojovník','Kněz','Lupič']
  },
  'Grobr':{
    name:'Grobr',
    description: "Nejakej trpaslík asi",
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
        name:'Imperiální konexe',
        description:'Jedině díky semnuté mentalitě a komunální práci se podařilo Anhilarské říši obstát příliv zla který pohltil celí kontinent. V jednotě síla.',
        effect:'Ostatní Anhilarští jsou ti více nápomocni',
        abilityId: 70,
      }
    ],
    avaliableClasses:["Legionář",'Kněz']
  },
  
});

app.provide('gvClasses',{
  names:['Bojovník','Kněz','Lupič','Kolos','šaman','Hraničář',"Berzerk",'Mág','Vizír'],
  'Bojovník':{
    name:'Bojovník',
    description: 'Hrdý válečník',
    passive: "Tohle neco dela",
    abilities: [
      "odkaz na ability"
    ],
    mainGear:["Jednoruční meč", "Jednoruční sekera", "Kopí"],
    secondaryGear:["Jednoduchí dřevěný štít", "Malá díka"],
    bonusGear:["Lucerna","Provaz"],
  },
  'Kněz':{
    name:'Kněz'
  },
  lupic:{
    name:'Lupič'
  },
  kolos:{
    name:'Kolos',
  },
  saman:{
    name:'šaman'
  },
  hranicar:{
    name:'Hraničář'
  },
  berzerk:{
    name:"Berzerk"
  },
  mag:{
    name:'Mág'
  },
  vizir:{
    name:'Vizír'
  }

});
  app.use(router)
  .use(vuetify)
  .use(pinia).mount('#app')
