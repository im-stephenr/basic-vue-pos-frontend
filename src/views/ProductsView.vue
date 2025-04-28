<script setup>
// IMPORTING COMPONENT FILES
import PageTitle from "@/components/PageTitle.vue";
import MainContent from "@/components/MainContent.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ProductListTable from "@/components/products/ProductListTable.vue";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
import EditProductModal from "@/components/products/EditProductModal.vue";
import { useToast } from "vue-toastification";

const products = ref([]);
const isLoading = ref(true);
const isOpen = ref(false);
const toast = useToast();
const selectedProduct = reactive({
  id: "",
  title: "",
  price: "",
  category: "",
});

const toggleModal = (data) => {
  // if data is false, then just close the modal
  if (!data) {
    isOpen.value = false;
    document.activeElement.blur(); // Removes focus from any currently focused element, adding this line of code to remove Error when closing modal
  } else {
    // If data passes object then open the open
    isOpen.value = true; // open the modal
    selectedProduct.id = data.id;
    selectedProduct.title = data.title;
    selectedProduct.price = data.price;
    selectedProduct.category = data.category;
  }
};

const deleteProduct = async (data) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/products/delete-product/${data.id}`,
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    );
    if (response.data) {
      toast.success("Product Deleted Successfully!", {
        timeout: 2000,
      });
      fetchProducts();
    }
  } catch (error) {
    console.log("ERror:", error);
  }
};

const fetchProducts = async (data) => {
  try {
    const response = await axios.get("http://localhost:8000/api/products/all");
    if (response) {
      products.value = response.data;
      isLoading.value = false;
    }
  } catch (error) {
    console.log(error);
    isLoading.value = true;
  }
};

onMounted(async () => {
  fetchProducts();
});
</script>
<template>
  <!-- MAIN CONTENT -->
  <MainContent>
    <PageTitle title="Products" />
    <Teleport to="body">
      <EditProductModal
        :selectedProduct="selectedProduct"
        @closeModal="toggleModal(false)"
        :isOpen="isOpen"
        :fetchProducts="fetchProducts"
      />
    </Teleport>
    <RouterLink
      to="/add-product"
      type="button"
      class="mt-10 ml-10 text-white cursor-pointer bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>

      Add Product
    </RouterLink>

    <!-- Show loading spinner while loading is true -->
    <div v-if="isLoading" class="text-center m-auto w-full d-flex">
      <LoadingSpinner />
    </div>
    <!-- Else show the product if loading is false -->
    <div
      v-else
      class="relative overflow-x-scroll shadow-md sm:rounded-lg p-10 h-[calc(100vh - 300px)]"
    >
      <ProductListTable
        @openModal="toggleModal"
        @deleteProduct="deleteProduct"
        :products="products"
        :isOpen="isOpen"
      />
    </div>
  </MainContent>
</template>
