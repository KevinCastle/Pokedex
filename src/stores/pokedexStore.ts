import { defineStore } from 'pinia'
import type { PokedexResponse, PokemonSummary } from '@/types/PokeApiResponse'
import { getPokedexList } from '@/api/pokeApi'

export const usePokedexStore = defineStore({
  id: 'pokedexStore',
  state: () => ({
    loading: false,
    counter: 0,
    pokedex: {
      pokemons: [] as PokemonSummary[]
    } as PokedexResponse
  }),
  actions: {
    async getPokedexData(quantity: number) {
      try {
        this.loading = true
        const pokemonList = await getPokedexList(this.counter, quantity)
        this.pokedex.pokemons = [...this.pokedex.pokemons, ...pokemonList.pokemons]
      } catch (error) {
        console.error(error)
        // handle the error appropriately
      } finally {
        this.counter += quantity
        this.loading = false
      }
    }
  }
})

export default { usePokedexStore }
