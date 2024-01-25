<template>
  <div className="image-scroll-container">
    <ImageComponent
      v-for="(image, index) in state.images"
      :key="index"
      :src="image"
      :disabled="!properties.isApiKeyProvided"
      @remove="app.clearImage(index)"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/AppStore';
import ImageComponent from './ImageComponent.vue';

const app = useAppStore();
const { state, properties } = storeToRefs(app);
</script>
