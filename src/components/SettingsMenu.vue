<template>
  <div
    class="z-10 flex h-full w-full shrink-0 grow-0 flex-col space-y-1 divide-y divide-neutral-600 overflow-y-scroll bg-neutral-700 p-5 shadow-xl md:w-72 lg:w-96"
  >
    <div class="mb-4">
      <settings-field
        label="API Key"
        link-text="(Get API Key)"
        link-href="https://platform.openai.com/api-keys"
        type="text"
        v-model="apiKey"
      />

      <settings-text-area
        label="System Prompt"
        placeholder="You are SaGPT..."
        tooltip="The system prompt helps you set the behavior of the assistant. It is written in 2nd person."
        v-model="systemPrompt"
      />
    </div>

    <div class="py-4">
      <settings-input
        label="Messages Limit"
        type="number"
        min="0"
        tooltip="How many recent messages are sent to the API. Fewer messages may lower the response quality, but also the token usage. (0 for unlimited)"
        v-model.number="messagesLimit"
      />

      <settings-input
        label="Tokens Limit"
        type="number"
        min="0"
        max="4096"
        tooltip="The maximum numbers of tokens you want to use for each messsage. (0 for unlimited)"
        v-model.number="tokensLimit"
      />
    </div>

    <div class="pt-4">
      <settings-range
        label="Temperature"
        min="0"
        max="2"
        step="0.1"
        tooltip="Higher values make the text more creative and diverse. Lower values make the text more predictable and accurate."
        v-model.number="temperature"
      />

      <settings-range
        label="Presence Penalty"
        min="-2"
        max="2"
        step="0.1"
        tooltip="Higher values reduce repetition but lower coherence. Lower values increase repetition but improve coherence."
        v-model.number="presencePenalty"
      />

      <settings-range
        label="Frequency Penalty"
        min="-2"
        max="2"
        step="0.1"
        tooltip="Higher values penalize repeated words but impair readability. Lower values favor repeated words but enhance readability."
        v-model.number="frequencyPenalty"
      />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useSettingsStore } from '../stores/SettingsStore';
import SettingsField from './SettingsField.vue';
import SettingsInput from './SettingsInput.vue';
import SettingsTextArea from './SettingsTextArea.vue';
import SettingsRange from './SettingsRange.vue';

const settingsStore = useSettingsStore();
const { apiKey, systemPrompt, messagesLimit, tokensLimit, temperature, presencePenalty, frequencyPenalty } =
  storeToRefs(settingsStore);

const settings = [
  { key: 'apiKey', ref: apiKey },
  { key: 'systemPrompt', ref: systemPrompt },
  { key: 'messagesLimit', ref: messagesLimit },
  { key: 'maxTotalTokens', ref: tokensLimit },
  { key: 'temperature', ref: temperature },
  { key: 'presencePenalty', ref: presencePenalty },
  { key: 'frequencyPenalty', ref: frequencyPenalty }
];

settings.forEach(({ key, ref }) => {
  watch(ref, (newValue) => {
    localStorage.setItem(key, newValue);
  });
});
</script>
