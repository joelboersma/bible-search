<script setup>
const props = defineProps({
  navItems: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <nav
    class="flex justify-center mb-4 bg-emerald-800 text-white font-serif text-lg"
  >
    <a
      v-for="[route, { title }] in Object.entries(navItems)"
      :href="`#${route}`"
    >
      <button type="button" class="mx-5 my-2">
        {{ title }}
      </button>
    </a>
  </nav>
</template>
