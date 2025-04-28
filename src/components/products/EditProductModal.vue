<script setup>
import axios from "axios";
import { ref, onMounted, toRefs, reactive, watch } from "vue";
import { useToast } from "vue-toastification";
const props = defineProps({
  isOpen: Boolean,
  selectedProduct: Object,
  fetchProducts: Function,
});

// Ensure reactivity since directly using selectedProduct above won't work
// Basically saying selectedProduct is initialized as reactive
// const { selectedProduct } = toRefs(props); removing this since the code still works and vue is automatically initializing props as reactive
const categories = ref([]);
const toast = useToast(); // a pop up notification plugin

// Reactive form object
const form = reactive({
  id: "",
  title: "",
  category: "",
  price: "",
  photo: "",
});

// Define emit closeModal for parent component to listen
const emit = defineEmits(["closeModal"]);

// This is another version of updating reactive data, please see CategoryListTable for simplierve
// This will watch the changes of props.selectedProduct and update manually since selectedProduct is not initially reactive and can't be used directly
// We use this since adding the data directly to form reactive will not work
watch(
  props.selectedProduct,
  (newProduct) => {
    if (newProduct) {
      form.id = newProduct.id || "";
      form.title = newProduct.title || "";
      form.category = newProduct.category || "";
      form.price = newProduct.price || "";
    }
  },
  { immediate: true }
); // adding immediate true to run watch immediately when modal opens

// Fetch categories
const handleFetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/categories", {
      withCredentials: true,
    });
    categories.value = response.data;
  } catch (error) {
    console.log("ERROR", error);
  }
};

const handleSubmit = async () => {
  // unnecessarry creating a new variable
  const formData = new FormData();
  // const newProduct = {
  //   id: form.id,
  //   title: form.title,
  //   category: form.category,
  //   price: form.price,
  // };
  formData.append("_method", "PUT"); // Tell Laravel to handle this as a PUT request
  formData.append("id", form.id);
  formData.append("title", form.title);
  formData.append("category", form.category);
  formData.append("price", form.price);
  formData.append("photo", form.photo);

  try {
    const response = await axios.post(
      `http://localhost:8000/api/products/edit-product/${form.id}`, // we still use POST instead PUT as using PUT will not send data to backend if it has File or using enctype
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
      toast.success("Product Updated Successfully!", {
        timeout: 2000,
      });
      props.fetchProducts();
      emit("closeModal");
    }
  } catch (error) {
    console.log("Error: ", error.response.data);
    toast.warning("Edit Failed: " + error.response.data.message, {
      timeout: 5000,
    });
  }
};

// Handle upload photo
const handleUpload = (data) => {
  form.photo = data.target.files[0];
};

// Closing Modal

// same as USEEFFECT in REACT
onMounted(async () => {
  handleFetchCategories();
});
</script>
<template>
  <div
    tabindex="-1"
    aria-hidden="true"
    class="modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    v-if="isOpen"
  >
    <div class="relative rounded-md bg-white p-4 w-full max-w-2xl max-h-full">
      <div
        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Edit Product
        </h3>
        <button
          @click="$emit('closeModal')"
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="default-modal"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-4 md:p-5 space-y-4">
        <form
          id="edit_product"
          class="max-w-sm mx-auto"
          method="POST"
          enctype="multipart/form-data"
          @submit.prevent="handleSubmit"
        >
          <input type="hidden" name="id" v-model="form.id" />
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
              >Title</label
            >
            <input
              v-model="form.title"
              type="text"
              id="title"
              name="title"
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose Category</option>
              <option
                v-for="category in categories"
                :value="category.title"
                :selected="category.title === form.category"
              >
                {{ category.title }}
              </option>
            </select>
          </div>
          <div class="mb-5">
            <label
              for="title"
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
                v-model="form.price"
                type="text"
                id="price"
                name="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>
        </form>
      </div>
      <!-- Modal footer -->
      <div
        class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
      >
        <button
          form="edit_product"
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
