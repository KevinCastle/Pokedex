<template>
  <div class="transition-all duration-150 rounded-lg group-hover:bg-black/10 flex items-center">
    <p
      class="text-xs font-semibold px-1 text-transparent group-hover:text-white transition-all duration-150"
    >
      {{ isAdded ? 'Remove' : 'Add' }}
    </p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="`${isAdded ? 'group-hover:stroke-red-400' : 'group-hover:stroke-green-400'} stroke-white transition-colors duration-150`"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#2c3e50"
      :fill="`${isAdded ? '#eab308' : 'none'}`"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isAdded: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.group:hover .group-hover\:stroke-red-400 {
  stroke: #f87171;
}

.group:hover .group-hover\:stroke-add {
  stroke: #4ade80;
}
</style>
