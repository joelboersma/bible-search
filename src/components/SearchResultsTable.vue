<script setup>
import { ref, watch } from "vue";
import { getSearch } from "../services/esvApi";

const fetchedResults = ref(false);
const results = ref([]);
// const totalResults = ref(0);
// const currentPage = ref(0);
// const totalPages = ref(0);

const props = defineProps(["query"]);

watch(
  () => props.query,
  (newQuery) => {
    fetchFirstPageSearchResults(newQuery);
  }
);

async function fetchFirstPageSearchResults(searchTerm) {
  fetchedResults.value = false;
  const response = await getSearch(searchTerm);
  fetchedResults.value = true;
  console.log(response);
  results.value = response.results;
}
</script>

<template>
  <table v-if="results?.length > 0" class="my-4">
    <thead>
      <tr>
        <th>Reference</th>
        <th>Content</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in results">
        <td>{{ result.reference }}</td>
        <td>{{ result.content }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else-if="fetchedResults" class="text-center my-4">
    Could not find any verses with that search term.
  </p>
</template>
