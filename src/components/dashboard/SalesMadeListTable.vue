<script setup>
import { onMounted, onUpdated } from "vue";

const props = defineProps({
  sales_made: Object,
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    year: "numeric",
  });
};
</script>
<template>
  <h1 class="text-1xl font-bold text-center mb-2">Sales Made</h1>

  <div class="relative overflow-y-scroll max-h-[300px]">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Orders</th>
          <th scope="col" class="px-6 py-3">Total</th>
          <th scope="col" class="px-6 py-3">Sale Made by</th>
          <th scope="col" class="px-6 py-3">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="sale in sales_made"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <ul>
              <li class="list-decimal" v-for="order in JSON.parse(sale.orders)">
                {{ order.title }}
                <span class="text-red-400 text-xs">
                  {{ order.quantity
                  }}{{ order.quantity > 1 ? "pcs" : "pc" }}</span
                >
              </li>
            </ul>
          </th>
          <td class="px-6 py-4">₱ {{ sale.total }}</td>
          <td class="px-6 py-4">{{ sale.user.name }}</td>
          <td class="px-6 py-4">{{ formatDate(sale.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
