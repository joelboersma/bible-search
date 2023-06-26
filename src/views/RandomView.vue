<script setup>
import { ref } from "vue";
import { getText } from "../services/esvApi";

const verse = ref("");
const text = ref("");

async function fetchRandomVerse() {
  const result = await getText("John 3:16");
  console.log(result);
  verse.value = result.canonical;
  text.value = result.passages[0];
}
</script>

<template>
  <button :onclick="fetchRandomVerse">Get Random Verse!</button>
  <h2>{{ verse }}</h2>
  <p v-if="text">{{ text }}</p>
</template>
