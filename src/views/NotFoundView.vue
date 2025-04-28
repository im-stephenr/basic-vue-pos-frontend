<script setup>
import { RouterLink } from "vue-router";
import MainContent from "@/components/MainContent.vue";
</script>
<template>
  <div class="text-center mt-[30vh]">
    <h1 class="text-3xl">404 Page not Found</h1>
    <RouterLink class="text-1xl text-blue-500" to="/">Go back</RouterLink>
  </div>
</template>
