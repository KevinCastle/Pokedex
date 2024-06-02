import { defineStore } from 'pinia'
import type { PokedexResponse, PokemonSummary } from '@/types/PokeApiResponse'
import { getPokedexList } from '@/api/pokeApi'

export const usePokedexStore = defineStore({
  id: 'pokedexStore',
  state: () => ({
    pokedex: {
      pokemons: [] as PokemonSummary[]
    } as PokedexResponse
  }),
  actions: {
    async getPokedexData() {
      try {
        this.pokedex = await getPokedexList(0, 150)
        console.log(this.pokedex)
      } catch (error) {
        console.error(error)
        // handle the error appropriately
      }
    }
  }
})

export default { usePokedexStore }
