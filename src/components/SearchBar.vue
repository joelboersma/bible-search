<script setup>
import { ref, defineProps, defineEmits } from "vue";

const searchQuery = ref("");
const props = defineProps(["placeholder"]);
const emit = defineEmits(["search"]);

function submitForm() {
  emit("search", searchQuery.value);
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="props.placeholder"
      class="border border-solid px-4 py-2 mb-2 rounded-full border-gray-400 w-full text-lg"
    />
  </form>
</template>

<script></script>
