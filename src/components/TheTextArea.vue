<template>
  <div class="flex w-full">
    <input
      :disabled="isApiKeyProvided"
      id="file-upload"
      type="file"
      accept="images/*"
      @change="uploadImage($event.target.files[0])"
      class="hidden"
    />
    <label
      for="file-upload"
      :class="isVisionEnabled ? 'rounded-l-lg bg-neutral-600 p-2 hover:bg-gray-600' : 'hidden'"
    >
      <img src="/src/assets/picture.png" class="invert" width="32" height="32"/>
    </label>
    <textarea
      :disabled="isApiKeyProvided"
      v-model="text"
      rows="1"
      @keyup.enter.exact.prevent="
            app.createConversation(text, images);
            clearInput()
          "
      placeholder="Type here what you want to say..."
      :class="
            isVisionEnabled
              ? 'w-full overflow-y-hidden resize-none max-h-20 bg-neutral-500 p-2.5 focus:outline-none'
              : 'w-full overflow-y-hidden resize-none max-h-20 rounded-l-lg bg-neutral-500 p-2.5 focus:outline-none'
          "
    />
    <button
      :disabled="isApiKeyProvided"
      @click="
            app.createConversation(text, images)
            clearInput()
          "
      class="rounded-r-lg bg-neutral-600 p-2 hover:bg-gray-600"
    >
      Send
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from "pinia";
import { useAppStore } from '@/stores/AppStore'

const app = useAppStore();
const { isApiKeyProvided, isVisionEnabled } = storeToRefs(app);

const text = ref("");
const images = ref([]);

const uploadImage = async (image) => {
  return app.getBase64(image)
}

const clearImage = (index) => {
  if (index) {
    images.value.splice(index, 1)
  }
  else {
    images.value = [];
  }
}

const clearInput = () => {
  clearImage()
  text.value = ''
}
</script>