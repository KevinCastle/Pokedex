<!--
○ Mostrar su stats (con gráfico),
○ Se deben poder eliminar individualmente del equipo
○ Al hacer click en un Pokémon debe enviar a la vista /team/:id
para ver el detalle de ese Pokémon
-->

<template>
  <article class="container pt-4 pb-4 flex gap-4 overflow-x-auto">
    <section
      v-for="pokemon in teamPokemon"
      :key="pokemon.id"
      class="rounded-md py-4 px-4 w-80"
      :style="`background: linear-gradient(to bottom, ${typesColors[pokemon.types[0].type.name]}, white)`"
    >
      <div class="flex justify-between items-center w-full">
        <span class="font-semibold text-white">#{{ pokemon.id }}</span>
        <button
          class="rounded-full p-1 bg-white/20 group hover:bg-red-600/80 transition-colors duration-150"
          type="button"
          @click="() => removePokemon(pokemon.id)"
        >
          <PhTrash
            class="text-red-400 group-hover:text-white transition-colors duration-150"
            :size="24"
            weight="fill"
          />
        </button>
      </div>
      <img
        class="w-auto h-40 mx-auto"
        :src="pokemon.sprites.other?.dream_world.front_default"
        :alt="pokemon.name"
      />
      <div class="flex justify-between items-center py-4">
        <p class="text-2xl capitalize text-white font-semibold">{{ pokemon.name }}</p>
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
      <StatsChart :chart-data="formatStats(pokemon.stats)" />
      <button
        type="button"
        class="bg-red-400 text-red-100 group hover:bg-red-500 hover:text-white py-2 px-8 rounded-2xl flex items-center justify-center w-full transition-colors duration-150"
        @click="goToPokemonDetails(pokemon.id)"
      >
        <span>More about {{ pokemon.name }}</span>
        <PhCaretCircleRight
          class="text-red-100 group-hover:text-white ms-2 transition-colors duration-150"
          :size="24"
          weight="fill"
        />
      </button>
    </section>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { usePokedexStore } from '@/stores/pokedexStore'
import { usePokemonStore } from '@/stores/pokemonStore'
import typesColors from '@/constants'
import { PhSpeakerHigh, PhTrash, PhCaretCircleRight } from '@phosphor-icons/vue'
import StatsChart from '@/components/StatsChart.vue'
import type { Stat } from '@/types/PokeApiResponse'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    PhSpeakerHigh,
    PhTrash,
    PhCaretCircleRight,
    StatsChart
  },
  setup() {
    const pokemonStore = usePokemonStore()
    const pokedexStore = usePokedexStore()
    const team = computed(() => pokedexStore.team)
    const teamPokemon = computed(() => pokemonStore.teamPokemon)

    onMounted(async () => {
      await pokemonStore.setTeamData(team.value)
    })

    const playCry = (cry: string) => {
      const audio = new Audio(cry)
      audio.play()
    }

    const formatStats = (stats: Stat[]) => {
      return pokemonStore.handleStats(stats)
    }

    const removePokemon = async (id: number) => {
      await pokedexStore.removePokemonFromTeam(id)
      await pokemonStore.setTeamData(team.value)
    }

    const router = useRouter()

    const goToPokemonDetails = (id: number) => {
      router.push(`/team/${id}`)
    }

    return {
      teamPokemon,
      removePokemon,
      typesColors,
      playCry,
      formatStats,
      goToPokemonDetails
    }
  }
})
</script>

<style scoped></style>
