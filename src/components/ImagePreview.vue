<template>
  <div class="relative flex h-32 w-40 shrink-0 justify-center rounded-lg bg-neutral-600 p-2 shadow-lg">
    <button
      class="absolute right-1.5 top-1.5 rounded bg-red-500 transition hover:bg-red-600"
      @click="$emit('remove')"
      :disabled="disabled"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="fill-white">
        <path
          d="M14.121,12,18,8.117A1.5,1.5,0,0,0,15.883,6L12,9.879,8.11,5.988A1.5,1.5,0,1,0,5.988,8.11L9.879,12,6,15.882A1.5,1.5,0,1,0,8.118,18L12,14.121,15.878,18A1.5,1.5,0,0,0,18,15.878Z"
        />
      </svg>
    </button>
    <img :src="image" alt="Image" class="object-contain" />
  </div>
</template>

<script setup>
defineProps({ image: String, disabled: Boolean });
</script>
