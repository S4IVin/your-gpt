<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from './stores/AppStore';
import SettingsMenu from './components/SettingsMenu.vue';
import ModelSelector from './components/ModelSelector.vue';
import ChatMessages from './components/ChatMessages.vue';
import InputArea from './components/InputArea.vue';

const app = useAppStore();
const { state, properties } = storeToRefs(app);
const { toggleSettings } = app;
</script>

<template>
  <header
    class="s sticky z-20 flex w-full items-center justify-between border-b border-neutral-600 bg-neutral-700 p-1 shadow-lg"
  >
    <model-selector />
    <button
      class="ml-2 rounded-lg bg-neutral-700 fill-white p-2 transition hover:bg-neutral-600"
      @click="toggleSettings"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.667 490.667" width="32" height="32">
        <g>
          <path
            d="M469.333,224h-448C9.551,224,0,233.551,0,245.333c0,11.782,9.551,21.333,21.333,21.333h448   c11.782,0,21.333-9.551,21.333-21.333C490.667,233.551,481.115,224,469.333,224z"
          />
          <path
            d="M21.333,117.333h448c11.782,0,21.333-9.551,21.333-21.333s-9.551-21.333-21.333-21.333h-448C9.551,74.667,0,84.218,0,96   S9.551,117.333,21.333,117.333z"
          />
          <path
            d="M469.333,373.333h-448C9.551,373.333,0,382.885,0,394.667C0,406.449,9.551,416,21.333,416h448   c11.782,0,21.333-9.551,21.333-21.333C490.667,382.885,481.115,373.333,469.333,373.333z"
          />
        </g>
      </svg>
    </button>
  </header>
  <div
    class="flex h-full w-full overflow-y-scroll"
    @dragover.prevent="state.isDragOver = true"
    @dragleave.prevent="state.isDragOver = false"
  >
    <div class="relative mx-auto flex h-full w-full min-w-0 max-w-screen-xl flex-col">
      <chat-messages />
      <input-area />
    </div>
    <settings-menu v-show="state.isSettingsOpen" />
  </div>
</template>
