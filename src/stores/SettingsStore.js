import {ref} from "vue";
import {defineStore} from "pinia";

// eslint-disable-next-line import/prefer-default-export
export const useSettingsStore = defineStore('settings', () => {
    const useStorage = (itemName, value) => {
        const itemValue = localStorage.getItem(itemName)
        return itemValue === null ? value : itemValue
    }

    const gptTurbo = ref(useStorage('gptTurbo', true))
    const apiKey = ref(useStorage('apiKey', ""))
    const userRole = ref(useStorage('userRole', "User"))
    const assistantRole = ref(useStorage('assistantRole', "YourGPT"))
    const systemPrompt = ref(useStorage('systemPrompt', "You are YourGPT. You are quite concise, you use emojis to express yourself."))
    const davinciPrompt = ref(useStorage('davinciPrompt', "The following is a conversation with YourGPT. YourGPT is quite concise, it uses emojis to express itself."))
    const messagesLimit = ref(useStorage('messagesLimit', 5))
    const maxTotalTokens = ref(useStorage('maxTotalTokens', 0))
    const temperature = ref(useStorage('temperature', 0.5))
    const presencePenalty = ref(useStorage('presencePenalty', 0))
    const frequencyPenalty = ref(useStorage('frequencyPenalty', 0))

    return {gptTurbo, apiKey, userRole, assistantRole, systemPrompt, davinciPrompt, messagesLimit, maxTotalTokens, temperature, presencePenalty, frequencyPenalty}
})