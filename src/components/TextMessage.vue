<template>
  <div class="flex w-full" :class="message.role !== 'assistant' ? 'justify-end' : ''">
    <div
      class="min-w-0 inline-flex items-center rounded-lg mx-6 sm:mx-8 md:mx-12 lg:mx-16"
      :class="message.role !== 'assistant' ? 'flex-row-reverse bg-gray-500' : 'bg-neutral-500'"
    >
      <h1
        class="h-full font-bold p-2.5"
        :class="
          message.role !== 'assistant'
            ? 'bg-gray-600 rounded-r-lg border-l-2'
            : 'bg-neutral-600 rounded-l-lg border-r-2'
        "
      >
        {{ message.role === 'assistant' ? 'AI' : 'Tu' }}
      </h1>
      <VueMarkdown
        class="max-w-3xl min-w-0 prose prose-neutral prose-invert text-white p-2.5 break-word"
        :source="message.data"
      />
    </div>
  </div>
</template>

<script setup>
import VueMarkdown from 'vue-markdown-render';

defineProps({
  message: Object
});
</script>
