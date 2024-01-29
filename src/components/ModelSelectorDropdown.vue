<template>
  <div class="absolute top-full mt-1 w-96 rounded-lg bg-neutral-700 p-2 shadow-lg">
    <ul class="space-y-2">
      <li
        v-for="option in options"
        :key="option.value"
        @click="changeModel(option.value)"
        class="relative flex cursor-pointer items-center rounded-md px-4 py-2 transition"
        :class="{
          'bg-violet-600 bg-opacity-60 hover:bg-violet-500 hover:bg-opacity-60': option.value === 'gpt-4-0125-preview',
          'hover:bg-neutral-600': option.value !== 'gpt-4-0125-preview'
        }"
      >
        <div>
          <div class="font-bold">{{ option.label }}</div>
          <div class="w-full text-sm text-neutral-300">
            {{ option.description }}
          </div>
        </div>
        <svg
          class="absolute right-3 fill-neutral-300"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :d="
              isSelected(option.value)
                ? 'm12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10c0-1.1-0.2-2.1992-0.5-3.1992l-1.6992 1.5996c0.1 0.5 0.19922 0.99961 0.19922 1.5996 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c1.6 0 3.1004 0.50078 4.4004 1.3008l1.4004-1.4004c-1.6-1.2-3.6008-1.9004-5.8008-1.9004zm9.3008 1.3008-10.301 10.299-3.3008-3.2988-1.3984 1.3984 4.6992 4.7012 11.699-11.701-1.3984-1.3984z'
                : 'm12 2c-5.511 0-10 4.489-10 10 0 5.511 4.489 10 10 10 5.511 0 10-4.489 10-10 0-5.511-4.489-10-10-10zm0 2c4.4301 0 8 3.5699 8 8 0 4.4301-3.5699 8-8 8-4.4301 0-8-3.5699-8-8 0-4.4301 3.5699-8 8-8z'
            "
          />
        </svg>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useSettingsStore } from '../stores/SettingsStore';

const settings = useSettingsStore();

const options = [
  {
    value: 'gpt-4-0125-preview',
    label: 'GPT-4 Turbo 💡',
    description: 'Very smart but expensive, with image generation capabilities ($0.045/1KT)'
  },
  {
    value: 'gpt-4-vision-preview',
    label: 'GPT-4 Vision 👁️',
    description: 'Smart but expensive, with vision capabilities ($0.045/1KT)'
  },
  {
    value: 'gpt-3.5-turbo-1106',
    label: 'GPT-3.5 💸',
    description: 'Less smart but very cheap ($0.0015/1KT)'
  }
];
const isSelected = (value) => {
  return value === settings.gptModel;
};

const changeModel = (value) => {
  settings.gptModel = value;
  localStorage.setItem('gptModel', value);
};
</script>
