<template>
  <div class="mx-6 flex w-full bg-neutral-600 rounded-lg sm:mx-16 md:mx-24 lg:mx-32">
    <the-image-display-area :images="app.images"></the-image-display-area>
    <div>
      <input
        id="file-upload"
        type="file"
        accept="images/*"
        @change="app.addImage($event.target.files[0])"
        class="hidden"
      />
      <label
        for="file-upload"
        :class="isVisionEnabled ? 'rounded-l-lg bg-neutral-600 p-2 hover:bg-gray-600' : 'hidden'"
      >
        <img src="/src/assets/picture.png" class="invert" width="32" height="32" />
      </label>
      <textarea
        @change="app.setText($event.target.value)"
        @keyup.enter.exact.prevent="app.createConversation()"
        rows="1"
        placeholder="Type here what you want to say..."
        :class="
          isVisionEnabled
            ? 'w-full overflow-y-hidden resize-none max-h-20 bg-neutral-500 p-2.5 focus:outline-none'
            : 'w-full overflow-y-hidden resize-none max-h-20 rounded-l-lg bg-neutral-500 p-2.5 focus:outline-none'
        "
      />
      <button
        @click="app.createConversation()"
        class="rounded-r-lg bg-neutral-600 p-2 hover:bg-gray-600"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/AppStore'
import TheImageDisplayArea from './TheImageDisplayArea.vue'

const app = useAppStore()
const { isVisionEnabled } = storeToRefs(app)
</script>