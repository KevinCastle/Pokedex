import axios from 'axios'
import type {
  PokeApiResponse,
  PokedexResponse,
  Pokemon,
  PokemonSummary
} from '@/types/PokeApiResponse'

const url = 'https://pokeapi.co/api/v2/pokemon/'

export default async function getPokeApiList(offset = 0, limit = 25): Promise<PokeApiResponse> {
  const response = await axios.get<PokeApiResponse>(`${url}?offset=${offset}&limit=${limit}`)
  return response.data
}

export async function getPokedexList(offset = 0, limit = 25): Promise<PokedexResponse> {
  try {
    const response = await axios.get<PokeApiResponse>(`${url}?offset=${offset}&limit=${limit}`)

    const results: PokemonSummary[] = await Promise.all(
      response.data.results.map(async (pokemon) => {
        try {
          const pokemonResponse = await axios.get<Pokemon>(pokemon.url)
          return {
            name: pokemonResponse.data.name,
            id: pokemonResponse.data.id,
            art:
              pokemonResponse.data.sprites.other?.['official-artwork'].front_default ?? undefined,
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
