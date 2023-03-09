<template>
  <div class="fixed left-1/2 -translate-x-1/2 rounded-lg bg-red-500 p-3">
    <span class="font-bold">{{ title }}</span> {{ text }}
  </div>
</template>

<script setup>
defineProps({
  title: String,
  text: String
})
</script>
