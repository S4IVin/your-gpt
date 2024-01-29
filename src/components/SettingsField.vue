<template>
  <tooltip :text="tooltip">
    <label class="flex flex-col">
      <div>
        {{ label }}
        <a
          v-if="linkText"
          :href="linkHref"
          target="_blank"
          class="text-blue-400"
          >{{ linkText }}</a
        >
      </div>
      <input
        v-model="model"
        :type="type"
        class="mt-1 w-full rounded-lg border bg-neutral-600 p-1 focus:outline-none"
      />
    </label>
  </tooltip>
</template>

<script setup>
import Tooltip from "./Tooltip.vue";

defineProps({
  label: String,
  linkText: String,
  linkHref: String,
  type: String,
  tooltip: String,
});

const model = defineModel();
</script>
