<template>
  <article class="container pt-4 pb-8">
    <section v-if="pokedex" ref="scrollInfinite" class="flex gap-4 flex-wrap justify-center">
      <button
        v-for="pokemon in pokedex.pokemons"
        :key="pokemon.name"
        type="button"
        class="rounded-2xl p-4 w-44 group flex flex-col items-center"
        :style="{ backgroundColor: pokemon.type ? typesColors[pokemon.type] : '#FFFFFF' }"
        @click="() => handlePokemon(pokemon)"
      >
        <div class="flex justify-between items-center w-full">
          <span class="font-semibold text-white">#{{ pokemon.id }}</span>
          <PokeballButton :is-added="checkPokemon(pokemon)" />
        </div>
        <img
          :src="pokemon.art"
          :alt="pokemon.name"
          width="100"
          height="100"
          class="relative z-10"
        />
        <p class="text-center pt-2 font-semibold text-white">{{ pokemon.name }}</p>
      </button>
    </section>
  </article>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { usePokedexStore } from '@/stores/pokedexStore'
import typesColors from '@/constants'
import PokeballButton from '@/components/PokeballButton.vue'
import type { PokemonSummary } from '@/types/PokeApiResponse'

export default {
  components: {
    PokeballButton
  },
  setup() {
    const pokedexStore = usePokedexStore()
    const pokedex = computed(() => pokedexStore.pokedex)
    const team = computed(() => pokedexStore.team)
    const scrollInfinite = ref<HTMLElement | null>(null)

    const handleScroll = async () => {
      const pokedexList = scrollInfinite.value
      if (!pokedexStore.loading && pokedexList && pokedexStore.counter < 150) {
        if (pokedexList.getBoundingClientRect().bottom < window.innerHeight) {
          await pokedexStore.getPokedexData(25)
        }
      }
    }

    onMounted(async () => {
      await pokedexStore.getPokedexData(25)
      await window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const handlePokemon = (pokemon: PokemonSummary) => {
      if (team.value.length < 6) {
        if (!team.value.some((member) => member.id === pokemon.id)) {
          pokedexStore.addPokemonToTeam(pokemon)
        } else {
          pokedexStore.removePokemonFromTeam(pokemon)
        }
      } else if (!team.value.some((member) => member.id === pokemon.id)) {
        // SHOW ERROR MESSAGE
      } else {
        pokedexStore.removePokemonFromTeam(pokemon)
      }
    }

    const checkPokemon = (pokemon: PokemonSummary) => {
      return pokedexStore.team.some((member) => member.id === pokemon.id)
    }

    return {
      pokedex,
      typesColors,
      scrollInfinite,
      handlePokemon,
      checkPokemon
    }
  }
}
</script>
