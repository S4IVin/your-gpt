<template>
  <tooltip
      offset_y="5.5"
      offset_x="-3"
      width="10"
      text="GPT-3.5 based model optimized for chat at 1/10th of Davinci, but heavily filtered."
  >
    <button
        @click="changeModel(true)"
        :class="{
              'p-2 rounded-l-lg border-r-2': true,
              'bg-neutral-500': !settings.gptTurbo,
              'bg-gray-500': settings.gptTurbo
            }"
    >
      Turbo
    </button>
  </tooltip>
  <tooltip
      offset_y="5.5"
      offset_x="-3"
      width="10"
      text="GPT-3 based model 10x more expensive than GPT-3.5, but with no filtering."
  >
    <button
        @click="changeModel(false)"
        :class="{
              'p-2 rounded-r-lg': true,
              'bg-neutral-500': settings.gptTurbo,
              'bg-gray-500': !settings.gptTurbo
            }"
    >
      Davinci
    </button>
  </tooltip>
</template>

<script setup>
import Tooltip from "@/components/Tooltip.vue";
import {useSettingsStore} from "@/stores/SettingsStore";

const settings = useSettingsStore()

const changeModel = (value) => {
  settings.gptTurbo = value
  localStorage.setItem('gptTurbo', value)
}
</script>

<style scoped>

</style>