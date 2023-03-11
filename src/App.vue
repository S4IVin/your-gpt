<script setup>
import TheSettingsMenu from '@/components/TheSettingsMenu.vue'
import TheModelSelector from "@/components/TheModelSelector.vue";
import TheChatMessages from '@/components/TheChatMessages.vue'
import TheTextArea from '@/components/TheTextArea.vue'
import Warning from '@/components/Warning.vue'
import {useAppStore} from "@/stores/AppStore";

const app = useAppStore()
</script>

<template>
  <header class="fixed top-0 w-full">
    <div class="flex justify-between bg-neutral-700 p-2 shadow-lg">
      <h1 class="flex items-center text-3xl font-bold">YourGPT</h1>
      <div class="flex">
        <the-model-selector></the-model-selector>
        <button @click="app.settingsHidden = false">
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
