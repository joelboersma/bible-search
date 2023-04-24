<script setup>
import { ref, watch, computed } from "vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/20/solid";
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
        <button title="First Page">
          <ChevronDoubleLeftIcon class="w-6 h-6 mr-1" />
        </button>
        <button title="Previous Page">
          <ChevronLeftIcon class="w-6 h-6 mr-1" />
        </button>
      </div>
      {{ paginatorMessage }}
      <div>
        <button title="Next Page">
          <ChevronRightIcon class="w-6 h-6 ml-1" />
        </button>
        <button title="Last Page">
          <ChevronDoubleRightIcon class="w-6 h-6 ml-1" />
        </button>
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
