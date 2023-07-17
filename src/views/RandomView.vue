<script setup>
import { ref } from "vue";
import { getText } from "../services/esvApi";
import getRandomVerse from "../services/randomVerse";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const verse = ref("");
const text = ref("");
const isLoading = ref(false);

function reset() {
  verse.value = "";
  text.value = "";
}

async function fetchRandomVerse() {
  reset();
  isLoading.value = true;
  const verseReference = getRandomVerse();
  verse.value = verseReference;
  const result = await getText(verseReference);
  isLoading.value = false;
  text.value = result.passages[0];
}
</script>

<template>
  <button
    class="bg-emerald-800 hover:bg-emerald-700 transition-colors text-white text-lg px-4 py-2 rounded-lg w-full"
    :onclick="fetchRandomVerse"
  >
    Get Random Verse!
  </button>
  <section v-if="verse" class="mt-6">
    <h2 class="font-serif text-xl mb-2">{{ verse }}</h2>
    <p v-if="text">{{ text }}</p>
    <div v-if="isLoading" class="flex justify-center align-middle mt-5">
      <LoadingSpinner />
    </div>
  </section>
</template>
