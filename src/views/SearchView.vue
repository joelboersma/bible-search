<script setup>
import { ref } from "vue";
import SearchBar from "../components/SearchBar.vue";

const searchQuery = ref("");
function handleSearch(query) {
  searchQuery.value = query;
}
</script>

<template>
  <div class="flex justify-center w-full">
    <SearchBar
      @search="handleSearch"
      placeholder="Search verses by keyword"
      class="w-full max-w-xl"
    ></SearchBar>
  </div>
  <p>{{ searchQuery }}</p>
</template>
