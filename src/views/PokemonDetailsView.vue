<!-- Mostrar el detalle del Pokémon
○ Mostrar su nombre, imagen, tipos, stats (con gráfico), sonido
(cries) que se pueda escuchar, altura, peso, descripción y
cadena evolutiva
■ La cadena evolutiva, es mostrar el Pokémon base y
todas sus evoluciones, deben tener su nombre e imágen -->

<template>
  <article
    v-if="pokemonSpecies.id"
    class="container pt-4 pb-4 grid grid-cols-2 lg:grid-rows-2 gap-4"
  >
    <section class="col-span-2 lg:col-span-1 lg:row-span-2">
      <div
        class="rounded-md py-4 px-8 w-full h-full flex flex-col justify-around"
        :style="`background: linear-gradient(to bottom, ${typesColors[pokemon.types[0].type.name]}, white)`"
      >
        <div>
          <span class="font-semibold text-white">#{{ pokemon.id }}</span>
          <p class="text-4xl pb-4 capitalize text-white font-semibold">{{ pokemon.name }}</p>
          <img
            class="w-auto h-60 mx-auto"
            :src="pokemon.sprites.other?.dream_world.front_default"
            :alt="pokemon.name"
          />
          <div class="flex justify-end items-center py-4">
            <button
              type="button"
              class="rounded-full p-1 bg-white/20 group hover:bg-gray-800/80 transition-colors duration-150"
              @click="playCry(pokemon.cries.legacy)"
            >
              <PhSpeakerHigh
                class="text-gray-600 group-hover:text-white transition-colors duration-150"
                :size="24"
                weight="fill"
              />
            </button>
          </div>
          <div class="flex justify-between gap-2">
            <div
              v-for="pokemonType in pokemon.types"
              :key="pokemonType.slot"
              class="w-24 py-2 px-4 mx-auto rounded-md text-white font-medium text-center"
              :style="{ backgroundColor: typesColors[pokemonType.type.name] }"
            >
              {{ pokemonType.type.name }}
            </div>
          </div>
        </div>
        <div class="text-center">
          <p class="text-gray-700 font-semibold text-xl mb-8">Description</p>
          <p>{{ pokemonSpecies.flavor_text_entries[0].flavor_text }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-1 flex flex-col items-center rounded-lg mt-4">
            <img
              class="w-16 h-auto"
              :src="pokemon.sprites.versions?.['generation-iii']['ruby-sapphire'].front_default"
              :alt="pokemon.name"
            />
            <p class="pt-2 text-gray-600 font-medium">Common</p>
          </div>
          <div class="col-span-1 flex flex-col items-center rounded-lg mt-4">
            <img
              class="w-16 h-auto"
              :src="pokemon.sprites.versions?.['generation-iii']['ruby-sapphire'].front_shiny"
              :alt="pokemon.name"
            />
            <p class="pt-2 text-gray-600 font-medium">Shiny</p>
          </div>
        </div>
      </div>
    </section>
    <section class="col-span-2 lg:col-span-1 lg:row-span-1">
      <div
        class="p-4 bg-white rounded-lg border-4 solid flex flex-col items-center"
        :style="`border-color: ${typesColors[pokemon.types[0].type.name]}`"
      >
        <p class="text-red-500 font-semibold text-xl mb-8">Stats</p>
        <StatsChart :chart-data="formatStats(pokemon.stats)" />
      </div>
    </section>
    <section class="col-span-2 lg:col-span-1 lg:row-span-1">
      <div
        v-if="evolutionChain.length > 0"
        class="p-4 rounded-lg flex flex-col items-center justify-center h-full"
        :style="`background: ${typesColors[pokemon.types[0].type.name]}`"
      >
        <p class="text-white font-semibold text-xl mb-8">Evolutions</p>
        <div class="flex justify-center">
          <div
            v-for="(evolution, index) in evolutionChain"
            :key="index"
            class="flex items-center gap-2"
          >
            <div class="flex flex-col justify-center items-center gap-4">
              <img
                class="w-16 h-16"
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/${evolution.id}.png`"
                :alt="evolution.name"
              />
              <p class="text-white font-semibold capitalize">{{ evolution.name }}</p>
            </div>
            <PhArrowFatRight
              v-if="index !== evolutionChain.length - 1"
              class="text-white"
              :size="32"
              weight="fill"
            />
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import typesColors from '@/constants'
import { PhSpeakerHigh, PhArrowFatRight } from '@phosphor-icons/vue'
import StatsChart from '@/components/StatsChart.vue'
import type { Stat } from '@/types/PokeApiResponse'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    PhSpeakerHigh,
    PhArrowFatRight,
    StatsChart
  },
  setup() {
    const pokemonStore = usePokemonStore()
    const pokemon = computed(() => pokemonStore.pokemonData)
    const pokemonSpecies = computed(() => pokemonStore.pokemonSpecies)
    const evolutionChain = computed(() => pokemonStore.evolutionChain)
    const route = useRoute()
    const pokemonId = Number(route.params.id)

    onMounted(async () => {
      await pokemonStore.getPokemonById(pokemonId)
      await pokemonStore.getPokemonSpecies(pokemonId)
    })

    const playCry = (cry: string) => {
      const audio = new Audio(cry)
      audio.play()
    }

    const formatStats = (stats: Stat[]) => {
      return pokemonStore.handleStats(stats)
    }

    return {
      pokemon,
      pokemonSpecies,
      evolutionChain,
      typesColors,
      playCry,
      formatStats
    }
  }
})
</script>

<style scoped></style>
