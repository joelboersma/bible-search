<script setup>
import { ref, defineProps } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const props = defineProps(["placeholder"]);

const text = ref("");
</script>

<template>
  <div class="flex relative">
    <input
      v-model="text"
      name="search"
      type="search"
      :placeholder="props.placeholder"
      class="border border-solid px-4 py-2 mb-2 rounded-full border-gray-400 w-full text-lg flex items-center relative"
    />
    <MagnifyingGlassIcon
      class="w-6 h-6 stroke-gray-600 absolute right-4 top-2.5"
    />
  </div>
</template>

<script></script>
