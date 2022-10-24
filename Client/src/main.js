import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import { loadFonts } from './plugins/webfontloader'

const pinia = createPinia()
loadFonts()


createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app')
