import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import GPT3Tokenizer from 'gpt3-tokenizer'
import { Configuration, OpenAIApi } from 'openai'
import { useSettingsStore } from '@/stores/SettingsStore'

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })

// eslint-disable-next-line import/prefer-default-export
export const useAppStore = defineStore('app', () => {
  const settings = useSettingsStore()

  const settingsHidden = ref(true)
  const tokensUsed = ref(0)
  const moneyUsed = ref(0)
  const messages = ref([{ role: 'system', content: settings.systemPrompt }])

  const isApiKeyProvided = computed(() => {
    return !!settings.apiKey
  })
  const tokensExceeded = computed(() => {
    return (
      tokensUsed.value >= settings.maxTotalTokens &&
      (settings.maxTotalTokens !== 0 ? settings.maxTotalTokens !== '' : false)
    )
  })

  const extractItemsFromArray = (array, x) => {
    if (x >= array.length) {
      return array
    }

    const firstItem = [array[0]]
    const lastXItems = array.slice(-x)
    return firstItem.concat(lastXItems)
  }

  const clearChat = () => {
    messages.value.length = 1
    tokensUsed.value = 0
    moneyUsed.value = 0
  }

  const updateUsageAndCost = (tokens) => {
    tokensUsed.value = tokens + tokensUsed.value
    moneyUsed.value = Math.round(moneyUsed.value * 0.02) / 10000
  }

  const getTokenCount = (text) => {
    return tokenizer.encode(text).text.length
  }

  const addMessage = (role, content) => {
    messages.value.push({
      role,
      content
    })
  }

  const getMessages = () => {
    const messagesLimitDisabled = settings.messagesLimit === 0 || settings.messagesLimit === ''

    return messagesLimitDisabled
      ? messages.value
      : extractItemsFromArray(messages.value, settings.messagesLimit)
  }

  const generateDavinciPrompt = () => {
    const roles = { user: settings.userRole, assistant: settings.assistantRole }
    let prompt = `${settings.davinciPrompt}\n`

    getMessages()
      .slice(1)
      .forEach((message) => {
        console.log(roles[message.role])
        prompt = `${prompt}\n ${roles[message.role]}: ${message.content}`
      })

    return `${prompt}\n${roles.assistant}: `
  }

  const generateConfiguration = () => {
    const configuration = new Configuration({ apiKey: settings.apiKey })
    const openai = new OpenAIApi(configuration)
    return settings.gptTurbo
      ? (a) => openai.createChatCompletion(a)
      : (a) => openai.createCompletion(a)
  }

  const generateReply = () => {
    const getChatCompletion = generateConfiguration()
    const prompt = generateDavinciPrompt()

    messages.value[0] = { role: 'system', content: settings.systemPrompt }

    return getChatCompletion({
      model: settings.gptTurbo ? 'gpt-3.5-turbo' : 'text-davinci-003',
      messages: settings.gptTurbo ? getMessages() : undefined,
      prompt: !settings.gptTurbo ? prompt : undefined,
      max_tokens: !settings.gptTurbo ? 4092 - getTokenCount(prompt) : undefined,
      temperature: !settings.gptTurbo ? settings.temperature : undefined,
      presence_penalty: !settings.gptTurbo ? settings.presencePenalty : undefined,
      frequency_penalty: !settings.gptTurbo ? settings.frequencyPenalty : undefined
    })
  }

  const createConversation = async (text) => {
    if (text) {
      addMessage('user', text)
      const reply = await generateReply()
      updateUsageAndCost(reply.data.usage.total_tokens)
      addMessage(
        'assistant',
        settings.gptTurbo ? reply.data.choices[0].message.content : reply.data.choices[0].text
      )
    }
  }

  return {
    settingsHidden,
    tokensUsed,
    moneyUsed,
    messages,
    isApiKeyProvided,
    tokensExceeded,
    clearChat,
    createConversation
  }
})
