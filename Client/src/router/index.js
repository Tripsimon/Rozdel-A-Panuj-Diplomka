import { createRouter, createWebHistory } from 'vue-router'
import CharacterCreationPage from '../components/pages/TvorbaDobrodruhaPage.vue';
import RegistracePage from '../components/pages/RegistracePage.vue'
import PrihlaseniPage from '../components/pages/PrihlaseniPage.vue'
import LandingPage from '../components/pages/LandingPage.vue'
import ZalozeniHryPage from '../components/pages/ZalozeniHryPage.vue'
import PripojeniDoHryPage from '../components/pages/PripojeniDoHryPage.vue'
import GamePage from '../components/pages/GamePage.vue'
import SpravaPozadiPage from '../components/pages/SpravaPozadiPage.vue'
import spravaVybavy from '../components/pages/SpravaVybavyPage.vue'
import spravaNepratel from  '../components/pages/SpravaNepratelPage.vue'
import pravidlaPage from '../components/pages/PravidlaPage.vue'

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
    {
      path:'/sprava-vybavy',
      name:'spravaVybavy',
      component: spravaVybavy
    },
    {
      path:'/sprava-nepratel',
      name:'spravaNepratel',
      component: spravaNepratel
    },
    {
      path:'/pravidla',
      name:'pravidla',
      component: pravidlaPage
    },
  ]
})

export default router
