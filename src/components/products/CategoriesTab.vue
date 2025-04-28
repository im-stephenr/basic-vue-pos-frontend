<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
defineProps({
  activeTab: String,
});

const categories = ref([]);
// fetch categories
const handleFetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/categories");
    categories.value = response.data;
  } catch (error) {
    console.log("Error", error);
  }
};

defineEmits(["toggleCategoryTab"]);

// Same as Use Effect in react(), triggers when page is loaded
onMounted(async () => {
  handleFetchCategories();
});
</script>
<template>
  <ul
    class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
  >
    <li class="me-2">
      <a
        @click.prevent="$emit('toggleCategoryTab', 'all')"
        href="#"
        :class="[
          'inline-block',
          'p-4',
          'rounded-t-lg',
          activeTab === 'all'
            ? 'text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500 border-b-2 border-blue-600'
            : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300',
        ]"
        >All</a
      >
    </li>
    <li v-for="category in categories" class="me-2">
      <a
        @click.prevent="$emit('toggleCategoryTab', category)"
        href="#"
        :class="[
          'inline-block',
          'p-4',
          'rounded-t-lg',
          activeTab === category.title
            ? 'text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500 border-b-2 border-blue-600'
            : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300',
        ]"
        >{{ category.title }}</a
      >
    </li>
  </ul>
</template>
