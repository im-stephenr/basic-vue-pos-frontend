<script setup>
// IMPORTING COMPONENT FILES
import PageTitle from "@/components/PageTitle.vue";
import MainContent from "@/components/MainContent.vue";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const categories = ref([]);
const toast = useToast(); // a pop up notification plugin

const form = reactive({
  title: "",
  price: "",
  category: "",
  photo: "",
});

// Add Product
const handleSubmit = async () => {
  // comment this, since we are using upload, we need FormData
  // const newProduct = {
  //   title: form.title,
  //   price: form.price,
  //   category: form.category,
  //   photo: form.photo,
  // };

  // Use FormData when form has upload
  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("price", form.price);
  formData.append("category", form.category);
  formData.append("photo", form.photo);

  try {
    const response = await axios.post(
      "http://localhost:8000/api/products/add-product",
      formData,
      {
        withCredentials: true,
        withXSRFToken: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data) {
      toast.success("Product Added Successfully!", {
        timeout: 2000,
      });
      clearForm();
    }
  } catch (error) {
    console.log("ERROR", error);
  }
};

const clearForm = () => {
  // Clear form
  form.title = "";
  form.price = "";
  form.category = "";
};

// Fetch categories
const handleFetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/categories");
    categories.value = response.data;
  } catch (error) {
    console.log("ERROR", error);
  }
};

// Handle upload photo
const handleUpload = (data) => {
  form.photo = data.target.files[0];
};
// same as USEEFFECT in REACT
onMounted(async () => {
  handleFetchCategories();
});
</script>
<template>
  <!-- MAIN CONTENT -->
  <MainContent>
    <PageTitle title="Add Product" />
    <div class="mt-10">
      <form
        class="max-w-sm ml-10"
        method="POST"
        enctype="multipart/form-data"
        @submit.prevent="handleSubmit"
      >
        <div class="mb-5">
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Upload Product Photo</label
          >

          <input
            @change="handleUpload"
            type="file"
            class="w-full text-slate-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          />
        </div>
        <div class="mb-5">
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Product Name</label
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
        <div class="mb-5">
          <label
            for="category"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Category</label
          >
          <select
            id="category"
            name="category"
            v-model="form.category"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose Category</option>
            <option v-for="category in categories" :value="category.title">
              {{ category.title }}
            </option>
          </select>
        </div>
        <div class="mb-5">
          <label
            for="price"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Price</label
          >
          <div class="relative mb-6 w-[200px]">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
            >
              ₱
            </div>
            <input
              type="text"
              id="price"
              name="price"
              v-model="form.price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
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
