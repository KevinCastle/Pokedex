import { createRouter, createWebHistory } from 'vue-router'
import PokedexView from '../views/PokedexView.vue'
import TeamView from '../views/TeamView.vue'
import PokemonDetailsView from '../views/PokemonDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokedexView
    },
    {
      path: '/team',
      name: 'team',
      component: TeamView
    },
    {
      path: '/team/:id',
      name: 'Pokemon details',
      component: PokemonDetailsView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
