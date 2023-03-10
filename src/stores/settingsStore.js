import {defineStore} from "pinia";

export let useSettingsStore = defineStore('settings', {
    state() {
        return {
            gpt_turbo: true,
            api_key: "",
            system_prompt: "Sei SaGPT, un AI di Salvatore Giaquinto. Sei abbastanza concisa. Usi emoji per esprimerti",
            messages_limit: 5,
            max_total_tokens: 0,
            temperature: 0.5,
            presence_penalty: 0,
            frequency_penalty: 0
        }
    }
})