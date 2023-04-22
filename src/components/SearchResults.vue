<script setup>
import { ref, watch } from "vue";
import { getSearch } from "../services/esvApi";

const fetchedResults = ref(false);
const foundResults = ref(false);
const results = ref([]);
const totalResults = ref(0);
const currentPage = ref(0);
const totalPages = ref(0);

const props = defineProps(["query"]);

watch(
  () => props.query,
  (newQuery) => {
    reset();
    fetchFirstPageSearchResults(newQuery);
  }
);

function reset() {
  fetchedResults.value = false;
  foundResults.value = false;
  results.value = [];
  totalResults.value = 0;
  currentPage.value = 0;
  totalPages.value = 0;
}

async function fetchFirstPageSearchResults(searchTerm) {
  const response = await getSearch(searchTerm);
  fetchedResults.value = true;
  console.log(response);
  if (response?.results?.length > 0) {
    foundResults.value = true;
    results.value.push(response.results);
    totalResults.value = response.total_results;
    currentPage.value = response.page;
    totalPages.value = response.total_pages;
  }
}
</script>

<template>
  <table v-if="foundResults" class="my-4">
    <thead>
      <tr>
        <th>Reference</th>
        <th>Content</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in results[0]">
        <td>{{ result.reference }}</td>
        <td>{{ result.content }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else-if="fetchedResults" class="text-center my-4">
    Could not find any verses with that search term.
  </p>
</template>
