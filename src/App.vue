<script setup>
import SettingsMenu from '@/components/SettingsMenu.vue'
import ChatMessages from '@/components/ChatMessages.vue'
import TextArea from '@/components/TextArea.vue'
import Tooltip from '@/components/Tooltip.vue'
import Warning from '@/components/Warning.vue'
import {useAppStore} from "@/stores/appStore";

const app = useAppStore()

//app.warning_hidden = !!settings.api_key

/*watch([settings.max_total_tokens, app.tokens_used], () => {
  app.tokens_exceeded = settings.max_total_tokens < app.tokens_used && settings.max_total_tokens !== 0
})*/
</script>

<template>
  <header class="fixed top-0 w-full">
    <div class="flex justify-between bg-neutral-700 p-2 shadow-lg">
      <h1 class="flex items-center text-3xl font-bold">YourGPT</h1>
      <div class="flex">
        <tooltip
          offset_y="5.5"
          offset_x="-3"
          width="10"
          text="GPT-3.5 based model optimized for chat at 1/10th of Davinci, but heavily filtered."
        >
          <button
            @click="app.enableGPTTurbo"
            :class="{
              'p-2 rounded-l-lg border-r-2': true,
              'bg-neutral-500': !settings.gpt_turbo,
              'bg-gray-500': settings.gpt_turbo
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
            @click="settings.gpt_turbo = false"
            :class="{
              'p-2 rounded-r-lg': true,
              'bg-neutral-500': settings.gpt_turbo,
              'bg-gray-500': !settings.gpt_turbo
            }"
          >
            Davinci
          </button>
        </tooltip>
        <button @click="app.settings_hidden = false">
          <img
            class="ml-2 rounded-lg bg-neutral-500 invert p-1.5"
            src="/src/assets/menu.png"
            width="40"
            height="40"
          />
        </button>
        <h2
          :class="{
            'ml-2 flex items-center border-l-2 px-3 text-2xl': true,
            'text-red-500': app.tokens_exceeded
          }"
        >
          {{ app.tokens_used }}
        </h2>
      </div>
    </div>
  </header>
  <settings-menu
    :class="app.settings_hidden ? 'hidden' : undefined"
    @closeSettings="() => (app.settings_hidden = true)"
  ></settings-menu>
  <warning
    title="Warning!"
    text="No API Key provided."
    :class="app.warning_hidden ? 'hidden' : undefined"
  ></warning>
  <chat-messages class="mt-20 mb-20" :messages="app.messages"></chat-messages>
  <div class="fixed bottom-0 w-full bg-neutral-700 py-2.5" ref="chatContainer">
    <text-area
      :class="!app.warning_hidden || app.tokens_exceeded ? 'opacity-50' : undefined"
      :disabled="!app.warning_hidden || app.tokens_exceeded"
      @clear="app.clearChat"
      @submit="(text) => app.createConversation(text)"
    ></text-area>
  </div>
</template>
