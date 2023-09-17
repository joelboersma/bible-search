<script setup>
import { ref, watch, computed } from "vue";
import SearchView from "../views/SearchView.vue";

const props = defineProps({
  navItems: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:currentView"]);

const currentPath = ref(window.location.hash);
const currentRoute = computed(() => currentPath.value.slice(1) || "/search");
const currentView = computed(() => {
  return props.navItems[currentRoute.value]?.view ?? SearchView;
});

window.addEventListener("hashchange", () => {
  if (!(window.location.hash.slice(1) in props.navItems)) {
    window.location.hash = "#/";
  }
  currentPath.value = window.location.hash;
});
watch(currentView, (newView) => emit("update:currentView", newView));

function isCurrentPage(route) {
  return route === currentRoute.value;
}
</script>

<template>
  <nav
    class="flex justify-center mb-4 bg-emerald-800 text-white font-serif text-lg"
  >
    <a
      v-for="[route, { title }] in Object.entries(props.navItems)"
      :href="`#${route}`"
    >
      <button
        type="button"
        :class="`mx-5 my-2 ${isCurrentPage(route) ? 'underline' : ''}`"
      >
        {{ title }}
      </button>
    </a>
  </nav>
</template>
