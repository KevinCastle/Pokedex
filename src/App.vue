<template>
  <main class="bg-slate-200 min-h-dvh">
    <HeaderComponent />

    <RouterView />
    <ErrorAlert />
  </main>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import ErrorAlert from './components/ErrorAlert.vue'
import { usePokedexStore } from './stores/pokedexStore'

export default {
  components: {
    HeaderComponent,
    ErrorAlert
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
