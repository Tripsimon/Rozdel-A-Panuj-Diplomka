import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharacterCreationPage from '../components/pages/TvorbaDobrodruhaPage.vue';
import SpravaUzivatelePage from '../components/pages/SpravaUzivatelePage.vue'
import RegistracePage from '../components/pages/RegistracePage.vue'
import PrihlaseniPage from '../components/pages/PrihlaseniPage.vue'
import LandingPage from '../components/pages/LandingPage.vue'
import ZalozeniHryPage from '../components/pages/ZalozeniHryPage.vue'
import PripojeniDoHryPage from '../components/pages/PripojeniDoHryPage.vue'
import GamePage from '../components/pages/GamePage.vue'
import SpravaPozadiPage from '../components/pages/SpravaPozadiPage.vue'


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
    },
    {
      path:'/sprava-uctu',
      name:'Sprava Uctu',
      component: SpravaUzivatelePage
    },
    {
      path:'/vypis-dobrodruhu',
      name:'Vypis dobrodruha',
      component: CharacterCreationPage
    },
    {
      path:'/zalozeni-hry',
      name:'Založení hry',
      component: ZalozeniHryPage
    },
    {
      path:'/pripojeni-do-hry',
      name:'Připojení do hry',
      component: PripojeniDoHryPage
    },
    {
      path:'/RaPSession',
      name:'In-Game',
      component: GamePage
    },
    {
      path:'/sprava-pozadi',
      name:'spravaPozadi',
      component: SpravaPozadiPage
    },
  ]
})

export default router
