<script setup>
import { ref, defineProps } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const props = defineProps(["placeholder"]);

const text = ref("");
</script>

<template>
  <div
    class="border border-solid px-4 py-2 mb-2 rounded-full border-gray-400 w-full text-lg flex items-center"
  >
    <input
      v-model="text"
      name="search"
      type="search"
      :placeholder="props.placeholder"
      class="w-full"
    />
    <MagnifyingGlassIcon class="w-6 h-6 stroke-gray-600" />
  </div>
</template>

<script></script>
