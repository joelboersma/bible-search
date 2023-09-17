<script setup>
import { shallowRef, watch } from "vue";
import { BookOpenIcon } from "@heroicons/vue/24/outline";
import Navigator from "./Navigator.vue";

const props = defineProps({
  navItems: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:currentView"]);
const currentView = shallowRef(null);
watch(currentView, (newView) => emit("update:currentView", newView));
</script>

<template>
  <header class="bg-emerald-800 text-white text-4xl text-center pt-6 pb-2">
    <h1 class="text-4xl text-center font-serif font-extrabold">
      <a href="#/">
        Bible Search
        <BookOpenIcon class="w-10 h-10 mb-2 ml-1 inline-block" />
      </a>
    </h1>
    <Navigator
      :nav-items="navItems"
      v-model:current-view="currentView"
      class="w-full"
    />
  </header>
</template>
