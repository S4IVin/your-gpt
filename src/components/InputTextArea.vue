<template>
  <div class="mt-px flex w-full" @drop.prevent="handleDrop">
    <label
      v-if="properties.isVisionEnabled"
      class="my-1 ml-1.5 flex shrink-0 items-center rounded-lg bg-neutral-700 p-1 transition hover:bg-neutral-600"
      :class="{ 'opacity-50 hover:bg-neutral-700': state.isError }"
    >
      <input
        v-show="false"
        id="file"
        type="file"
        accept="image/*"
        @change="addImage($event.target.files[0])"
        :disabled="state.isError"
      />
      <svg class="fill-neutral-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path
          d="M19.5,0H4.5A4.505,4.505,0,0,0,0,4.5v15A4.505,4.505,0,0,0,4.5,24h15A4.505,4.505,0,0,0,24,19.5V4.5A4.505,4.505,0,0,0,19.5,0ZM4.5,3h15A1.5,1.5,0,0,1,21,4.5v15a1.492,1.492,0,0,1-.44,1.06l-8.732-8.732a4,4,0,0,0-5.656,0L3,15V4.5A1.5,1.5,0,0,1,4.5,3Z"
        />
        <circle cx="15.5" cy="7.5" r="2.5" />
      </svg>
    </label>
    <textarea
      v-model="state.text"
      @keydown.enter.exact.prevent="handleSendMessage"
      @paste="handlePaste"
      rows="1"
      :placeholder="state.isDragOver && !state.isError ? 'Drop Image Here' : 'Message SaGPT...'"
      :disabled="state.isError"
      class="w-full resize-none overflow-y-hidden bg-neutral-700 p-2.5 focus:outline-none"
      :class="{
        'rounded-l-lg': !properties.isVisionEnabled,
        'h-32 border-4 border-blue-400': state.isDragOver && !state.isError,
        'opacity-50': state.isError
      }"
    />
    <button
      v-if="!state.isError"
      @click="handleSendMessage"
      :disabled="state.isError"
      class="m-1 shrink-0 rounded-lg bg-neutral-700 p-1 text-neutral-100 transition hover:bg-neutral-600"
    >
      <svg class="fill-neutral-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path
          d="M16.74,10.475c.559,.566,.158,1.525-.638,1.525h-2.602v4.5c0,.829-.672,1.5-1.5,1.5s-1.5-.671-1.5-1.5v-4.5h-2.602c-.795,0-1.196-.959-.638-1.525l4.188-4.243c.304-.308,.8-.308,1.104,0l4.188,4.243Zm7.26-4.975v13c0,3.033-2.468,5.5-5.5,5.5H5.5c-3.032,0-5.5-2.467-5.5-5.5V5.5C0,2.467,2.468,0,5.5,0h13c3.032,0,5.5,2.467,5.5,5.5Zm-3,0c0-1.378-1.121-2.5-2.5-2.5H5.5c-1.379,0-2.5,1.122-2.5,2.5v13c0,1.378,1.121,2.5,2.5,2.5h13c1.379,0,2.5-1.122,2.5-2.5V5.5Z"
        />
      </svg>
    </button>
    <button
      v-if="state.isError"
      @click="reloadConversation(true)"
      class="m-1 shrink-0 rounded-lg bg-neutral-700 p-1 text-neutral-100 opacity-100 transition hover:bg-neutral-600"
    >
      <svg
        class="fill-neutral-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 511.494 511.494"
        width="24"
        height="24"
      >
        <g>
          <path
            d="M478.291,255.492c-16.133,0.143-29.689,12.161-31.765,28.16c-15.37,105.014-112.961,177.685-217.975,162.315   S50.866,333.006,66.236,227.992S179.197,50.307,284.211,65.677c35.796,5.239,69.386,20.476,96.907,43.959l-24.107,24.107   c-8.33,8.332-8.328,21.84,0.004,30.17c4.015,4.014,9.465,6.262,15.142,6.246h97.835c11.782,0,21.333-9.551,21.333-21.333V50.991   c-0.003-11.782-9.556-21.331-21.338-21.329c-5.655,0.001-11.079,2.248-15.078,6.246l-28.416,28.416   C320.774-29.34,159.141-19.568,65.476,86.152S-18.415,353.505,87.304,447.17s267.353,83.892,361.017-21.828   c32.972-37.216,54.381-83.237,61.607-132.431c2.828-17.612-9.157-34.183-26.769-37.011   C481.549,255.641,479.922,255.505,478.291,255.492z"
          />
        </g>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../stores/AppStore';

const app = useAppStore();
const { state, properties } = storeToRefs(app);
const { addImage, reloadConversation } = app;

const readImageFromClipboard = (clipboardData) => {
  const items = Array.from(clipboardData.items);
  items.forEach((item) => {
    if (item.kind === 'file' && item.type.startsWith('image/')) {
      const image = item.getAsFile();
      if (image) {
        app.addImage(image);
      }
    }
  });
};

const handleSendMessage = () => {
  app.createConversation();
  app.clearInput();
};

const handlePaste = (event) => {
  if (!state.value.isError) {
    readImageFromClipboard(event.clipboardData);
  }
};

const handleDrop = (event) => {
  state.value.isDragOver = false;
  if (!state.value.isError) {
    readImageFromClipboard(event.dataTransfer);
  }
};
</script>
