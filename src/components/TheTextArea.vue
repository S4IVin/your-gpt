<template>
  <div class="mx-6 flex sm:mx-12 md:mx-16 lg:mx-20">
    <button :disabled="disabled" @click="$emit('clear')" class="mr-4 rounded-lg bg-red-500 p-2 hover:bg-red-600">
      Clear
    </button>
    <input
      :disabled="disabled"
      type="text"
      v-model="text"
      @keyup.enter="
        $emit('submit', text);
        text = ''
      "
      placeholder="Type here what you want to say..."
      class="w-full focus:outline-none rounded-l-lg bg-neutral-500 p-2"
    />
    <button
      :disabled="disabled"
      @click="
        $emit('submit', text);
        text = ''
      "
      class="rounded-r-lg bg-neutral-600 p-2 hover:bg-gray-600"
    >
      Send
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  disabled: Boolean
})

const text = ref('')
</script>
