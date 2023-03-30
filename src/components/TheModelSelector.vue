<template>
  <tooltip
    offset_y="4.5"
    offset_x="-3"
    width="10"
    text="GPT-4 based model 1/3 more expensive than GPT-4, very smart."
  >
    <button
      @click="changeModel(true)"
      :class="{
        'p-2 rounded-l-lg border-r-2': true,
        'bg-neutral-500': !settings.gpt4,
        'bg-gray-500': settings.gpt4
      }"
    >
      GPT-4
    </button>
  </tooltip>
  <tooltip
    offset_y="5.5"
    offset_x="-3"
    width="10"
    text="GPT-3 based model 1/3 cheaper than GPT-4, with no filtering but less smart."
  >
    <button
      @click="changeModel(false)"
      :class="{
        'p-2 rounded-r-lg': true,
        'bg-neutral-500': settings.gpt4,
        'bg-gray-500': !settings.gpt4
      }"
    >
      GPT-3
    </button>
  </tooltip>
</template>

<script setup>
import Tooltip from '@/components/Tooltip.vue'
import { useSettingsStore } from '@/stores/SettingsStore'

const settings = useSettingsStore()

const changeModel = (value) => {
  settings.gpt4 = value
  localStorage.setItem('gptTurbo', value)
}
</script>

<style scoped></style>
