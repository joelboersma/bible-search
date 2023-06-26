<script setup>
import { getText } from "../services/esvApi";

async function fetchRandomVerse() {
  const result = await getText("John 3:16");
  console.log(result);
}
</script>

<template>
  <button :onclick="fetchRandomVerse">Get Random Verse!</button>
</template>
