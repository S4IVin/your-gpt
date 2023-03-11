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
    const systemPrompt = ref(useStorage('systemPrompt', "Sei SaGPT, un AI di Salvatore Giaquinto. Sei abbastanza concisa. Usi emoji per esprimerti"))
    const messagesLimit = ref(useStorage('messagesLimit', 5))
    const maxTotalTokens = ref(useStorage('maxTotalTokens', 0))
    const temperature = ref(useStorage('temperature', 0.5))
    const presencePenalty = ref(useStorage('presencePenalty', 0))
    const frequencyPenalty = ref(useStorage('frequencyPenalty', 0))

    return {gptTurbo, apiKey, systemPrompt, messagesLimit, maxTotalTokens, temperature, presencePenalty, frequencyPenalty}
})