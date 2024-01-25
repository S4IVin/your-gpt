<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/AppStore';
import TheSettingsMenu from '@/components/TheSettingsMenu.vue';
import TheModelSelector from '@/components/TheModelSelector.vue';
import TheChatMessages from '@/components/TheChatMessages.vue';
import TheInputArea from '@/components/TheInputArea.vue';
import TheWarning from '@/components/TheWarning.vue';

const app = useAppStore();
const { state, properties } = storeToRefs(app);
</script>

<template>
  <header class="fixed top-0 w-full bg-neutral-700 p-2 flex justify-between">
    <h1 class="text-2xl font-bold">SaGPT</h1>
    <div class="flex">
      <the-model-selector />
      <button class="p-2 ml-2 rounded-lg bg-neutral-500 hover:bg-gray-500" @click="state.isSettingsOpen = true">
        <img src="/src/assets/settings.png" class="w-6 h-6 invert" />
      </button>
    </div>
  </header>
  <the-settings-menu v-if="state.isSettingsOpen" />
  <the-warning />
  <the-chat-messages class="max-w-screen-xl mx-auto" />
  <div class="fixed justify-center bottom-0 w-full bg-neutral-700 py-2.5">
    <div class="w-full max-w-screen-xl mx-auto">
      <the-input-area :class="{ 'opacity-50': !properties.isApiKeyProvided }" />
    </div>
  </div>
</template>
