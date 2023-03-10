import {defineStore} from "pinia";
import GPT3Tokenizer from 'gpt3-tokenizer'
import {Configuration, OpenAIApi} from "openai";
import {useSettingsStore} from "@/stores/settingsStore";

const settings = useSettingsStore()
const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })

export let useAppStore = defineStore('app', {
    state: () => {
        return {
            warning_hidden: true,
            settings_hidden: true,
            tokens_used: 0,
            money_used: 0,
            messages: [{role: 'system', content: settings.system_prompt}],
        }
    },
    actions: {
        createConversation: async (text) => {
            if (text) {
                this.addMessage('user', text)
                let reply = await this.generateReply()
                this.updateUsageAndCost(reply.data.usage.total_tokens)
                this.addMessage(
                    'assistant',
                    this.settings.gpt_turbo ? reply.data.choices[0].message.content : reply.data.choices[0].text
                )
            }
        },

        generateReply: () => {
            const getChatCompletion = this.generateConfiguration()
            const prompt = this.generatePrompt()

            return getChatCompletion({
                model: settings.gpt_turbo ? 'gpt-3.5-turbo' : 'text-davinci-003',
                messages: settings.gpt_turbo ? this.getMessages() : undefined,
                prompt: !settings.gpt_turbo ? prompt : undefined,
                max_tokens: !settings.gpt_turbo ? 4092 - this.getTokenCount(prompt) : undefined,
                temperature: !settings.gpt_turbo ? settings.temperature : undefined,
                presence_penalty: !settings.gpt_turbo ? settings.presence_penalty : undefined,
                frequency_penalty: !settings.gpt_turbo ? settings.frequency_penalty : undefined
            })
        },

        generateConfiguration: () => {
            const configuration = new Configuration({ apiKey: settings.api_key })
            const openai = new OpenAIApi(configuration)
            return settings.gpt_turbo ? (a) => openai.createChatCompletion(a) : (a) => openai.createCompletion(a)
        },

        generatePrompt: () => {
            const roles = { user: 'Human', assistant: 'AI' }
            let prompt = `La seguente è una conversazione con un AI. Il system prompt dell'AI è: ${settings.system_prompt}.\n`

            for (let message of this.getMessages().slice(1)) {
                prompt = `${prompt}\n ${roles[message.role]}: ${message.content}`
            }

            return `${prompt}\nAI: `
        },

        getMessages: () => {
            const messages_limit_disabled = settings.messages_limit === 0

            return messages_limit_disabled ? this.messages : this.extractItemsFromArray(this.messages)
        },

        addMessage: (role, text) => {
            this.messages.push({
                role: role,
                content: text
            })
        },

        getTokenCount: (text) => {
            return tokenizer.encode(text).text.length
        },

        updateUsageAndCost: (tokens) => {
            this.tokens_used = tokens + this.tokens_used
            this.money_used = Math.round(this.money_used * 0.02) / 10000
        },

        clearChat: () => {
            this.messages.length = 1
            this.tokens_used = 0
            this.money_used = 0
        },

        extractItemsFromArray: (array, x) => {
            if (x >= array.length) {
                return array;
            }

            const firstItem = [array[0]];
            const lastXItems = array.slice(-x);
            return firstItem.concat(lastXItems);
        }
    }

})