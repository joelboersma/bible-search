<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

defineProps(["modelValue", "placeholder"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex relative">
    <input
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      name="search"
      type="search"
      class="border border-solid px-4 py-2 rounded-full border-gray-400 w-full text-lg flex items-center relative"
    />
    <MagnifyingGlassIcon
      class="w-6 h-6 stroke-gray-600 absolute right-4 top-2.5"
    />
  </div>
</template>

<script></script>
