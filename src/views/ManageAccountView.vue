<script setup>
// IMPORTING COMPONENT FILES
import PageTitle from "@/components/PageTitle.vue";
import MainContent from "@/components/MainContent.vue";
import { onMounted, ref } from "vue";
import { useUserDataStore } from "@/stores/UserDataStore";
import axios from "axios";
import { useToast } from "vue-toastification";

const userDataStore = useUserDataStore();
const toast = useToast();
const errors = ref({
  message: "",
});

const form = ref({
  name: userDataStore.user?.name || "",
  email: userDataStore.user?.email || "",
  phone_number: userDataStore.user?.phone_number || "",
  id: userDataStore.user?.id || "",
});

const handleSubmit = async () => {
  const newForm = {
    name: form.value.name,
    email: form.value.email,
    phone_number: form.value.phone_number,
    id: form.value.id,
  };

  try {
    let response = await axios.post(
      "http://localhost:8000/modify-user",
      newForm,
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    );

    if (response.data.success) {
      toast.success("Profile Updated Successfully!", 2000);
      errors.value.message = "";
    }
  } catch (error) {
    errors.value.message = error.response.data.message;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

onMounted(() => {
  // trigger the fetchUser method from pinia UserDataStore.js
  userDataStore.fetchUser();
});
</script>
<template>
  <!-- MAIN CONTENT -->
  <MainContent>
    <PageTitle title="Manage Account" />
    <div class="grid bg-white h-full grid-cols-[20%_40%_40%] gap-4 pt-10">
      <!-- First grid -->
      <div class="p-10 grid justify-center h-fit">
        <div
          class="relative w-50 h-50 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
        >
          <img
            :src="`https://randomuser.me/api/portraits/men/${Math.floor(
              Math.random() * 50
            )}.jpg`"
            class="w-50 h-50 rounded-full float-left"
            alt=""
          />
        </div>
        <h1 class="text-sm text-center mt-10">
          Account Registered <br />
          <span class="text-red-500">{{
            formatDate(userDataStore.user?.created_at)
          }}</span>
        </h1>
      </div>
      <!-- 2nd grid -->
      <div class="p-10 max-h-fit">
        <div
          v-if="errors.message != ''"
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium"
            >Failed to update. {{ errors.message }}
          </span>
        </div>
        <h1 class="text-2xl font-bold mb-10">Personal Info</h1>
        <form class="max-w-md" @submit.prevent="handleSubmit">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              v-model="form.name"
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Full name</label
            >
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="floating_phone"
              id="floating_phone"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              v-model="form.phone_number"
            />
            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Phone number</label
            >
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              v-model="form.email"
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Email address</label
            >
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </form>
      </div>
      <!-- 3rd grid -->
      <div class="p-10 max-h-fit">
        <h1 class="text-2xl font-bold mb-5">Password Reset</h1>
        <form class="max-w-md" @submit.prevent="">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Password</label
            >
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_confirm_password"
              id="floating_confirm_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_confirm_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Confirm Password</label
            >
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  </MainContent>
</template>
