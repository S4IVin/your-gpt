import { ref } from 'vue';
import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useSettingsStore = defineStore('settings', () => {
  const useStorage = (itemName, isNumber, value) => {
    let itemValue = localStorage.getItem(itemName);
    itemValue = itemValue === null ? value : itemValue;
    return isNumber ? parseFloat(itemValue) : itemValue;
  };

  const gptModel = ref(useStorage('gptModel', false, 'gpt-3.5-turbo-1106'));
  const apiKey = ref(useStorage('apiKey', false, ''));
  const systemPrompt = ref(useStorage('systemPrompt', false, 'You are SaGPT. You are quite concise.'));
  const messagesLimit = ref(useStorage('messagesLimit', true, 5));
  const tokensLimit = ref(useStorage('tokensLimit', true, 0));
  const temperature = ref(useStorage('temperature', true, 0.5));
  const presencePenalty = ref(useStorage('presencePenalty', true, 0));
  const frequencyPenalty = ref(useStorage('frequencyPenalty', true, 0));

  return {
    gptModel,
    apiKey,
    systemPrompt,
    messagesLimit,
    tokensLimit,
    temperature,
    presencePenalty,
    frequencyPenalty
  };
});
