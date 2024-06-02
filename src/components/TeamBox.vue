<template>
  <section class="flex justify-center">
    <div class="w-fit flex flex-col justify-center items-center">
      <div class="flex bg-red-300 rounded-2xl pt-4 px-2 pb-1">
        <div v-for="i in 6" :key="i" class="relative w-10 h-10 mx-2">
          <img
            class="absolute z-10 max-w-24 w-20 h-auto top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            alt=""
          />
          <div
            class="w-8 h-4 bg-slate-700 rounded-[50%] absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
          ></div>
        </div>
      </div>
      <p class="text-white font-semibold ms-auto me-2">6/6</p>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
