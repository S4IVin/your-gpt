import { ref } from 'vue'
import { defineStore } from 'pinia'

// eslint-disable-next-line import/prefer-default-export
export const useSettingsStore = defineStore('settings', () => {
  const useStorage = (itemName, isNumber, value) => {
    let itemValue = localStorage.getItem(itemName)
    itemValue = itemValue === null ? value : itemValue
    return isNumber ? parseFloat(itemValue) : itemValue
  }

  const gptTurbo = ref(useStorage('gptTurbo', false, true))
  const apiKey = ref(useStorage('apiKey', false, ''))
  const userRole = ref(useStorage('userRole', false, 'User'))
  const assistantRole = ref(useStorage('assistantRole', false, 'YourGPT'))
  const systemPrompt = ref(useStorage('systemPrompt', false, 'You are YourGPT. You are quite concise, you use emojis to express yourself.'))
  const davinciPrompt = ref(useStorage('davinciPrompt', false, 'The following is a conversation with YourGPT. YourGPT is quite concise, it uses emojis to express itself.'))
  const messagesLimit = ref(useStorage('messagesLimit', true, 5))
  const maxTotalTokens = ref(useStorage('maxTotalTokens', true, 0))
  const temperature = ref(useStorage('temperature', true, 0.5))
  const presencePenalty = ref(useStorage('presencePenalty', true, 0))
  const frequencyPenalty = ref(useStorage('frequencyPenalty', true, 0))

  return {
    gptTurbo,
    apiKey,
    userRole,
    assistantRole,
    systemPrompt,
    davinciPrompt,
    messagesLimit,
    maxTotalTokens,
    temperature,
    presencePenalty,
    frequencyPenalty
  }
})
