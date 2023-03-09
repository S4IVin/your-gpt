<template>
  <div class="flex flex-col space-y-4">
    <chat-message
      v-for="message in messages.slice(1)"
      :role="message.role === 'assistant' ? 'AI' : 'Tu'"
      :text="marked(message.content)"
    ></chat-message>
  </div>
</template>

<script setup>
import ChatMessage from '@/components/ChatMessage.vue'
import { onUpdated } from 'vue'
import { marked } from 'marked'

onUpdated(() => {
  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
})
defineProps({
  messages: Array
})
</script>
