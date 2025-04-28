<script setup>
import ProductCard from "@/components/products/ProductCard.vue";
import { ref, onMounted, defineProps, toRefs, watch, reactive } from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import axios from "axios";

const props = defineProps({
  activeTab: String,
});
// PRODUCTS DATA SAMPLE
const products = ref([]);
const isLoading = ref(false);

const handleFetchProduct = async (activeTab) => {
  try {
    isLoading.value = true;
    const response = await axios.get(
      "http://localhost:8000/api/products/" + activeTab
    );

    products.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

// SAME AS useEffect from react
onMounted(async () => {
  handleFetchProduct(props.activeTab);
});

// this will watch the activeTab value changes, if it changed then trigger the handleFetchProduct function
watch(
  () => props.activeTab,
  (newTab) => {
    handleFetchProduct(newTab);
  }
);
</script>
<template>
  <!-- Show loading spinner while loading is true -->
  <div v-if="isLoading" class="text-center text-gray-500 py-6">
    <LoadingSpinner />
  </div>
  <!-- Else show the product if loading is false -->
  <ProductCard
    v-else
    v-for="product in products"
    :key="product.id"
    :product="product"
  />
</template>
