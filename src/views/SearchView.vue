<script setup>
import { ref } from "vue";
import SearchBar from "../components/SearchBar.vue";
import { getSearch } from "../services/esvApi";

const searchQuery = ref("");
const results = ref({});

async function handleSubmit(e) {
  const searchResults = await getSearch(searchQuery.value);
  console.log(searchResults);
  results.value = searchResults;
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
        class="bg-emerald-800 hover:bg-emerald-700 transition-colors text-white text-lg px-4 py-2 rounded-lg ml-0 mt-2 w-full sm:w-auto sm:ml-2 sm:my-0"
      >
        Submit
      </button>
    </form>
  </div>
  <table v-if="results.results?.length > 0" class="my-4">
    <thead>
      <tr>
        <th>Reference</th>
        <th>Content</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in results.results">
        <td>{{ result.reference }}</td>
        <td>{{ result.content }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else-if="results.page" class="text-center my-4">
    Could not find any verses with the search term.
  </p>
</template>
