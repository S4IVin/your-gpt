<template>
  <tooltip
    offset_y="5.5"
    offset_x="-3"
    width="10"
    text="GPT-4 based model 14x more expensive than GPT-3.5, but very smart."
  >
    <button
      @click="changeModel('gpt-4')"
      :class="`p-2 rounded-l-lg ${settings.gptModel === 'gpt-4' ? 'bg-gray-500' : 'bg-neutral-500'}`"
    >
      GPT-4
    </button>
  </tooltip>
  <tooltip
    offset_y="4.4"
    offset_x="-3"
    width="10"
    text="GPT-3.5 based model 14x less expensive than GPT-4, yet pretty smart."
  >
    <button
      @click="changeModel('gpt-3.5-turbo')"
      :class="`p-2 border-x-2 ${settings.gptModel === 'gpt-3.5-turbo' ? 'bg-gray-500' : 'bg-neutral-500'}`"
    >
      GPT-3.5
    </button>
  </tooltip>
  <tooltip
    offset_y="5.5"
    offset_x="-3"
    width="10"
    text="GPT-3 based model 10x more expensive than GPT-3.5, with no filtering but less smart."
  >
    <button
      @click="changeModel('text-davinci-003')"
      :class="`p-2 rounded-r-lg ${settings.gptModel === 'text-davinci-003' ? 'bg-gray-500' : 'bg-neutral-500'}`"
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
  settings.gptModel = value
  localStorage.setItem('gptModel', value)
}
</script>

<style scoped></style>
