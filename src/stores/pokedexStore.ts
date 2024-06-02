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
    } as PokedexResponse,
    team: [] as PokemonSummary[]
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
    },
    getPokemonTeam() {
      const storedTeam = localStorage.getItem('team')
      if (storedTeam) this.team = JSON.parse(storedTeam)
      return this.team
    },
    addPokemonToTeam(pokemon: PokemonSummary) {
      if (this.team.length >= 6) return
      this.team.push(pokemon)
      localStorage.setItem('team', JSON.stringify(this.team))
    },
    removePokemonFromTeam(pokemon: PokemonSummary) {
      if (this.team.length <= 0) return
      const memberPosition = this.team.findIndex((member) => member.id === pokemon.id)
      this.team.splice(memberPosition, 1)
      localStorage.setItem('team', JSON.stringify(this.team))
    }
  },
  getters: {
    getPokemonById: () => {
      // return this.pokedex.pokemons.find((pokemon) => pokemon.id === id)
    }
  }
})

export default { usePokedexStore }
