<script setup>
import { defineProps } from "vue";
defineProps({
  title: {
    type: String,
    default: "Page Title",
  },
});
</script>
<template>
  <div class="bg-gray-800 pt-3">
    <div
      class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white"
    >
      <h3 class="font-bold pl-2">{{ title }}</h3>
    </div>
  </div>
</template>
