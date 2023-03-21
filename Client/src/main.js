import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {loadFonts} from './plugins/webfontloader'
import axios from "axios";

let app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

loadFonts()

// Konstanty


const devMode = true
if(devMode){
  axios.defaults.baseURL ='http://localhost:3000'
}else{
  axios.defaults.baseURL = 'https://api.rozdel-a-panuj.cz'
}

app.use(router).use(vuetify).use(pinia).mount('#app')
