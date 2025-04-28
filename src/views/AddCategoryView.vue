<script setup>
import MainContent from "@/components/MainContent.vue";
import PageTitle from "@/components/PageTitle.vue";
import axios from "axios";
import { reactive, ref } from "vue";
import { useToast } from "vue-toastification";

const form = reactive({
  title: "",
});

const toast = useToast();

// Add Category
const handleSubmit = async () => {
  const newCategory = {
    title: form.title,
  };
  try {
    const response = await axios.get("http://localhost:8000/api/categories");
    const exists = response.data.some(
      (category) =>
        category.title.toLowerCase() === newCategory.title.toLowerCase()
    );

    if (exists) {
      toast.warning("Category title already exist!", {
        timeout: 2000,
      });
      return false;
    }
    // save category
    await axios.post(
      "http://localhost:8000/api/categories/add-category",
      newCategory,
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    );
    if (response) {
      toast.success("Category Added Successfully!", {
        timeout: 2000,
      });
      form.title = "";
    }
  } catch (error) {
    console.log("ERror", error);
  }
};
</script>
<template>
  <MainContent>
    <PageTitle title="Add Category" />
    <div class="mt-10">
      <form class="max-w-sm ml-10" method="POST" @submit.prevent="handleSubmit">
        <div class="mb-5">
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Category Title</label
          >
          <input
            type="name"
            v-model="form.title"
            name="title"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  </MainContent>
</template>
