<script setup>
import Header from "./components/Header.vue";
import SearchView from "./views/SearchView.vue";
</script>

<template>
  <Header />
  <main>
    <div class="flex justify-center my-4 mx-8">
      <div
        class="border border-solid border-gray-200 w-full max-w-screen-lg p-8 rounded-lg shadow-md"
      >
        <SearchView />
      </div>
    </div>
  </main>
</template>
