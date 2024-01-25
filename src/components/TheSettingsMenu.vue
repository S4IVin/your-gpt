<template>
  <div class="w-96 fixed top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border-2 bg-neutral-500 p-5 shadow-lg space-y-1">
    <div class="flex items-start justify-between">
      <h1 class="align-text-top text-2xl font-bold -translate-y-2.5">Settings</h1>
      <button @click="state.isSettingsOpen = false">
        <img src="/src/assets/close.png" alt="close" width="18" height="18" class="invert" />
      </button>
    </div>

    <SettingsField label="API Key" link-text="(Get API Key)" link-href="" type="text" v-model="apiKey" />

    <SettingsTextArea
      label="System Prompt"
      placeholder="You are [name]... You are..."
      tooltip="The system prompt helps you set the behavior of the assistant. It is written in 2nd person."
      v-model="systemPrompt"
    />

    <div class="py-2">
      <hr />
    </div>

    <SettingsInput
      label="Messages Limit"
      type="text"
      tooltip="How many recent messages are sent to the API. Fewer messages may lower the response quality, but also the token usage. (0 for unlimited)"
      v-model.number="messagesLimit"
    />

    <SettingsInput
      label="Max Total Tokens"
      type="text"
      tooltip="The maximum numbers of tokens you want to use for the entire chat. (0 for unlimited)"
      v-model.number="maxTotalTokens"
    />

    <div class="py-2">
      <hr />
    </div>

    <SettingsRange
      label="Temperature"
      min="0"
      max="1"
      step="0.1"
      tooltip="Higher values make the text more creative and diverse. Lower values make the text more predictable and accurate."
      v-model.number="temperature"
    />

    <SettingsRange
      label="Presence Penalty"
      min="-2"
      max="2"
      step="0.1"
      tooltip="Higher values reduce repetition but lower coherence. Lower values increase repetition but improve coherence."
      v-model.number="presencePenalty"
    />

    <SettingsRange
      label="Frequency Penalty"
      min="-2"
      max="2"
      step="0.1"
      tooltip="Higher values penalize repeated words but impair readability. Lower values favor repeated words but enhance readability."
      v-model.number="frequencyPenalty"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useAppStore } from '@/stores/AppStore';
import SettingsField from './SettingsField.vue';
import SettingsInput from './SettingsInput.vue';
import SettingsTextArea from './SettingsTextArea.vue';
import SettingsRange from './SettingsRange.vue';

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const { state } = storeToRefs(appStore);
const { apiKey, systemPrompt, messagesLimit, maxTotalTokens, temperature, presencePenalty, frequencyPenalty } = storeToRefs(settingsStore);

const settings = [
  { key: 'apiKey', ref: apiKey },
  { key: 'systemPrompt', ref: systemPrompt },
  { key: 'messagesLimit', ref: messagesLimit },
  { key: 'maxTotalTokens', ref: maxTotalTokens },
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
