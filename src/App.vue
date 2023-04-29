<script setup>
import Header from "./components/Header.vue";
import SearchView from "./views/SearchView.vue";
</script>

<template>
  <Header />
  <main>
    <div class="flex justify-center">
      <div
        class="w-full max-w-screen-lg p-6 sm:border sm:border-solid sm:border-gray-200 sm:p-8 sm:my-4 sm:mx-8 sm:rounded-lg sm:shadow-md"
      >
        <SearchView />
      </div>
    </div>
  </main>
</template>
