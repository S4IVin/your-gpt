<script setup>
import ChatMessages from '@/components/ChatMessages.vue'
import TextArea from '@/components/TextArea.vue'
import { ref } from 'vue'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: "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"
})
const openai = new OpenAIApi(configuration)

let tokens_used = 0
const money_used = ref(0)
const messages = ref([
  {
    role: 'system',
    content:
      "Sei SaGPT, che sta per Salvatore's Generative Pre-trained Transformer, un AI creata da Salvatore Giaquinto. Sei empatica e comprensiva, devi aiutare e rispondere alle domande, ma anche rendere la conversazione più dinamica e devi saper coinvolgere il tuo interlocutore. Inserisci delle emoji alla fine della frase per rappresentare il tuo stato d'animo"
  }
])

const clearChat = () => {
  messages.value.length = 1
  tokens_used = 0
  money_used.value = 0
}

const getReply = async (text) => {
  if (text) {
    messages.value.push({
      role: 'user',
      content: text
    })

    let reply = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages.value
    })

    tokens_used = reply.data.usage.total_tokens + tokens_used
    money_used.value = Math.round(tokens_used * 0.02) / 10000

    messages.value.push({
      role: 'assistant',
      content: reply.data.choices[0].message.content
    })
  }
}
</script>

<template>
  <header class="fixed top-0 w-full">
    <div class="flex justify-between bg-neutral-700 shadow-lg p-2.5">
      <h1 class="text-3xl font-bold">SaGPT</h1>
      <h2 class="text-2xl">€ {{ money_used }}</h2>
    </div>
  </header>
  <chat-messages class="mt-20 mb-20" :messages="messages"></chat-messages>
  <div class="fixed bottom-0 w-full bg-neutral-700 py-2.5" ref="chatContainer">
    <text-area @clear="clearChat" @submit="(text) => getReply(text)"></text-area>
  </div>
</template>
