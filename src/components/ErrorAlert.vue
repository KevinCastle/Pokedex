<template>
  <div
    v-if="errorMessage"
    class="bg-red-500 text-white rounded-xl py-3 px-6 w-fit fixed bottom-0 right-0 m-4"
  >
    {{ errorMessage }}
  </div>
</template>

<script lang="ts">
import { usePokedexStore } from '@/stores/pokedexStore'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const pokedexStore = usePokedexStore()
    const errorMessage = computed(() => pokedexStore.error)

    return {
      errorMessage
    }
  }
})
</script>

<style scoped></style>
