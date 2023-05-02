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
      autocomplete="off"
      class="border border-solid px-4 py-2 rounded-full border-gray-400 w-full text-lg flex items-center relative outline-offset-0"
    />
    <MagnifyingGlassIcon
      class="w-6 h-6 stroke-gray-600 absolute right-4 top-2.5"
    />
  </div>
</template>

<script></script>

<style scoped>
/**
On Webkit (Chromium + Safari) an 'X' icon will appear in 
'input[type="search"]' for clearing it. This is non-standard so 
it will be hidden.
Eventually, this can be implemented manually.
*/

/* Webkit (Chromium + Safari) */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
</style>
