<script setup>
import ChatMessages from '@/components/ChatMessages.vue'
import TextArea from '@/components/TextArea.vue'
import { ref } from 'vue'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: "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"
})
const openai = new OpenAIApi(configuration)
const gpt_turbo = ref(true)
const tokens_used = ref(0)
const money_used = ref(0)
const messages = ref([
  {
    role: 'system',
    content:
        "Sei SaGPT, un AI di Salvatore Giaquinto. Sei abbastanza concisa. Usi emoji per esprimersi"
  }
])
const clearChat = () => {
  messages.value.length = 1
  tokens_used.value = 0
  money_used.value = 0
}
const getReply = async (text) => {
  if (text) {
    messages.value.push({
      role: 'user',
      content: text
    })
    if (gpt_turbo.value) {
      let reply = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages.value
      })
      tokens_used.value = reply.data.usage.total_tokens + tokens_used.value
      money_used.value = Math.round(tokens_used.value * 0.02) / 10000
      messages.value.push({
        role: 'assistant',
        content: reply.data.choices[0].message.content
      })
    }
    else {
      const roles = {'user': "Human", 'assistant': "SaGPT"}
      let prompt = "La seguente è una conversazione con SaGPT. SaGPT è un AI di Salvatore Giaquinto. È abbastanza concisa. Usa emoji per esprimersi.\n"
      console.log(messages.value)
      for (let message in messages.value) {
        console.log(message)
        prompt = prompt + "\n" + roles[message.role] + ": " + message.content + "\n" + roles['assistant'] + ": "
      }
      console.log(prompt)
      let reply = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.9
      })
      tokens_used.value = reply.data.usage.total_tokens + tokens_used.value
      money_used.value = Math.round(tokens_used.value * 0.02) / 10000
      messages.value.push({
        role: 'assistant',
        content: reply.data.choices[0].text
      })
    }
  }
}
</script>

<template>
  <header class="fixed top-0 w-full">
    <div class="flex justify-between bg-neutral-700 shadow-lg p-2.5">
      <h1 class="text-3xl font-bold">SaGPT</h1>
      <div>
        <button @click="gpt_turbo = true" :class="{
        'p-2 rounded-l-lg border-r-2': true,
        'bg-neutral-500': ! gpt_turbo,
        'bg-gray-500': gpt_turbo
        }">GPT-Turbo</button>
        <button @click="gpt_turbo = false" :class="{
        'p-2 rounded-r-lg': true,
        'bg-neutral-500': gpt_turbo,
        'bg-gray-500': ! gpt_turbo
        }">GPT-Davinci</button>
      </div>
      <h2 class="text-2xl">{{ tokens_used }}</h2>
    </div>
  </header>
  <chat-messages class="mt-20 mb-20" :messages="messages"></chat-messages>
  <div class="fixed bottom-0 w-full bg-neutral-700 py-2.5" ref="chatContainer">
    <text-area @clear="clearChat" @submit="(text) => getReply(text)"></text-area>
  </div>
</template>