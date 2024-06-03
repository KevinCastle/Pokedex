import axios from 'axios'
import type {
  EvolutionResponse,
  PokeApiResponse,
  PokedexResponse,
  Pokemon,
  PokemonSummary,
  SpeciesResponse
} from '@/types/PokeApiResponse'

const url = 'https://pokeapi.co/api/v2/'

export default async function getPokeApiList(offset = 0, limit = 25): Promise<PokeApiResponse> {
  try {
    const response = await axios.get<PokeApiResponse>(
      `${url}pokemon/?offset=${offset}&limit=${limit}`
    )
    return response.data
  } catch (error) {
    console.error(`Failed to fetch data pokemon list`, error)
    throw error
  }
}

export async function getPokedexList(offset = 0, limit = 25): Promise<PokedexResponse> {
  try {
    const response = await axios.get<PokeApiResponse>(
      `${url}pokemon/?offset=${offset}&limit=${limit}`
    )

    const results: PokemonSummary[] = await Promise.all(
      response.data.results.map(async (pokemon) => {
        try {
          const pokemonResponse = await axios.get<Pokemon>(pokemon.url)
          return {
            name: pokemonResponse.data.name,
            id: pokemonResponse.data.id,
            art:
              pokemonResponse.data.sprites.other?.['official-artwork'].front_default ?? undefined,
            sprite: pokemonResponse.data.sprites.front_default ?? undefined,
            type: pokemonResponse.data.types.find((type) => type.slot === 1)?.type.name
          }
        } catch (error) {
          console.error(`Failed to fetch data for pokemon: ${pokemon.name}`, error)
          throw error
        }
      })
    )

    const pokedexResponse: PokedexResponse = {
      pokemons: results
    }

    return pokedexResponse
  } catch (error) {
    console.error('Failed to fetch pokedex list', error)
    throw error
  }
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  try {
    const response = await axios.get<Pokemon>(`${url}pokemon/${id}`)

    return response.data
  } catch (error) {
    console.error(`Failed to fetch data for pokemon with id: ${id}`, error)
    throw error
  }
}

export async function getEvolutionChain(id: number): Promise<EvolutionResponse> {
  try {
    const response = await axios.get<EvolutionResponse>(`${url}evolution-chain/${id}`)

    return response.data
  } catch (error) {
    console.error(`Failed to fetch data for evolution chain id: ${id}`, error)
    throw error
  }
}

export async function getPokemonSpecies(speciesUrl: string): Promise<SpeciesResponse> {
  try {
    const response = await axios.get<SpeciesResponse>(`${speciesUrl}`)

    return response.data
  } catch (error) {
    console.error(`Failed to fetch data for pokemon species`, error)
    throw error
  }
}
