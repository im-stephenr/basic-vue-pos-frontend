<script setup>
import { RouterLink } from "vue-router";
defineProps({
  title: String,
  icon: String,
  url: String,
});
</script>
<template>
  <RouterLink :to="url">
    <div
      class="border-1 w-[100px] h-[100px] border-gray-300 rounded-sm hover:bg-gray-50 cursor-pointer bg-white p-2 grid"
    >
      <div class="text-center pt-2">
        <i :class="`${icon} text-gray-500 text-4xl`"></i>
      </div>
      <div class="text-center p-0">
        <p class="text-gray-500 text-base/4">{{ title }}</p>
      </div>
    </div>
  </RouterLink>
</template>
