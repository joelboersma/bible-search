<script setup>
import { ref } from "vue";

const text = ref("");
</script>

<template>
  <input
    v-model="text"
    name="search"
    type="search"
    class="border border-solid px-4 py-2 mb-2 rounded-full border-gray-400 w-full text-lg"
  />
</template>

<script></script>
