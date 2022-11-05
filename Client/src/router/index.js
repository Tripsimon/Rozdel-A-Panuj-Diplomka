import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharacterCreationPage from '../components/pages/TvorbaDobrodruhaPage.vue';
import RegistracePage from '../components/pages/RegistracePage.vue'
import PrihlaseniPage from '../components/pages/PrihlaseniPage.vue'
import LandingPage from '../components/pages/LandingPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing Page',
      component: LandingPage
    },
    {
      path: '/registrace',
      name: 'Registrace',
      component: RegistracePage
    },
    {
      path: '/prihlaseni',
      name: 'Prihlaseni',
      component: PrihlaseniPage
    },
    {
      path:'/tvorba-dobrodruha',
      name:'Character Creation Page',
      component: CharacterCreationPage
    }
  ]
})

export default router
