<script setup>
import { ref, computed } from "vue";
import Header from "./components/Header.vue";
import Navigator from "./components/Navigator.vue";
import SearchView from "./views/SearchView.vue";
import RandomView from "./views/RandomView.vue";

const navItems = {
  "/search": { title: "Search", view: SearchView },
  "/random": { title: "Random", view: RandomView },
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  if (!(window.location.hash.slice(1) in navItems)) {
    window.location.hash = "#/";
  }
  currentPath.value = window.location.hash;
});

const currentRoute = computed(() => currentPath.value.slice(1) || "/search");

const currentView = computed(() => {
  return navItems[currentRoute.value]?.view ?? SearchView;
});
</script>

<template>
  <Header />
  <Navigator
    :nav-items="navItems"
    :current-route="currentRoute"
    class="w-full"
  />
  <main>
    <div class="flex justify-center">
      <div
        class="w-full max-w-screen-lg p-6 sm:border sm:border-solid sm:border-gray-200 sm:p-8 sm:my-4 sm:mx-8 sm:rounded-lg sm:shadow-md"
      >
        <component :is="currentView" />
      </div>
    </div>
  </main>
</template>
