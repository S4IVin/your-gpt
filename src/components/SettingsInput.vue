<template>
  <tooltip :text="tooltip">
    <label class="flex justify-between">
      {{ label }}
      <input
        v-model="model"
        :type="type"
        :max="max"
        class="mt-1 h-6 w-1/4 rounded-md border bg-neutral-600 text-center focus:outline-none"
      />
    </label>
  </tooltip>
</template>

<script setup>
import Tooltip from './Tooltip.vue';

defineProps({
  label: String,
  type: String,
  min: String,
  max: String,
  tooltip: String
});

const model = defineModel();
</script>
