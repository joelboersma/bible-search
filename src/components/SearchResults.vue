<script setup>
import { ref, watch, computed } from "vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/20/solid";
import { getSearch } from "../services/esvApi";
import LoadingSpinner from "./LoadingSpinner.vue";

const PAGE_SIZE = 20;

const isLoading = ref(false);
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

function onFirstPage() {
  return currentPage.value <= 1;
}

function onLastPage() {
  return currentPage.value === totalPages.value;
}

function goToNextPage() {
  if (onLastPage()) return;
  currentPage.value += 1;
  if (!results.value[currentPage.value - 1]) {
    fetchSpecificPageSearchResults(currentPage.value);
  }
}

function goToPreviousPage() {
  if (onFirstPage()) return;
  currentPage.value -= 1;
  if (!results.value[currentPage.value - 1]) {
    fetchSpecificPageSearchResults(currentPage.value);
  }
}

function goToFirstPage() {
  if (onFirstPage()) return;
  currentPage.value = 1;
  if (!results.value[currentPage.value - 1]) {
    fetchSpecificPageSearchResults(currentPage.value);
  }
}

function goToLastPage() {
  if (onLastPage()) return;
  currentPage.value = totalPages.value;
  if (!results.value[currentPage.value - 1]) {
    fetchSpecificPageSearchResults(currentPage.value);
  }
}

async function fetchSearchResults(searchTerm, pageNumber) {
  isLoading.value = true;
  const response = await getSearch(searchTerm, pageNumber);
  isLoading.value = false;
  return response;
}

async function fetchFirstPageSearchResults(searchTerm) {
  const response = await fetchSearchResults(searchTerm);
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
  const response = await fetchSearchResults(props.query, pageNumber);
  console.log(response);
  results.value[pageNumber - 1] = response.results;
}
</script>

<template>
  <section v-if="foundResults">
    <div class="flex justify-center">
      <div class="flex w-full max-w-md">
        <button
          title="First Page"
          class="p-4 disabled:text-gray-300"
          :disabled="isLoading || onFirstPage()"
          @click="goToFirstPage"
        >
          <ChevronDoubleLeftIcon class="w-6 h-6" />
        </button>
        <button
          title="Previous Page"
          class="p-4 disabled:text-gray-300"
          :disabled="isLoading || onFirstPage()"
          @click="goToPreviousPage"
        >
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <div class="p-4 text-center flex-grow w-full">
          <strong>
            {{ currentPageFirstEntry }} - {{ currentPageLastEntry }}
          </strong>
          of
          <strong>{{ totalResults }}</strong>
        </div>
        <button
          title="Next Page"
          class="p-4 disabled:text-gray-300"
          :disabled="isLoading || onLastPage()"
          @click="goToNextPage"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </button>
        <button
          title="Last Page"
          class="p-4 disabled:text-gray-300"
          :disabled="isLoading || onLastPage()"
          @click="goToLastPage"
        >
          <ChevronDoubleRightIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
    <div v-for="result in currentPageResults" class="mb-3 flex">
      <div class="mr-5 rounded-lg bg-emerald-700 w-1.5 flex-shrink-0" />
      <div>
        <p>{{ result.content }}</p>
        <strong class="text-gray-500">
          {{ result.reference.toUpperCase() }}
        </strong>
      </div>
    </div>
  </section>
  <p v-else-if="fetchedResults" class="text-center my-4">
    Could not find any verses with that search term.
  </p>
  <div v-if="isLoading" class="flex justify-center align-middle mt-5">
    <LoadingSpinner />
  </div>
</template>
