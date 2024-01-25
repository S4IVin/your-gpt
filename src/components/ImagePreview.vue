<template>
  <div class="flex shrink-0 rounded-lg bg-neutral-700 p-2 w-40 h-32 justify-center relative">
    <button
      class="absolute top-1.5 right-1.5 p-1.5 rounded bg-red-500 hover:bg-red-600"
      @click="$emit('remove')"
      :disabled="disabled"
    >
      <img src="/src/assets/close.png" alt="Close" width="12" height="12" class="invert" />
    </button>
    <img :src="image" alt="Image" class="object-contain" />
  </div>
</template>

<script setup>
defineProps({
  image: String,
  disabled: Boolean
});
</script>
