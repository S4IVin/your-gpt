<template>
  <div class="flex max-w-screen-xl mx-6 sm:mx-8 md:mx-12 lg:mx-16">
    <button
      @click="clearChat"
      :disabled="!properties.isApiKeyProvided"
      class="rounded-lg mr-4 bg-red-500 p-2 hover:bg-red-600"
    >
      <img src="/src/assets/clear.png" alt="Clear chat" class="invert" width="30" height="30" />
    </button>
    <div class="w-full min-w-0 bg-neutral-600 rounded-lg">
      <TheImagePreviewArea />
      <div class="flex">
        <TheUploadButton />
        <TheTextArea />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/AppStore';
import TheImagePreviewArea from './TheImagePreviewArea.vue';
import TheUploadButton from './TheUploadButton.vue';
import TheTextArea from './TheTextArea.vue';

const app = useAppStore();
const { properties } = storeToRefs(app);
const { clearChat } = app;
</script>
