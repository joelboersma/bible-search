<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);

const translations = {
  ASV: "American Standard Version (1901)",
  BBE: "Bible in Basic English",
  DARBY: "Darby English Bible",
  ESV: "English Standard Version",
  NIV: "New International Version",
  NLT: "New Living Translation",
  KJV: "King James Version",
  WEB: "World English Bible",
  YLT: "Young's Literal Translation",
};
</script>

<template>
  <select
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    name="translation"
  >
    <option
      v-for="[code, name] in Object.entries(translations)"
      :key="code"
      :value="code"
      :label="code"
      :selected="code === modelValue"
      :title="name"
    ></option>
  </select>
</template>
