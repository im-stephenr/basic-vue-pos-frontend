<script setup>
import { defineProps, inject } from "vue";
defineProps({
  product: Object,
});

// Call the addOrder from POSView provide()
const addOrder = inject("addOrder");
</script>
<template>
  <button type="button" @click="addOrder(product.id)" class="cursor-pointer">
    <div class="max-w-sm rounded shadow-md bg-white p-5 hover:bg-gray-300">
      <img class="w-full" :src="`https://picsum.photos/200?${product.id}`" />
      <div class="px-2 py-1">
        <div class="font-bold text-xl">{{ product.title }}</div>
        <p class="text-gray-700 text-base">₱ {{ product.price }}</p>
      </div>

      <div class="pt-1">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          >{{ product.category }}</span
        >
      </div>
    </div>
  </button>
</template>
