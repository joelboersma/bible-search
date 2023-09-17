<script setup>
import { shallowRef } from "vue";
import Header from "./components/Header.vue";
import SearchView from "./views/SearchView.vue";
import RandomView from "./views/RandomView.vue";
import AboutView from "./views/AboutView.vue";

const navItems = {
  "/search": { title: "Search", view: SearchView },
  "/random": { title: "Random", view: RandomView },
  "/about": { title: "About", view: AboutView },
};

const currentView = shallowRef(SearchView);
</script>

<template>
  <Header :nav-items="navItems" v-model:current-view="currentView" />
  <main class="mt-[140px]">
    <div class="flex justify-center">
      <div
        class="w-full max-w-screen-lg p-6 sm:border sm:border-solid sm:border-neutrals-200 dark:sm:border-neutral-700 sm:p-8 sm:my-4 sm:mx-8 sm:rounded-lg sm:shadow-md"
      >
        <component :is="currentView" />
      </div>
    </div>
  </main>
</template>
