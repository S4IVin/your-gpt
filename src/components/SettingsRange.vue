<template>
  <tooltip :text="tooltip">
    <label class="flex flex-col">
      {{ label }} {{ modelValue }}
      <input v-model="model" type="range" :min="min" :max="max" :step="step" />
    </label>
  </tooltip>
</template>

<script setup>
import Tooltip from './Tooltip.vue';

defineProps({
  label: String,
  min: [String, Number],
  max: [String, Number],
  step: [String, Number],
  tooltip: String
});

const model = defineModel();
</script>
