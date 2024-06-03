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
      component: PokemonDetailsView,
      beforeEnter: (to, from, next) => {
        const id = Number(to.params.id)
        if (Number.isNaN(id)) {
          next('/team')
        } else {
          next()
        }
      }
    }
  ]
})

export default router
