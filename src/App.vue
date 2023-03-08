<script setup>
import ChatMessages from '@/components/ChatMessages.vue'
import TextArea from '@/components/TextArea.vue'
import { ref } from 'vue'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: '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'
})
const openai = new OpenAIApi(configuration)
const gpt_turbo = ref(true)
const tokens_used = ref(0)
const money_used = ref(0)
const max_messages = ref(5)
const messages = ref([
  {
    role: 'system',
    content: 'Sei SaGPT, un AI di Salvatore Giaquinto. Sei abbastanza concisa. Usi emoji per esprimersi'
  }
])

const createConversation = async (text) => {
  if (text) {
    addMessage('user', text)
    let reply = await generateReply()
    updateUsageAndCost(reply.data.usage.total_tokens)
    addMessage(
      'assistant',
      gpt_turbo.value ? reply.data.choices[0].message.content : reply.data.choices[0].text
    )
  }
}

const generateReply = () => {
  let request = 'La seguente è una conversazione con SaGPT. SaGPT è un AI di Salvatore Giaquinto. È abbastanza concisa. Usa emoji per esprimersi.\n'
  const getChatCompletion = gpt_turbo.value
    ? (a) => openai.createChatCompletion(a)
    : (a) => openai.createCompletion(a)

  if (!gpt_turbo.value) {
    const roles = { user: 'Human', assistant: 'SaGPT' }

    for (let message of messages.value.slice(1)) {
      request = `${request}\n ${roles[message.role]}: ${message.content}`
    }
  }

  return getChatCompletion({
    model: gpt_turbo.value ? 'gpt-3.5-turbo' : 'text-davinci-003',
    messages: gpt_turbo.value ? getMessages() : undefined,
    prompt: !gpt_turbo.value ? `${request}\nSaGPT: ` : undefined,
    max_tokens: !gpt_turbo.value ? 300 : undefined,
    temperature: !gpt_turbo.value ? 0.9 : undefined,
    presence_penalty: !gpt_turbo.value ? 0.7 : undefined
  })
}

const updateUsageAndCost = (tokens) => {
  tokens_used.value = tokens + tokens_used.value
  money_used.value = Math.round(tokens_used.value * 0.02) / 10000
}

const addMessage = (role, text) => {
  messages.value.push({
    role: role,
    content: text
  })
}

const clearChat = () => {
  messages.value.length = 1
  tokens_used.value = 0
  money_used.value = 0
}

const getMessages = () => {
  if (messages.value.length <= 5) {
    return messages.value;
  } else {
    return messages.value.slice(0,1).concat(messages.value.slice(messages.value.length - max_messages.value));
  }
}
</script>

<template>
  <header class="fixed top-0 w-full">
    <div class="flex justify-between bg-neutral-700 shadow-lg p-2.5">
      <h1 class="text-3xl font-bold">SaGPT</h1>
      <div>
        <button
          @click="gpt_turbo = true"
          :class="{
            'p-2 rounded-l-lg border-r-2': true,
            'bg-neutral-500': !gpt_turbo,
            'bg-gray-500': gpt_turbo
          }"
        >
          GPT-Turbo
        </button>
        <button
          @click="gpt_turbo = false"
          :class="{
            'p-2 rounded-r-lg': true,
            'bg-neutral-500': gpt_turbo,
            'bg-gray-500': !gpt_turbo
          }"
        >
          GPT-Davinci
        </button>
        <input v-model="max_messages" class="rounded-lg bg-neutral-500 p-2 text-center ml-2.5 focus:outline-none" type="number" placeholder="Msg" min="1" max="8" size="1">
      </div>
      <h2 class="flex items-center text-2xl">{{ tokens_used }}</h2>
    </div>
  </header>
  <chat-messages class="mt-20 mb-20" :messages="messages"></chat-messages>
  <div class="fixed bottom-0 w-full bg-neutral-700 py-2.5" ref="chatContainer">
    <text-area @clear="clearChat" @submit="(text) => createConversation(text)"></text-area>
  </div>
</template>
