<template>
  <div v-if="state.images.length" class="flex overflow-x-scroll p-2.5 gap-2.5">
    <ImagePreview
      v-for="(image, index) in state.images"
      :key="index"
      :image="image"
      :disabled="!properties.isApiKeyProvided"
      @remove="clearImage(index)"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/AppStore';
import ImagePreview from './ImagePreview.vue';

const app = useAppStore();
const { state, properties } = storeToRefs(app);
const { clearImage } = app;
</script>
