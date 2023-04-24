<script setup>
import { ref, watch, computed } from "vue";
import { getSearch } from "../services/esvApi";

const PAGE_SIZE = 20;

const fetchedResults = ref(false);
const foundResults = ref(false);
const results = ref([]);
const totalResults = ref(0);
const currentPage = ref(0);
const totalPages = ref(0);

const props = defineProps(["query"]);

const currentPageResults = computed(() => {
  return results.value[currentPage.value - 1];
});

const paginatorMessage = computed(() => {
  if (!(totalResults.value && totalPages.value && currentPage.value)) {
    return "";
  }
  const currentPageLastEntry = currentPage.value * PAGE_SIZE;
  const currentPageFirstEntry = currentPageLastEntry - PAGE_SIZE + 1;
  return `${currentPageFirstEntry} - ${currentPageLastEntry} of ${totalResults.value}`;
});

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
  <section v-if="foundResults" class="my-4">
    <div class="flex justify-between">
      <div>
        <button>First Page</button>
        <button>Previous Page</button>
      </div>
      {{ paginatorMessage }}
      <div>
        <button>Next Page</button>
        <button>Last Page</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Reference</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in currentPageResults">
          <td>{{ result.reference }}</td>
          <td>{{ result.content }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <p v-else-if="fetchedResults" class="text-center my-4">
    Could not find any verses with that search term.
  </p>
</template>
