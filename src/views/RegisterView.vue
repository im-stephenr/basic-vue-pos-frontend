<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { RouterLink, useRouter } from "vue-router";

const toast = useToast();
const route = useRouter();

const form = reactive({
  email: "",
  password: "",
  password_confirmation: "",
  firstName: "",
  lastName: "",
});

const form_error = ref({});

const handleSubmit = async () => {
  const newForm = {
    email: form.email,
    password: form.password,
    password_confirmation: form.password_confirmation,
    name: form.name,
  };

  // confirm password
  if (form.password !== form.password_confirmation) {
    toast.warning("Password and Confirm password did not match!", {
      timeout: 2000,
    });
    return false;
  }

  // success
  // generate sanctum session cookie tokens
  // this code should only be called once in all your app post/get function
  try {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
      withXSRFToken: true,
    });
    await axios
      .post("http://localhost:8000/register", newForm, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
        withXSRFToken: true,
      })
      .then((response) => {
        toast.success(
          "Account registered successfully! Redirecting you to home page.",
          {
            timeout: 2000,
          }
        );
        // Redirect to home in 2secs after registration
        setTimeout(() => {
          route.push({ path: "/" });
        }, 2000);
      })
      .catch((error) => {
        form_error.value = error.response.data.errors;
      });
  } catch (error) {
    console.log("Error", error);
  }
};
</script>
<template>
  <div
    class="border-1 border-gray-300 rounded-md mt-20 p-10 shadow-xl bg-white h-[500px] w-[500px]"
  >
    <div class="text-center">
      <h1 class="text-2xl mb-10">Register</h1>
    </div>
    <div
      v-if="Object.keys(form_error).length > 0"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">Warning</span>
      <ul>
        <li v-for="(error, index) in form_error">
          {{ error }}
        </li>
      </ul>
    </div>
    <form @submit.prevent="handleSubmit" method="POST" class="max-w-md mx-auto">
      <div class="relative z-0 w-full group">
        <input
          v-model="form.name"
          type="text"
          name="floating_name"
          id="floating_name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="floating_name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Full Name</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="form.email"
          type="email"
          name="floating_email"
          id="floating_email"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Email address</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="form.password"
          type="password"
          name="password"
          id="floating_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="floating_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Password</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="form.password_confirmation"
          type="password"
          name="password_confirmation"
          id="floating_repeat_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="floating_repeat_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Confirm password</label
        >
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      <RouterLink class="float-right text-blue-500 hover:underline" to="login">
        Login
      </RouterLink>
      <p class="float-right mr-3">Already have an account?</p>
    </form>
  </div>
</template>
