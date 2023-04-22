<script setup>
import { ref } from "vue";
import SearchForm from "../components/SearchForm.vue";
import SearchResults from "../components/SearchResults.vue";

const query = ref("");

async function handleSubmit(submittedQuery) {
  query.value = submittedQuery;
}
</script>

<template>
  <div class="flex justify-center w-full">
    <SearchForm @submit="handleSubmit" class="max-w-xl"></SearchForm>
  </div>
  <SearchResults :query="query"></SearchResults>
</template>
