<template>
  <section class="flex justify-center">
    <div class="w-fit flex flex-col justify-center items-center">
      <div class="flex bg-red-300 rounded-2xl pt-4 px-2 pb-1">
        <div v-for="i in 6" :key="i" class="relative w-10 h-10 mx-2">
          <img
            v-if="team[i - 1]"
            class="absolute z-10 max-w-24 w-16 h-auto top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            :src="team[i - 1].sprite"
            :alt="team[i - 1].name"
          />
          <div
            class="w-8 h-4 bg-slate-700 rounded-[50%] absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
          ></div>
        </div>
      </div>
      <p class="text-white font-semibold ms-auto me-2">{{ team.length }}/6</p>
    </div>
  </section>
</template>

<script lang="ts">
import { usePokedexStore } from '@/stores/pokedexStore'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const pokedexStore = usePokedexStore()
    const team = computed(() => pokedexStore.team)

    return {
      team
    }
  }
})
</script>

<style scoped></style>
