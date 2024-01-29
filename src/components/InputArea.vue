<template>
  <div class="mx-6 mb-2.5 mt-4 flex sm:mx-8 md:mx-12 lg:mx-16">
    <button
      @click="clearChat"
      :disabled="state.isError"
      class="mr-4 shrink-0 rounded-lg bg-red-500 p-2 transition hover:bg-red-600"
    >
      <svg class="fill-neutral-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" height="28">
        <g>
          <path
            d="M490.667,96c0-17.673-14.327-32-32-32h-80.555C364.632,25.757,328.549,0.13,288,0h-64   c-40.549,0.13-76.632,25.757-90.112,64H53.333c-17.673,0-32,14.327-32,32l0,0c0,17.673,14.327,32,32,32H64v266.667   C64,459.468,116.532,512,181.333,512h149.333C395.468,512,448,459.468,448,394.667V128h10.667   C476.34,128,490.667,113.673,490.667,96z M384,394.667C384,424.122,360.122,448,330.667,448H181.333   C151.878,448,128,424.122,128,394.667V128h256V394.667z"
          />
          <path
            d="M202.667,384c17.673,0,32-14.327,32-32V224c0-17.673-14.327-32-32-32s-32,14.327-32,32v128   C170.667,369.673,184.994,384,202.667,384z"
          />
          <path
            d="M309.333,384c17.673,0,32-14.327,32-32V224c0-17.673-14.327-32-32-32s-32,14.327-32,32v128   C277.333,369.673,291.66,384,309.333,384z"
          />
        </g>
      </svg>
    </button>
    <div class="w-full min-w-0 rounded-lg bg-neutral-700">
      <image-preview-area />
      <input-text-area />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../stores/AppStore';
import ImagePreviewArea from './ImagePreviewArea.vue';
import InputTextArea from './InputTextArea.vue';

const app = useAppStore();
const { state } = storeToRefs(app);
const { clearChat } = app;
</script>
