<template>
  <div class="relative" @mouseover="hovering = true" @mouseleave="hovering = false">
    <slot></slot>
    <div
      v-if="hovering && text"
      class="absolute z-20 rounded-lg bg-neutral-600 p-2 text-sm leading-tight text-white shadow-lg"
      :class="computePositionClasses"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const hovering = ref(false);

const props = defineProps({
  text: String,
  position: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  }
});

const computePositionClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return 'bottom-full mb-2';
    case 'bottom':
      return 'top-full mt-2';
    case 'left':
      return 'right-full mr-2';
    case 'right':
      return 'left-full ml-2';
    default:
      return '';
  }
});
</script>
