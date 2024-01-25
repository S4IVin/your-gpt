<template>
  <tooltip :text="tooltip">
    <label class="flex justify-between">
      {{ label }}
      <input
        v-model="model"
        :type="type"
        class="w-1/4 mt-1 h-6 rounded-md border-2 bg-neutral-500 text-center focus:outline-none"
      />
    </label>
  </tooltip>
</template>

<script setup>
import Tooltip from './Tooltip.vue';

defineProps({
  label: String,
  type: String,
  tooltip: String
});

const model = defineModel();
</script>
