<template>
  <div class="mt-4 flex w-full" :class="message.role === 'assistant' ? '' : 'justify-end'">
    <div
      class="mx-6 inline-flex min-w-0 items-center rounded-lg bg-opacity-60 sm:mx-8 md:mx-12 lg:mx-16"
      :class="{
        'bg-neutral-600': message.role === 'assistant',
        'flex-row-reverse bg-gray-600': message.role === 'user',
        'border border-red-800 bg-red-500': message.isError
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
      <vue-markdown
        class="break-word prose prose-invert min-w-0 max-w-3xl p-2.5"
        :class="message.role === 'assistant' ? 'prose-neutral' : 'prose-gray'"
        :source="message.data"
      />
    </div>
  </div>
</template>

<script setup>
import VueMarkdown from 'vue-markdown-render';

defineProps({ message: Object });
</script>
