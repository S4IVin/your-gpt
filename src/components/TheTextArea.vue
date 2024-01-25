<template>
  <div
    class="flex w-full"
    @dragover.prevent="isDragOver = true"
    @dragleave.prevent="isDragOver = false"
    @drop.prevent="handleDrop"
  >
    <textarea
      v-model="state.text"
      @keydown.enter.exact.prevent="handleSendMessage"
      @paste="handlePaste"
      rows="1"
      placeholder="Type here what you want to say..."
      :disabled="!properties.isApiKeyProvided"
      class="w-full overflow-y-hidden resize-none max-h-20 bg-neutral-500 p-2.5 focus:outline-none"
      :class="{ 'rounded-l-lg': !properties.isVisionEnabled, 'h-32 border-blue-400 border-4': isDragOver }"
    />
    <button
      @click="handleSendMessage"
      :disabled="!properties.isApiKeyProvided"
      class="rounded-r-lg bg-neutral-600 p-2 hover:bg-gray-600"
    >
      Send
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/AppStore';

const app = useAppStore();
const { state, properties } = storeToRefs(app);
const isDragOver = ref(false);

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
}

const handleSendMessage = () => {
  app.createConversation();
  app.clearInput();
}

const handlePaste = (event) => {
  readImageFromClipboard(event.clipboardData);
}

const handleDrop = (event) => {
  isDragOver.value = false;
  readImageFromClipboard(event.dataTransfer);
}
</script>
