<template>
  <main class="bg-slate-200 min-h-dvh">
    <HeaderComponent />

    <RouterView />
  </main>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import { usePokedexStore } from './stores/pokedexStore'

export default {
  components: {
    HeaderComponent
  },
  setup() {
    const pokedexStore = usePokedexStore()

    onMounted(async () => {
      await pokedexStore.getPokemonTeam()
    })

    return {
      RouterLink,
      RouterView
    }
  }
}
</script>

<style scoped></style>
