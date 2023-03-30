<template>
  <div
    class="fixed top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border-2 bg-neutral-500 p-5 shadow-lg space-y-1"
  >
    <div class="flex items-start justify-between">
      <h1 class="align-text-top text-2xl font-bold -translate-y-2.5">Settings</h1>
      <button @click="$emit('closeSettings')">
        <img src="/src/assets/close.png" class="invert" width="18" height="18" />
      </button>
    </div>
    <div class="flex flex-col">
      <span>API Key</span>
      <input
        v-model="settings.apiKey"
        @input="
          addToStore('apiKey', $event.target.value);
          $emit('apiKeyChanged', $event.target.value)
        "
        class="mt-1 rounded-lg border-2 bg-neutral-500 p-1 focus:outline-none"
      />
    </div>
    <div class="flex justify-between">
      <tooltip :hidden="settings.gpt4" offset_y="3" text="The name of your role.">
        <div class="flex flex-col">
          <span>User Role</span>
          <input
            v-model="settings.userRole"
            @input="addToStore('userRole', $event.target.value)"
            placeholder="User name"
            class="mt-1 w-32 resize-none rounded-lg border-2 bg-neutral-500 p-1 focus:outline-none"
          />
        </div>
      </tooltip>
      <tooltip :hidden="settings.gpt4" offset_y="3" text="The name of assistant's role.">
        <div class="flex flex-col">
          <span>Assistant Role</span>
          <input
            v-model="settings.assistantRole"
            @input="addToStore('assistantRole', $event.target.value)"
            placeholder="Assistant name"
            class="mt-1 w-32 resize-none rounded-lg border-2 bg-neutral-500 p-1 focus:outline-none"
          />
        </div>
      </tooltip>
    </div>
    <tooltip
      :hidden="!settings.gpt4"
      offset_y="3.5"
      text="The system prompt helps you set the behavior of the assistant. It is written in 2nd person."
    >
      <div class="flex flex-col border-b-2 pb-3">
        <span>System Prompt (GPT-4)</span>
        <textarea
          v-model="settings.systemPrompt"
          @input="addToStore('systemPrompt', $event.target.value)"
          placeholder="You are [name]... You are..."
          class="mt-1 h-24 w-72 resize-none rounded-lg border-2 bg-neutral-500 p-1 focus:outline-none"
        ></textarea>
      </div>
    </tooltip>
    <tooltip
      :hidden="settings.gpt4"
      offset_y="3.5"
      text="The system prompt helps you set the behavior of the assistant. It is written in 3rd person."
    >
      <div class="flex flex-col border-b-2 pb-3">
        <span>System Prompt (GPT-3)</span>
        <textarea
          v-model="settings.davinciPrompt"
          @input="addToStore('davinciPrompt', $event.target.value)"
          placeholder="The following is a conversation with [name]. [name] is..."
          class="mt-1 h-24 w-72 resize-none rounded-lg border-2 bg-neutral-500 p-1 focus:outline-none"
        ></textarea>
      </div>
    </tooltip>
    <tooltip
      offset_y="5.5"
      text="How many recent messages are sent to the API. Fewer messages may lower the response quality, but also the token usage. (0 for unlimited)"
    >
      <div class="flex items-center justify-between">
        <span>Messages Limit</span>
        <input
          v-model.number="settings.messagesLimit"
          @input="addToStore('messagesLimit', parseInt($event.target.value))"
          class="mt-1 h-6 w-16 rounded-lg border-2 bg-neutral-500 text-center focus:outline-none"
          type="number"
        />
      </div>
    </tooltip>
    <tooltip
      offset_y="2.5"
      text="The maximum numbers of tokens you want to use for the entire chat. (0 for unlimited)"
    >
      <div class="flex items-center justify-between border-b-2 pb-2">
        <span>Max Total Tokens</span>
        <input
          v-model.number="settings.maxTotalTokens"
          @input="addToStore('maxTotalTokens', parseInt($event.target.value))"
          class="mt-1 h-6 w-16 rounded-lg border-2 bg-neutral-500 text-center focus:outline-none"
          type="number"
        />
      </div>
    </tooltip>
    <div :class="{ 'opacity-50': settings.gpt4 }">
      <tooltip
        :offset_y="ref(!settings.gpt4 ? 5.5 : 2)"
        :text="
          !settings.gpt4
            ? 'Higher values make the text more creative and diverse. Lower values make the text more predictable and accurate.'
            : 'Setting avaible only with Davinci model'
        "
      >
        <div class="flex flex-col">
          <span>Temperature {{ settings.temperature }}</span>
          <input
            :disabled="settings.gpt4"
            v-model.number="settings.temperature"
            @input="addToStore('temperature', $event.target.value)"
            type="range"
            min="0"
            max="1"
            step="0.1"
          />
        </div>
      </tooltip>
      <tooltip
        :offset_y="ref(!settings.gpt4 ? 5.5 : 2)"
        :text="
          !settings.gpt4
            ? 'Higher values reduce repetition but lower coherence. Lower values increase repetition but improve coherence.'
            : 'Setting avaible only with Davinci model'
        "
      >
        <div class="flex flex-col">
          <span>Presence Penalty {{ settings.presencePenalty }}</span>
          <input
            :disabled="settings.gpt4"
            v-model.number="settings.presencePenalty"
            @input="addToStore('presencePenalty', $event.target.value)"
            type="range"
            min="-2"
            max="2"
            step="0.1"
          />
        </div>
      </tooltip>
      <tooltip
        :offset_y="ref(!settings.gpt4 ? 5.5 : 2)"
        :text="
          !settings.gpt4
            ? 'Higher values penalize repeated words but impair readability. Lower values favor repeated words but enhance readability.'
            : 'Setting avaible only with Davinci model'
        "
      >
        <div class="flex flex-col">
          <span>Frequency Penalty {{ settings.frequencyPenalty }}</span>
          <input
            :disabled="settings.gpt4"
            :readonly="settings.gpt4"
            v-model.number="settings.frequencyPenalty"
            @input="addToStore('frequencyPenalty', $event.target.value)"
            type="range"
            min="-2"
            max="2"
            step="0.1"
          />
        </div>
      </tooltip>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/SettingsStore'
import Tooltip from '@/components/Tooltip.vue'

const settings = useSettingsStore()

const addToStore = (key, value) => {
  localStorage.setItem(key, value)
}
</script>
