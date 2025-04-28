<script setup>
import axios from "axios";
import { useToast } from "vue-toastification";
import Modal from "../Modal.vue";
import { reactive, ref } from "vue";

const props = defineProps({
  categories: Object,
  handleFetchCategories: Function,
});

const isOpenModal = ref(false);
const toast = useToast();
const form = reactive({
  id: "",
  title: "",
});
// Delete Category
const handleDelete = async (data) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/categories/delete-category/${data.id}`
    );
    if (response.data) {
      toast.success("Category Deleted Successfully!", {
        timeout: 2000,
      });
      props.handleFetchCategories();
    }
  } catch (error) {
    console.log("Error", error);
  }
};
// Edit Category
const handleSubmit = async () => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/categories/edit-category/${form.id}`,
      form
    );
    if (response.data) {
      toast.success("Category Updated Successfully!", {
        timeout: 2000,
      });
      props.handleFetchCategories();
      isOpenModal.value = false;
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// When edit button is clicked show modal
const handleEditClick = (category) => {
  isOpenModal.value = true;
  form.id = category.id;
  form.title = category.title;
};

// Close modal
const handleCloseModal = () => {
  isOpenModal.value = false;
};
</script>
<template>
  <Teleport to="body">
    <Modal
      title="Edit Category"
      :isOpenModal="isOpenModal"
      @closeModal="handleCloseModal"
    >
      <template #body>
        <form
          id="edit_category"
          class="max-w-sm ml-10"
          method="POST"
          @submit.prevent="handleSubmit"
        >
          <div class="mb-5">
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Category Title</label
            >
            <input type="hidden" name="id" v-model="form.id" />
            <input
              v-model="form.title"
              type="name"
              name="title"
              id="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </form>
      </template>
      <template #footer>
        <button
          form="edit_category"
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </template>
    </Modal>
  </Teleport>
  <div class="h-[calc(100vh-200px)] overflow-scroll">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" width="10%" class="px-6 py-3">
            <div class="flex items-center">
              ID
              <a href="#"
                ><svg
                  class="w-3 h-3 ms-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                  /></svg
              ></a>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">
              Title
              <a href="#"
                ><svg
                  class="w-3 h-3 ms-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                  /></svg
              ></a>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">Action</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50"
        >
          <td class="px-6 py-4">{{ category.id }}</td>
          <td class="px-6 py-4">{{ category.title }}</td>
          <td class="px-6 py-4 d-flex flex-row content-center">
            <button
              @click="handleEditClick(category)"
              type="button"
              class="text-white cursor-pointer bg-[#3b9857] hover:bg-[#25703c]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              Edit
            </button>
            <button
              @click.prevent="handleDelete(category)"
              type="button"
              class="text-white cursor-pointer bg-[#983b3b] hover:bg-[#741a1a]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>

              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
