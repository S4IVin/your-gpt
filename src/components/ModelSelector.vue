<template>
  <div class="flex items-center rounded-lg bg-neutral-700">
    <button
      ref="ignoreButton"
      @click="toggleSelector"
      class="flex items-center rounded-lg px-4 py-2 transition hover:bg-neutral-600"
      :class="{ 'bg-neutral-600': isSelectorOpen }"
    >
      <div class="text-2xl font-bold">SaGPT</div>
      <div
        class="mx-2 text-xl text-neutral-300"
        :class="{
          'text-violet-400': settings.gptModel === 'gpt-4-0125-preview'
        }"
      >
        {{ modelVersion }}
      </div>
      <svg
        class="translate-y-0.5 fill-neutral-300"
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z"
        />
      </svg>
    </button>
    <model-selector-dropdown v-on-click-outside="onClickOutsideHandler" v-if="isSelectorOpen" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import { useSettingsStore } from '../stores/SettingsStore';
import ModelSelectorDropdown from './ModelSelectorDropdown.vue';

const settings = useSettingsStore();
const isSelectorOpen = ref(false);
const ignoreButton = ref();

const onClickOutsideHandler = [
  () => {
    isSelectorOpen.value = false;
  },
  { ignore: [ignoreButton] }
];

const toggleSelector = () => {
  isSelectorOpen.value = !isSelectorOpen.value;
};

const modelVersion = computed(() => {
  if (settings.gptModel === 'gpt-4-0125-preview') {
    return '4.0';
  }
  if (settings.gptModel === 'gpt-4-vision-preview') {
    return '4.0';
  }
  return '3.5';
});
</script>
