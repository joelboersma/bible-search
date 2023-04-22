<script setup>
import { ref } from "vue";
import SearchBar from "./SearchBar.vue";

const query = ref("");
const emit = defineEmits(["submit"]);

function handleSubmit() {
  emit("submit", query.value);
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex w-full flex-wrap sm:flex-nowrap"
  >
    <SearchBar
      v-model="query"
      placeholder="Search verses by keyword"
      class="w-full"
    ></SearchBar>
    <button
      type="submit"
      class="bg-emerald-800 hover:bg-emerald-700 transition-colors text-white text-lg px-4 py-2 rounded-lg ml-0 mt-2 w-full sm:w-auto sm:ml-2 sm:my-0"
    >
      Submit
    </button>
  </form>
</template>
