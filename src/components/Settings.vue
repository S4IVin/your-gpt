<template>
  <div
    class="fixed top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-neutral-500 p-5 shadow-lg space-y-2"
  >
    <div class="flex items-start justify-between">
      <h1 class="align-text-top text-2xl font-bold -translate-y-2.5">Settings</h1>
      <button @click="$emit('closeSettings')">
        <img src="/src/assets/close.png" class="invert" />
      </button>
    </div>
    <div class="flex flex-col">
      <span>API Key</span>
      <input
        :value="api_key"
        @input="$emit('apiKeyChange', $event.target.value)"
        class="mt-1 rounded-lg border-2 bg-neutral-500 p-1 focus:outline-none"
      />
    </div>
    <tooltip offset_y="2" text="The system prompt helps you set the behavior of the assistant.">
      <div class="flex flex-col border-b-2 pb-5">
        <span>System Prompt</span>
        <textarea
          :value="system_prompt"
          @input="$emit('systemPromptChange', $event.target.value); localStorage.setItem('system_prompt', $event.target.value)"
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
          :value="messages_limit"
          @input="$emit('messagesLimitChange', $event.target.value); localStorage.setItem('message_limit', $event.target.value)"
          class="mt-1 h-6 rounded-lg border-2 bg-neutral-500 text-center focus:outline-none"
          size="3"
          type="number"
        />
      </div>
    </tooltip>
    <tooltip
      offset_y="2.5"
      text="The maximum numbers of tokens you want to use for the entire chat. (0 for unlimited)"
    >
      <div class="flex items-center justify-between border-b-2 pb-3">
        <span>Max Total Tokens</span>
        <input
          :value="max_total_tokens"
          @input="$emit('maxTotalTokensChange', $event.target.value); localStorage.setItem('max_total_tokens', $event.target.value)"
          class="mt-1 h-6 rounded-lg border-2 bg-neutral-500 text-center focus:outline-none"
          size="3"
          type="number"
        />
      </div>
    </tooltip>
    <div :class="{ 'opacity-50': gpt_turbo }">
      <tooltip
        :offset_y="ref(!gpt_turbo ? 5.5 : 2)"
        :text="
          !gpt_turbo
            ? 'Higher values make the text more creative and diverse. Lower values make the text more predictable and accurate.'
            : 'Setting avaible only with Davinci model'
        "
      >
        <div class="flex flex-col">
          <span>Temperature {{ temperature }}</span>
          <input
            :disabled="gpt_turbo"
            :value="temperature"
            @input="$emit('temperatureChange', $event.target.value); localStorage.setItem('temperature', $event.target.value)"
            type="range"
            min="0"
            max="1"
            step="0.1"
          />
        </div>
      </tooltip>
      <tooltip
        :offset_y="ref(!gpt_turbo ? 5.5 : 2)"
        :text="
          !gpt_turbo
            ? 'Higher values reduce repetition but lower coherence. Lower values increase repetition but improve coherence.'
            : 'Setting avaible only with Davinci model'
        "
      >
        <div class="flex flex-col">
          <span>Presence Penalty {{ presence_penalty }}</span>
          <input
            :disabled="gpt_turbo"
            :value="presence_penalty"
            @input="$emit('presencePenaltyChange', $event.target.value); localStorage.setItem('presence_penalty', $event.target.value)"
            type="range"
            min="-2"
            max="2"
            step="0.1"
          />
        </div>
      </tooltip>
      <tooltip
        :offset_y="ref(!gpt_turbo ? 5.5 : 2)"
        :text="
          !gpt_turbo
            ? 'Higher values penalize repeated words but impair readability. Lower values favor repeated words but enhance readability.'
            : 'Setting avaible only with Davinci model'
        "
      >
        <div class="flex flex-col">
          <span>Frequency Penalty {{ frequency_penalty }}</span>
          <input
            :disabled="gpt_turbo"
            :readonly="gpt_turbo"
            :value="frequency_penalty"
            @input="$emit('frequencyPenaltyChange', $event.target.value); localStorage.setItem('frequency_penalty', $event.target.value)"
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
import Tooltip from '@/components/Tooltip.vue'

defineProps({
  gpt_turbo: Boolean,
  api_key: String,
  system_prompt: String,
  messages_limit: String,
  max_total_tokens: String,
  temperature: String,
  presence_penalty: String,
  frequency_penalty: String
})
</script>
