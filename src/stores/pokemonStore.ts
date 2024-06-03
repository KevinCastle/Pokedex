import { defineStore } from 'pinia'
import type {
  Chain,
  EvolutionData,
  Pokemon,
  PokemonSummary,
  SpeciesResponse,
  Stat
} from '@/types/PokeApiResponse'
import {
  getEvolutionChain,
  getPokemonById,
  getPokemonSpeciesById,
  getPokemonSpeciesByUrl
} from '@/api/pokeApi'

export const usePokemonStore = defineStore({
  id: 'pokemonStore',
  state: () => ({
    loading: false,
    error: null as string | null,
    pokemonData: {} as Pokemon,
    pokemonSpecies: {} as SpeciesResponse,
    teamPokemon: [] as Pokemon[],
    evolutionChain: [] as EvolutionData[]
  }),
  actions: {
    async setTeamData(team: PokemonSummary[]) {
      try {
        this.error = null
        this.loading = true
        if (this.teamPokemon.length > 0) this.teamPokemon = []
        await Promise.all(
          team.map(async (pokemon) => {
            const pokemonData = await getPokemonById(pokemon.id)
            this.teamPokemon.push(pokemonData)
          })
        )
      } catch {
        this.error = 'No hay datos de equipo'
      } finally {
        this.loading = false
      }
    },
    async getPokemonById(pokemonId: number) {
      try {
        this.error = null
        this.loading = true
        const pokemonData = await getPokemonById(pokemonId)
        this.pokemonData = pokemonData
      } catch {
        this.error = 'No se pudo cargar el pokemon :('
      } finally {
        this.loading = false
      }
    },

    async getPokemonSpecies(pokemonId: number) {
      try {
        this.error = null
        this.loading = true
        const pokemonSpecies = await getPokemonSpeciesById(pokemonId)
        const evolutionChain = await getEvolutionChain(pokemonSpecies.evolution_chain.url)
        this.evolutionChain = await this.extractEvolutionData(evolutionChain.chain)
        this.pokemonSpecies = pokemonSpecies
      } catch {
        this.error = 'No se pudo cargar la especie pokemon :('
      } finally {
        this.loading = false
      }

      return null // Add this line to return a value at the end of the method
    },

    async extractEvolutionData(chain: Chain): Promise<EvolutionData[]> {
      const speciesArray: EvolutionData[] = []

      async function nextSpecies(internalChain: Chain) {
        if (internalChain.species) {
          const pokemonResponse = await getPokemonSpeciesByUrl(internalChain.species.url)
          const species = {
            id: pokemonResponse.id,
            description: pokemonResponse.flavor_text_entries[0].flavor_text,
            name: pokemonResponse.name
          }
          speciesArray.push(species)
        }

        if (internalChain.evolves_to.length > 0) {
          await Promise.all(internalChain.evolves_to.map(nextSpecies))
        }
      }

      await nextSpecies(chain)

      return speciesArray
    },
    async getEvolutionChain(url: string) {
      try {
        this.error = null
        this.loading = true
        const evolutionChain = await getEvolutionChain(url)
        this.evolutionChain = await this.extractEvolutionData(evolutionChain.chain)
      } catch {
        this.error = 'No se pudo cargar la linea evolutiva :('
      } finally {
        this.loading = false
      }
    },
    handleStats(stats: Stat[]) {
      return stats.map((stat) => {
        return stat.base_stat
      })
    }
  }
})

export default { usePokemonStore }
