<script setup>
const props = defineProps({
  sold_products: Object,
});
</script>

<template>
  <h1 class="text-1xl font-bold text-center mb-2">Sold Products Today</h1>

  <div class="relative overflow-y-scroll max-h-[300px]">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Product name</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(quantity, product) in sold_products"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ product }}
          </th>
          <td class="px-6 py-4">
            {{ quantity }} {{ quantity > 1 ? "pcs" : "pc" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
