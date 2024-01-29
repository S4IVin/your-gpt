<template>
  <div
    v-if="state.images.length"
    class="flex gap-2.5 overflow-x-scroll border-b border-neutral-600 p-2.5"
    :class="{ 'opacity-50': state.isError }"
  >
    <ImagePreview
      v-for="(image, index) in state.images"
      :key="index"
      :image="image"
      :disabled="state.isError"
      @remove="clearImage(index)"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/AppStore';
import ImagePreview from './ImagePreview.vue';

const app = useAppStore();
const { state } = storeToRefs(app);
const { clearImage } = app;
</script>
