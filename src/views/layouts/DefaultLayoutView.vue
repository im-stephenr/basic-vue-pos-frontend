<script setup>
// IMPORTING COMPONENT FILES
import Nav from "@/components/Nav.vue";
import Sidebar from "@/components/Sidebar.vue";
import { RouterView } from "vue-router";
</script>
<template>
  <div class="flex flex-col md:flex-row overflow-hidden">
    <Nav />
    <Sidebar />
    <RouterView />
  </div>
</template>
