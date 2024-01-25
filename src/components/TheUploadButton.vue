<template>
  <label v-if="properties.isVisionEnabled" class="flex rounded-l-lg bg-neutral-600 p-2 items-center hover:bg-gray-600">
    <input
      v-show="false"
      id="file"
      type="file"
      accept="image/*"
      @change="addImage($event.target.files[0])"
      :disabled="!properties.isApiKeyProvided"
    />
    <img src="/src/assets/picture.png" alt="Upload" width="30" height="30" class="invert" />
  </label>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/AppStore';

const app = useAppStore();
const { properties } = storeToRefs(app);
const { addImage } = app;
</script>
