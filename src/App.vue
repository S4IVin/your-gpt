<script setup>
import Settings from '@/components/Settings.vue'
import ChatMessages from '@/components/ChatMessages.vue'
import TextArea from '@/components/TextArea.vue'
import { ref, watch } from 'vue'
import GPT3Tokenizer from 'gpt3-tokenizer'
import { Configuration, OpenAIApi } from 'openai'
import Tooltip from '@/components/Tooltip.vue'
import Warning from '@/components/Warning.vue'

const useStorage = (item, value) => {
  item = localStorage.getItem(item)

  if (item) {
    return item
  }
  else {
    return value
  }
}

const local_api_key = localStorage.getItem('api_key')
const api_key = ref(local_api_key)
const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
let configuration = new Configuration({ apiKey: api_key.value })
let openai = new OpenAIApi(configuration)
const warning_hidden = ref(!!local_api_key)
const settings_hidden = ref(true)
const gpt_turbo = ref(true)
const tokens_exceeded = ref(false)
const tokens_used = ref(0)
const money_used = ref(0)
const system_prompt = ref(
  'Sei SaGPT, un AI di Salvatore Giaquinto. Sei abbastanza concisa. Usi emoji per esprimerti'
)
const messages_limit = ref(useStorage('messages_limit', '5'))
const max_total_tokens = ref(useStorage('max_total_tokens', '0'))
const temperature = ref(useStorage('temperature', '0.5'))
const presence_penalty = ref(useStorage('messages_limit', '0'))
const frequency_penalty = ref(useStorage('messages_limit', '0'))
const messages = ref([{ role: 'system', content: system_prompt.value }])

watch(api_key, (new_api_key) => {
  localStorage.setItem('api_key', new_api_key)
  warning_hidden.value = !!new_api_key

  if (new_api_key) {
    configuration = new Configuration({ apiKey: api_key.value })
    openai = new OpenAIApi(configuration)
  }
})

watch([max_total_tokens, tokens_used], () => {
  tokens_exceeded.value =
    max_total_tokens.value < tokens_used.value && parseInt(max_total_tokens.value) !== 0
})

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
  let request
  let prompt_tokens

  const getChatCompletion = gpt_turbo.value
    ? (a) => openai.createChatCompletion(a)
    : (a) => openai.createCompletion(a)

  if (!gpt_turbo.value) {
    request = `La seguente è una conversazione con un AI. Il system prompt dell'AI è: ${system_prompt.value}.\n`
    const roles = { user: 'Human', assistant: 'AI' }

    for (let message of getMessages().slice(1)) {
      request = `${request}\n ${roles[message.role]}: ${message.content}`
    }

    prompt_tokens = tokenizer.encode(request)
  }

  return getChatCompletion({
    model: gpt_turbo.value ? 'gpt-3.5-turbo' : 'text-davinci-003',
    messages: gpt_turbo.value ? getMessages() : undefined,
    prompt: !gpt_turbo.value ? `${request}\nAI: ` : undefined,
    max_tokens: !gpt_turbo.value ? 4092 - prompt_tokens.text.length : undefined,
    temperature: !gpt_turbo.value ? temperature.value : undefined,
    presence_penalty: !gpt_turbo.value ? presence_penalty.value : undefined,
    frequency_penalty: !gpt_turbo.value ? frequency_penalty.value : undefined
  })
}

const getMessages = () => {
  if (messages.value.length <= messages_limit.value || messages_limit.value === 0) {
    return messages.value
  } else {
    return messages.value
      .slice(0, 1)
      .concat(messages.value.slice(messages.value.length - messages_limit.value))
  }
}

const addMessage = (role, text) => {
  messages.value.push({
    role: role,
    content: text
  })
}

const updateUsageAndCost = (tokens) => {
  tokens_used.value = tokens + tokens_used.value
  money_used.value = Math.round(tokens_used.value * 0.02) / 10000
}

const clearChat = () => {
  messages.value.length = 1
  tokens_used.value = 0
  money_used.value = 0
}
</script>

<template>
  <header class="fixed top-0 w-full">
    <div class="flex justify-between bg-neutral-700 p-2 shadow-lg">
      <h1 class="flex items-center text-3xl font-bold">YourGPT</h1>
      <div class="flex">
        <tooltip
          offset_y="5.5"
          offset_x="-3"
          width="10"
          text="GPT-3.5 based model optimized for chat at 1/10th of Davinci, but heavily filtered."
        >
          <button
            @click="gpt_turbo = true"
            :class="{
              'p-2 rounded-l-lg border-r-2': true,
              'bg-neutral-500': !gpt_turbo,
              'bg-gray-500': gpt_turbo
            }"
          >
            Turbo
          </button>
        </tooltip>
        <tooltip
          offset_y="5.5"
          offset_x="-3"
          width="10"
          text="GPT-3 based model 10x more expensive than GPT-3.5, but with no filtering."
        >
          <button
            @click="gpt_turbo = false"
            :class="{
              'p-2 rounded-r-lg': true,
              'bg-neutral-500': gpt_turbo,
              'bg-gray-500': !gpt_turbo
            }"
          >
            Davinci
          </button>
        </tooltip>
        <button @click="settings_hidden = false">
          <img
            class="ml-4 rounded-lg bg-neutral-500 invert p-1.5"
            src="/src/assets/menu.png"
            width="40"
            height="40"
          />
        </button>
        <h2
          :class="{
            'ml-4 flex items-center border-l-2 px-4 text-2xl': true,
            'text-red-500': tokens_exceeded
          }"
        >
          {{ tokens_used }}
        </h2>
      </div>
    </div>
  </header>
  <settings
    :class="settings_hidden ? 'hidden' : undefined"
    :gpt_turbo="gpt_turbo"
    :api_key="api_key"
    :system_prompt="system_prompt"
    :messages_limit="messages_limit"
    :max_total_tokens="max_total_tokens"
    :temperature="temperature"
    :presence_penalty="presence_penalty"
    :frequency_penalty="frequency_penalty"
    @closeSettings="() => (settings_hidden = true)"
    @apiKeyChange="(a) => (api_key = a)"
    @systemPromptChange="(a) => (system_prompt = a)"
    @messagesLimitChange="(a) => (messages_limit = a)"
    @maxTotalTokensChange="(a) => (max_total_tokens = a)"
    @temperatureChange="(a) => (temperature = a)"
    @presencePenaltyChange="(a) => (presence_penalty = a)"
    @frequencyPenaltyChange="(a) => (frequency_penalty = a)"
  ></settings>
  <warning
    title="Warning!"
    text="No API Key provided."
    :class="warning_hidden ? 'hidden' : undefined"
  ></warning>
  <chat-messages class="mt-20 mb-20" :messages="messages"></chat-messages>
  <div class="fixed bottom-0 w-full bg-neutral-700 py-2.5" ref="chatContainer">
    <text-area
      :class="!warning_hidden || tokens_exceeded ? 'opacity-50' : undefined"
      :disabled="!warning_hidden || tokens_exceeded"
      @clear="clearChat"
      @submit="(text) => createConversation(text)"
    ></text-area>
  </div>
</template>
