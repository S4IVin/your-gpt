<template>
  <div class="mt-4 flex w-full" :class="message.role === 'assistant' ? '' : 'justify-end'">
    <div
      class="mx-6 inline-flex min-w-0 items-center rounded-lg bg-opacity-60 sm:mx-8 md:mx-12 lg:mx-16"
      :class="{
        'bg-neutral-600': message.role === 'assistant',
        'flex-row-reverse bg-gray-600': message.role === 'user',
        'border border-red-800 bg-red-500 bg-opacity-50': message.isError
      }"
    >
      <h1
        class="h-full bg-opacity-60 p-2.5 font-bold"
        :class="{
          'rounded-l-lg border-r-2 bg-neutral-700': message.role === 'assistant',
          'rounded-r-lg border-l-2 bg-gray-700': message.role === 'user'
        }"
      >
        {{ message.role === 'assistant' ? 'AI' : 'You' }}
      </h1>
      <img :src="message.data" alt="Image" class="max-h-96 min-w-0 max-w-3xl object-contain p-2.5" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ message: Object });
</script>
