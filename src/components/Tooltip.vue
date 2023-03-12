<template>
  <div class="relative">
    <div @mouseover="hovering = true" @mouseleave="hovering = false">
      <slot></slot>
    </div>
    <div
      v-if="hovering"
      :style="style"
      class="absolute z-20 rounded-lg bg-gray-500 text-sm leading-tight text-white shadow-lg p-1.5 offset"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  width: String,
  offset_y: [String, Object],
  offset_x: [String, Object]
})

const hovering = ref(false)
const style = {
  bottom: `${-props.offset_y}rem`,
  left: `${props.offset_x}rem`,
  width: `${props.width}rem`
}
</script>
