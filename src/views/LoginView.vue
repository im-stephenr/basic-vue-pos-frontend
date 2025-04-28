<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";

const toast = useToast();
const route = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  console.log("Triggered Submit");

  const newForm = {
    email: form.email,
    password: form.password,
  };
  try {
    // generate sanctum session cookie tokens
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });
    // call login api
    await axios
      .post("http://localhost:8000/login", newForm, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true, // Only needed for Sanctum
        withXSRFToken: true,
      })
      .then(() => {
        route.push({ path: "/" });
      })
      .catch((error) => {
        toast.warning(error.response.data.message);
        console.log("Error logging in", error);
      });
  } catch (error) {
    console.log("Error", error);
  }
};
</script>
<template>
  <div
    class="border-1 border-gray-300 rounded-md mt-20 p-10 shadow-xl bg-white h-[400px]"
  >
    <div class="text-center">
      <h1 class="text-2xl mb-10">Login</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="w-md mx-auto">
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label
        >
        <input
          v-model="form.email"
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="email@email.com"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          for="remember"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Remember me</label
        >
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      <RouterLink
        class="float-right text-blue-500 hover:underline"
        to="register"
      >
        Register
      </RouterLink>
    </form>
  </div>
</template>
