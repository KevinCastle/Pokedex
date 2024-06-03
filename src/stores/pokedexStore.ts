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
    team: [] as PokemonSummary[],
    error: null as string | null
  }),
  actions: {
    async getPokedexData(quantity: number) {
      try {
        this.error = null
        this.loading = true
        const pokemonList = await getPokedexList(this.counter, quantity)
        this.pokedex.pokemons = [...this.pokedex.pokemons, ...pokemonList.pokemons]
      } catch {
        this.error = 'No se pudo cargar la pokedex :('
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
      this.error = null
      if (this.team.length >= 6) {
        this.error = 'You can only have 6 Pokemon in your team!'
      }
      this.team.push(pokemon)
      localStorage.setItem('team', JSON.stringify(this.team))
    },
    removePokemonFromTeam(id: number) {
      if (this.team.length <= 0) return
      const memberPosition = this.team.findIndex((member) => member.id === id)
      this.team.splice(memberPosition, 1)
      localStorage.setItem('team', JSON.stringify(this.team))
    }
  }
})

export default { usePokedexStore }
