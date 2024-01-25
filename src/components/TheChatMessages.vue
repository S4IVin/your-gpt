<template>
  <div class="flex flex-col space-y-4 my-20" :class="{ 'mb-56': properties.isImagePreviewOpen }">
    <component
      v-for="message in app.getMessages()"
      :is="message.type === 'text' ? TextMessage : ImageMessage"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<script setup>
import { onUpdated } from 'vue';
import { useAppStore } from '@/stores/AppStore';
import TextMessage from './TextMessage.vue';
import ImageMessage from './ImageMessage.vue';
import { storeToRefs } from 'pinia';

const app = useAppStore();
const { properties } = storeToRefs(app);

onUpdated(() => {
  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
});
</script>