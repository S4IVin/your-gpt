<template>
  <div class="mx-auto flex h-full w-full flex-col overflow-y-scroll" ref="messagesContainer">
    <component
      v-for="message in app.getMessages()"
      :is="message.type === 'text' ? TextMessage : ImageMessage"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref, watch } from 'vue';
import { useAppStore } from '../stores/AppStore';
import TextMessage from './ChatMessageText.vue';
import ImageMessage from './ChatMessageImage.vue';

const app = useAppStore();
const messagesContainer = ref();

const scrollToBottom = () => {
  nextTick(() => {
    const { scrollHeight } = messagesContainer.value;
    messagesContainer.value.scrollTop = scrollHeight;
  });
};

onMounted(scrollToBottom);

watch(
  () => app.getMessages(),
  () => {
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    if (isAtBottom) {
      scrollToBottom();
    }
  }
);
</script>
