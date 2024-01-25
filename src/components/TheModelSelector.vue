<template>
  <div class="flex">
    <tooltip v-for="model in models" :key="model.id" :text="model.tooltip">
      <button
        @click="changeModel(model.value)"
        :class="[
          'p-2',
          { 'rounded-l-lg': model.id === 1, 'rounded-r-lg': model.id === 3, 'border-x-2': model.id === 2 },
          settings.gptModel === model.value ? 'bg-gray-500' : 'bg-neutral-500'
        ]"
      >
        {{ model.label }}
      </button>
    </tooltip>
  </div>
</template>

<script setup>
import Tooltip from '@/components/Tooltip.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const settings = useSettingsStore();

const models = [
  { id: 1, label: 'GPT-4 V', value: 'gpt-4-vision-preview', tooltip: 'Very smart but expensive, with vision and image generation capabilities.' },
  { id: 2, label: 'GPT-4', value: 'gpt-4-1106-preview', tooltip: 'Very smart but expensive.' },
  { id: 3, label: 'GPT-3.5', value: 'gpt-3.5-turbo-1106', tooltip: 'Cheaper but less smart.' }
];

const changeModel = (value) => {
  settings.gptModel = value;
  localStorage.setItem('gptModel', value);
};
</script>
