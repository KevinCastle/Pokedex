<template>
  <article class="container pt-4 pb-8">
    <section v-if="pokedex" ref="scrollInfinite" class="flex gap-4 flex-wrap justify-center">
      <div
        v-for="pokemon in pokedex.pokemons"
        :key="pokemon.name"
        class="bg-white rounded-2xl p-4 relative"
        :style="{ backgroundColor: pokemon.type ? typesColors[pokemon.type] : '#FFFFFF' }"
      >
        <span class="absolute top-1 right-3 font-semibold text-white">#{{ pokemon.id }}</span>
        <img
          :src="pokemon.art"
          :alt="pokemon.name"
          width="100"
          height="100"
          class="relative z-10"
        />
        <p class="text-center pt-2 font-semibold text-white">{{ pokemon.name }}</p>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { usePokedexStore } from '@/stores/pokedexStore'
import typesColors from '@/constants'

export default {
  setup() {
    const pokedexStore = usePokedexStore()
    const pokedex = computed(() => pokedexStore.pokedex)
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

    return {
      pokedex,
      typesColors,
      scrollInfinite
    }
  }
}
</script>
