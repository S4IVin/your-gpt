<template>
  <tooltip :text="tooltip">
    <label class="flex flex-col">
      {{ label }}
      <textarea
        v-model="model"
        :placeholder="placeholder"
        class="w-full mt-1 h-24 resize-none rounded-md border-2 bg-neutral-500 p-1 focus:outline-none"
      ></textarea>
    </label>
  </tooltip>
</template>

<script setup>
import Tooltip from './Tooltip.vue';

defineProps({
  label: String,
  placeholder: String,
  tooltip: String
});

const model = defineModel();
</script>
