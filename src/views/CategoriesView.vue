<script setup>
import CategoryListTable from "@/components/categories/CategoryListTable.vue";
import MainContent from "@/components/MainContent.vue";
import PageTitle from "@/components/PageTitle.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const categories = ref([]);

const handleFetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/categories");
    if (response.data) {
      categories.value = response.data;
    }
  } catch (error) {
    console.log("ERror", error);
  }
};

onMounted(async () => {
  handleFetchCategories();
});
</script>
<template>
  <MainContent>
    <PageTitle title="Category List" />
    <RouterLink
      to="/add-category"
      type="button"
      class="mt-10 ml-5 text-white cursor-pointer bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2"
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

      Add Category
    </RouterLink>
    <div class="p-10">
      <CategoryListTable
        :handleFetchCategories="handleFetchCategories"
        :categories="categories"
      />
    </div>
  </MainContent>
</template>
