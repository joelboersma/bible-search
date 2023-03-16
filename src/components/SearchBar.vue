<script setup>
import { ref, defineEmits } from "vue";

const searchQuery = ref("");
const emit = defineEmits(["search"]);

function submitForm() {
  emit("search", searchQuery);
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search a passage"
      class="border-gray-400"
    />
  </form>
</template>

<script></script>
