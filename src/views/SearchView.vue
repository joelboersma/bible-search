<script setup>
import { ref } from "vue";
import SearchBar from "../components/SearchBar.vue";

const searchQuery = ref("");

function handleSubmit(e) {
  console.log(searchQuery.value);
}
</script>

<template>
  <div class="flex justify-center w-full">
    <form
      @submit.prevent="handleSubmit"
      class="flex justify-center w-full max-w-xl flex-wrap sm:flex-nowrap"
    >
      <SearchBar
        v-model="searchQuery"
        placeholder="Search verses by keyword"
        class="w-full"
      ></SearchBar>
      <button
        type="submit"
        class="bg-emerald-800 hover:bg-emerald-700 transition-colors text-white px-4 py-2 rounded-lg ml-0 mt-2 w-full sm:w-auto sm:ml-2 sm:my-0"
      >
        Submit
      </button>
    </form>
  </div>
</template>
