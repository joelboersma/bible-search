<script setup>
import { ref } from "vue";
import { getText } from "../services/esvApi";
import getRandomVerse from "../services/randomVerse";

const verse = ref("");
const text = ref("");

async function fetchRandomVerse() {
  // const result = await getText("John 3:16");
  // console.log(result);
  // verse.value = result.canonical;
  // text.value = result.passages[0];
  getRandomVerse();
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
  </section>
</template>
