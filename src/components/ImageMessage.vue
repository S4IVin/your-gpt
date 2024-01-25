<template>
  <div
    :class="{
      'flex w-full': true,
      'justify-end': message.role !== 'AI'
    }"
  >
    <div
      :class="{
        'mx-6 flex inline-flex items-center rounded-lg sm:mx-16 md:mx-24 lg:mx-32': true,
        'bg-gray-500 flex-row-reverse': message.role !== 'AI',
        'bg-neutral-500': message.role === 'AI'
      }"
    >
      <h1
        :class="{
          'h-full font-bold p-2.5': true,
          'bg-gray-600 rounded-r-lg border-l-2': message.role !== 'AI',
          'bg-neutral-600 rounded-l-lg border-r-2': message.role === 'AI'
        }"
      >
        {{ message.role }}
      </h1>
      <p class="p-2.5 break-word" v-html="message.data"></p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: Object
})
</script>