/* eslint-disable no-use-before-define */

export type PokeApiResponse = {
  count: number
  next: string
  previous: string
  results: PokemonResponse[]
}

export type PokedexResponse = {
  pokemons: PokemonSummary[]
}

export type PokemonSummary = {
  name: string
  id: number
  art: string | undefined
  sprite: string | undefined
  type: string | undefined
}

export type PokemonResponse = {
  name: string
  url: string
}

export type Pokemon = {
  abilities: Ability[]
  base_experience: number
  cries: Cries
  forms: Species[]
  game_indices: GameIndex[]
  height: number
  held_items: any[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  past_abilities: any[]
  past_types: any[]
  species: Species
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}

export type Ability = {
  ability: Species
  is_hidden: boolean
  slot: number
}

export type Species = {
  name: string
  url: string
}

export type Cries = {
  latest: string
  legacy: string
}

export type GameIndex = {
  game_index: number
  version: Species
}

export type Move = {
  move: Species
  version_group_details: VersionGroupDetail[]
}

export type VersionGroupDetail = {
  level_learned_at: number
  move_learn_method: Species
  version_group: Species
}

export type GenerationV = {
  'black-white': Sprites
}

export type GenerationIv = {
  'diamond-pearl': Sprites
  'heartgold-soulsilver': Sprites
  platinum: Sprites
}

export type Versions = {
  'generation-i': GenerationI
  'generation-ii': GenerationIi
  'generation-iii': GenerationIii
  'generation-iv': GenerationIv
  'generation-v': GenerationV
  'generation-vi': { [key: string]: Home }
  'generation-vii': GenerationVii
  'generation-viii': GenerationViii
}

export type Other = {
  dream_world: DreamWorld
  home: Home
  'official-artwork': OfficialArtwork
  showdown: Sprites
}

export type Sprites = {
  back_default: string
  back_female: null
  back_shiny: string
  back_shiny_female: null
  front_default: string
  front_female: null
  front_shiny: string
  front_shiny_female: null
  other?: Other
  versions?: Versions
  animated?: Sprites
}

export type GenerationI = {
  'red-blue': RedBlue
  yellow: RedBlue
}

export type RedBlue = {
  back_default: string
  back_gray: string
  back_transparent: string
  front_default: string
  front_gray: string
  front_transparent: string
}

export type GenerationIi = {
  crystal: Crystal
  gold: Gold
  silver: Gold
}

export type Crystal = {
  back_default: string
  back_shiny: string
  back_shiny_transparent: string
  back_transparent: string
  front_default: string
  front_shiny: string
  front_shiny_transparent: string
  front_transparent: string
}

export type Gold = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
  front_transparent?: string
}

export type GenerationIii = {
  emerald: OfficialArtwork
  'firered-leafgreen': Gold
  'ruby-sapphire': Gold
}

export type OfficialArtwork = {
  front_default: string
  front_shiny: string
}

export type Home = {
  front_default: string
  front_female: null
  front_shiny: string
  front_shiny_female: null
}

export type GenerationVii = {
  icons: DreamWorld
  'ultra-sun-ultra-moon': Home
}

export type DreamWorld = {
  front_default: string
  front_female: null
}

export type GenerationViii = {
  icons: DreamWorld
}

export type Stat = {
  base_stat: number
  effort: number
  stat: Species
}

export type Type = {
  slot: number
  type: Species
}

export type EvolutionResponse = {
  baby_trigger_item: null
  chain: Chain
  id: number
}

export type Chain = {
  evolution_details: EvolutionDetail[]
  evolves_to: Chain[]
  is_baby: boolean
  species: Species
}

export type EvolutionDetail = {
  gender: null
  held_item: null
  item: null
  known_move: null
  known_move_type: null
  location: null
  min_affection: null
  min_beauty: null
  min_happiness: null
  min_level: number
  needs_overworld_rain: boolean
  party_species: null
  party_type: null
  relative_physical_stats: null
  time_of_day: string
  trade_species: null
  trigger: Species
  turn_upside_down: boolean
}

export type SpeciesResponse = {
  base_happiness: number
  capture_rate: number
  color: Color
  egg_groups: Color[]
  evolution_chain: EvolutionChain
  evolves_from_species: Color
  flavor_text_entries: FlavorTextEntry[]
  form_descriptions: any[]
  forms_switchable: boolean
  gender_rate: number
  genera: Genus[]
  generation: Color
  growth_rate: Color
  habitat: Color
  has_gender_differences: boolean
  hatch_counter: number
  id: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  name: string
  names: Name[]
  order: number
  pal_park_encounters: PalParkEncounter[]
  pokedex_numbers: PokedexNumber[]
  shape: Color
  varieties: Variety[]
}

export type Color = {
  name: string
  url: string
}

export type EvolutionChain = {
  url: string
}

export type FlavorTextEntry = {
  flavor_text: string
  language: Color
  version: Color
}

export type Genus = {
  genus: string
  language: Color
}

export type Name = {
  language: Color
  name: string
}

export type PalParkEncounter = {
  area: Color
  base_score: number
  rate: number
}

export type PokedexNumber = {
  entry_number: number
  pokedex: Color
}

export type Variety = {
  is_default: boolean
  pokemon: Color
}

export type EvolutionData = {
  id: number
  description: string
  name: string
}
