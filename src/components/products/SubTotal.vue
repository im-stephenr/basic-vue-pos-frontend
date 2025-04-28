<script setup>
import { defineProps, inject } from "vue";
defineProps({
  subTotal: Number,
});
const handleProceedOrder = inject("handleProceedOrder");
</script>
<template>
  <!-- SUBTOTAL -->
  <div class="bg-blue-500 text-white p-5">
    <table class="w-full">
      <tbody>
        <tr>
          <td class="text-right">Sub Total:</td>
          <td class="pl-5">₱{{ parseFloat(subTotal).toFixed(2) }}</td>
        </tr>
        <tr>
          <td class="text-right">Total:</td>
          <td class="pl-5 font-bold">₱{{ parseFloat(subTotal).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button
        @click="handleProceedOrder"
        type="button"
        class="mt-10 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 w-full"
      >
        Proceed
      </button>
    </div>
  </div>
</template>
