<template>
  <div class="flex flex-col space-y-4">
    <chat-message
      v-for="message in messages.slice(1)"
      :role="message.role === 'assistant' ? 'SaGPT' : 'Tu'"
      :text="message.content"
    ></chat-message>
  </div>
</template>

<script setup>
import ChatMessage from '@/components/ChatMessage.vue'
import { onUpdated } from 'vue'

onUpdated(() => {
  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
})

defineProps({
  messages: Array
})
</script>
