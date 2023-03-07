<template>
  <div class="mx-6 flex sm:mx-12 md:mx-16 lg:mx-20">
    <button @click="$emit('clear')" class="mr-4 rounded-lg bg-red-500 p-2 hover:bg-red-600">
      Cancella
    </button>
    <input
      type="text"
      v-model="text"
      @keyup.enter="$emit('submit', text); text = ''"
      placeholder="Scrivi qui cosa chiedergli..."
      class="w-full rounded-l-lg bg-neutral-500 p-2"
    />
    <button @click="$emit('submit', text); text = ''" class="rounded-r-lg bg-neutral-600 p-2 hover:bg-gray-600">Invia</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
