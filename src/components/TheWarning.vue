<template>
  <div v-if="isVisible" class="fixed left-1/2 -translate-x-1/2 transition-opacity duration-1000 rounded-lg bg-red-500 p-3" :class="{'opacity-0': !isVisible, 'opacity-100': isVisible}">
    <span class="font-bold">{{ title }}</span> {{ text }}
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  title: String,
  text: String,
  permanent: {
    type: Boolean,
    default: false
  }
});

const isVisible = ref(true);

onMounted(() => {
  if (!props.permanent) {
    setTimeout(() => {
      isVisible.value = false; // Inizia il fade-out
      setTimeout(() => {
        isVisible.value = null; // Rimuove il warning dal DOM dopo il fade-out
      }, 1000); // Durata del fade-out
    }, 3000); // Durata del warning visibile
  }
});

onBeforeUnmount(() => {
  clearTimeout(); // Pulisce il timeout se il componente viene distrutto prima del tempo
});
</script>