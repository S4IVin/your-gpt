<template>
  <div class="flex w-full" :class="message.role !== 'AI' ? 'justify-end' : ''">
    <div
      class="max-w-2xl mx-6 flex inline-flex items-center rounded-lg mx-6 sm:mx-8 md:mx-12 lg:mx-16"
      :class="message.role !== 'AI' ? 'bg-gray-500 flex-row-reverse' : 'bg-neutral-500'"
    >
      <h1
        class="h-full font-bold p-2.5"
        :class="
          message.role !== 'AI' ? 'bg-gray-600 rounded-r-lg border-l-2' : 'bg-neutral-600 rounded-l-lg border-r-2'
        "
      >
        {{ message.role === 'assistant' ? 'AI' : 'Tu' }}
      </h1>
      <img :src="message.data" alt="Image" class="object-contain min-w-0 max-h-96 p-2.5" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: Object
});
</script>
