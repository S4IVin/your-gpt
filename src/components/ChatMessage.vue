<template>
  <div
    :class="{
      'flex w-full': true,
      'justify-end': role !== 'AI'
    }"
  >
    <div
      :class="{
        'mx-6 flex inline-flex items-center rounded-lg sm:mx-12 md:mx-16 lg:mx-20': true,
        'bg-gray-500 flex-row-reverse': role !== 'AI',
        'bg-neutral-500': role === 'AI'
      }"
    >
      <h1
        :class="{
          'h-full font-bold p-2.5': true,
          'bg-gray-600 rounded-r-lg border-l-2': role !== 'AI',
          'bg-neutral-600 rounded-l-lg border-r-2': role === 'AI'
        }"
      >
        {{ role }}
      </h1>
      <p class="p-2.5 break-word" v-html="text"></p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  role: String,
  text: String
})
</script>
