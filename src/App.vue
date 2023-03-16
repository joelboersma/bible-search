<script setup>
import Header from "./components/Header.vue";
import SearchBar from "./components/SearchBar.vue";

function handleSearch(text) {
  console.log(text);
}
</script>

<template>
  <Header />
  <main>
    <div class="p-4">
      <SearchBar @search="handleSearch" />
    </div>
  </main>
</template>

<style scoped></style>
