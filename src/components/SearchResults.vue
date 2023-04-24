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

const currentPageFirstEntry = computed(() => {
  if (!currentPage.value) {
    return undefined;
  }
  return PAGE_SIZE * (currentPage.value - 1) + 1;
});

const currentPageLastEntry = computed(() => {
  if (!(currentPage.value && totalPages.value && totalResults.value)) {
    return undefined;
  }
  return Math.min(totalResults.value, currentPage.value * PAGE_SIZE);
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

function goToNextPage() {
  if (currentPage.value === totalPages.value) return;
  currentPage.value += 1;
  if (!results.value[currentPage.value - 1]) {
    fetchSpecificPageSearchResults(currentPage.value);
  }
}

function goToPreviousPage() {
  if (currentPage.value <= 1) return;
  currentPage.value -= 1;
  if (!results.value[currentPage.value - 1]) {
    fetchSpecificPageSearchResults(currentPage.value);
  }
}

function goToFirstPage() {
  if (currentPage.value <= 1) return;
  currentPage.value = 1;
  if (!results.value[currentPage.value - 1]) {
    fetchSpecificPageSearchResults(currentPage.value);
  }
}

function goToLastPage() {
  if (currentPage.value === totalPages.value) return;
  currentPage.value = totalPages.value;
  if (!results.value[currentPage.value - 1]) {
    fetchSpecificPageSearchResults(currentPage.value);
  }
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

async function fetchSpecificPageSearchResults(pageNumber) {
  if (pageNumber > totalPages.value) return;
  const response = await getSearch(props.query, pageNumber);
  console.log(response);
  results.value[pageNumber - 1] = response.results;
}
</script>

<template>
  <section v-if="foundResults" class="my-4">
    <div class="flex justify-center my-2">
      <button title="First Page" class="px-4" @click="goToFirstPage">
        <ChevronDoubleLeftIcon class="w-6 h-6" />
      </button>
      <button title="Previous Page" class="px-4" @click="goToPreviousPage">
        <ChevronLeftIcon class="w-6 h-6" />
      </button>
      <div class="mx-10">
        <strong>
          {{ currentPageFirstEntry }} - {{ currentPageLastEntry }}
        </strong>
        of
        <strong>{{ totalResults }}</strong>
      </div>
      <button title="Next Page" class="px-4" @click="goToNextPage">
        <ChevronRightIcon class="w-6 h-6" />
      </button>
      <button title="Last Page" class="px-4" @click="goToLastPage">
        <ChevronDoubleRightIcon class="w-6 h-6" />
      </button>
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
