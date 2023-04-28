<script setup>
import TheSettingsMenu from '@/components/TheSettingsMenu.vue'
import TheModelSelector from '@/components/TheModelSelector.vue'
import TheChatMessages from '@/components/TheChatMessages.vue'
import TheTextArea from '@/components/TheTextArea.vue'
import Warning from '@/components/Warning.vue'
import { useAppStore } from '@/stores/AppStore'

const app = useAppStore()
</script>

<template>
  <header class="fixed top-0 w-full">
    <div class="flex justify-between bg-neutral-700 p-2 shadow-lg">
      <h1 class="flex items-center text-2xl font-bold">SaGPT</h1>
      <div class="flex">
        <the-model-selector></the-model-selector>
        <button class="bg-neutral-500 rounded-lg ml-2" @click="app.settingsHidden = false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>

        </button>
        <h2
          :class="{
            'mx-2 items-center border-l-2 pl-3 text-2xl hidden sm:flex': true,
            'text-red-500': app.tokensExceeded
          }"
        >
          {{ app.tokensUsed }}
        </h2>
      </div>
    </div>
  </header>
  <the-settings-menu
    :class="app.settingsHidden ? 'hidden' : undefined"
    @closeSettings="() => (app.settingsHidden = true)"
  ></the-settings-menu>
  <warning
    title="Warning!"
    text="No API Key provided."
    :class="app.isApiKeyProvided ? 'hidden' : undefined"
  ></warning>
  <the-chat-messages class="mt-20 mb-20" :messages="app.messages"></the-chat-messages>
  <div class="fixed bottom-0 w-full bg-neutral-700 py-2.5" ref="chatContainer">
    <the-text-area
      :class="!app.isApiKeyProvided || app.tokensExceeded ? 'opacity-50' : undefined"
      :disabled="!app.isApiKeyProvided || app.tokensExceeded"
      @clear="app.clearChat"
      @submit="(text) => app.createConversation(text)"
    ></the-text-area>
  </div>
</template>
