import { ref } from 'vue'
import { defineStore } from 'pinia'

// eslint-disable-next-line import/prefer-default-export
export const useSettingsStore = defineStore('settings', () => {
  const useStorage = (itemName, isNumber, value) => {
    let itemValue = localStorage.getItem(itemName)
    itemValue = itemValue === null ? value : itemValue
    return isNumber ? parseFloat(itemValue) : itemValue
  }

  const gptModel = ref(useStorage('gptModel', false, "gpt-3.5-turbo"))
  const apiKey = ref(useStorage('apiKey', false, ''))
  const userRole = ref(useStorage('userRole', false, 'User'))
  const assistantRole = ref(useStorage('assistantRole', false, 'SaGPT'))
  const systemPrompt = ref(useStorage('systemPrompt', false, 'You are SaGPT. You are quite concise.'))
  const davinciPrompt = ref(useStorage('davinciPrompt', false, 'The following is a conversation with SaGPT. SaGPT is quite concise.'))
  const messagesLimit = ref(useStorage('messagesLimit', true, 5))
  const maxTotalTokens = ref(useStorage('maxTotalTokens', true, 0))
  const temperature = ref(useStorage('temperature', true, 0.8))
  const presencePenalty = ref(useStorage('presencePenalty', true, 0))
  const frequencyPenalty = ref(useStorage('frequencyPenalty', true, 0))

  return {
    gptModel,
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
