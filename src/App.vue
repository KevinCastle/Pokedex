<template>
  <header class="w-full relative z-10">
    <div class="pokeball h-56 mb-20">
      <div class="container">
        <nav class="pt-8">
          <RouterLink to="/" class="flex flex-col items-center group relative">
            <TeamBox />
            <span
              class="bg-red-300 text-red-100 group-hover:text-white py-2 px-8 rounded-b-2xl absolute -bottom-3 flex items-center transition-colors duration-150"
            >
              <PhCaretCircleLeft
                class="text-red-100 group-hover:text-white ms-2 transition-colors duration-150"
                :size="24"
                weight="fill"
              />
              Go to Pokedex
            </span>
          </RouterLink>
          <RouterLink to="/team" class="flex flex-col items-center group relative">
            <TeamBox />
            <span
              class="bg-red-300 text-red-100 group-hover:text-white py-2 px-8 rounded-b-2xl absolute -bottom-3 flex items-center transition-colors duration-150"
              >Go to team
              <PhCaretCircleRight
                class="text-red-100 group-hover:text-white ms-2 transition-colors duration-150"
                :size="24"
                weight="fill"
              />
            </span>
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { PhCaretCircleRight, PhCaretCircleLeft } from '@phosphor-icons/vue'
import TeamBox from './components/TeamBox.vue'
</script>

<style scoped>
header {
  filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
}
header::before {
  content: '';
  position: absolute;
  bottom: -70px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 140px;
  background: #f1f5f9;
  border: 16px solid #334155;
  border-radius: 50%;
  z-index: 10;
}

header::after {
  content: '';
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 70px;
  background: #f1f5f9;
  border: 8px solid #475569;
  border-radius: 50%;
  z-index: 10;
}

.pokeball {
  clip-path: ellipse(76% 100% at 50% 0%);
}

.pokeball::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  clip-path: ellipse(76% 100% at 50% 0%);
  background: #334155;
  z-index: -1;
}

.pokeball::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  clip-path: ellipse(76% 100% at 50% -24px);
  background: #991b1b;
  z-index: -1;
}
</style>
