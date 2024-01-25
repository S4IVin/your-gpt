<template>
  <transition
    enter-active-class="transition-opacity duration-500"
    leave-active-class="transition-opacity duration-500"
    enter-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div v-show="isVisible" class="fixed left-1/2 -translate-x-1/2 transform rounded-lg bg-red-500 p-3">
      <span class="font-bold">Error: </span> {{ state.error.message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../stores/AppStore';

const app = useAppStore();
const { state } = storeToRefs(app);
const isVisible = ref(false);

watch(state.value.error, (newError) => {
  if (newError) {
    isVisible.value = true;
    setTimeout(() => {
      isVisible.value = false;
    }, 5000);
  }
});
</script>
