<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserDataStore } from "@/stores/UserDataStore";

const userDataStore = useUserDataStore();
const isDDOpen = ref(false);

const handleDropDown = () => {
  if (!isDDOpen.value) isDDOpen.value = true;
  else isDDOpen.value = false;
};
const route = useRouter();
const handleLogout = async () => {
  try {
    await axios
      .post(
        "http://localhost:8000/logout",
        {},
        {
          withCredentials: true,
          withXSRFToken: true,
        }
      )
      .then((response) => {
        console.log("LOGGING OUT");

        route.push({ path: "/auth/login" });
      })
      .catch((error) => {
        console.log("Error Logout", error);
      });
  } catch (error) {
    console.log("Erroring:", error);
  }
};

onMounted(() => {
  // trigger the fetchUser method from pinia UserDataStore.js
  userDataStore.fetchUser();
});
</script>
<template>
  <!--Nav-->
  <nav
    class="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0"
  >
    <div class="flex flex-wrap items-center">
      <div
        class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white"
      >
        <a href="#">
          <span class="text-xl pl-2"><i class="em em-grinning"></i></span>
        </a>
      </div>

      <div
        class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2"
      >
        <span class="relative w-full">
          <input
            type="search"
            placeholder="Search"
            class="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal"
          />
          <div class="absolute search-icon" style="top: 1rem; left: 0.8rem">
            <svg
              class="fill-current pointer-events-none text-white w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
              ></path>
            </svg>
          </div>
        </span>
      </div>

      <div
        class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end"
      >
        <ul
          class="list-reset flex justify-between flex-1 md:flex-none items-center"
        >
          <li class="flex-1 md:flex-none md:mr-3">
            <div class="w-[200px]">
              <img
                :src="`https://randomuser.me/api/portraits/men/${Math.floor(
                  Math.random() * 50
                )}.jpg`"
                class="w-10 rounded-full float-left"
                alt=""
              />
              <button
                @click.prevent="handleDropDown"
                class="drop-button cursor-pointer text-white focus:outline-none pl-3 pt-2"
              >
                Hi,
                {{ userDataStore.user?.name || "" }}
                <svg
                  class="h-3 fill-current inline"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </button>
              <div
                v-if="isDDOpen"
                class="dropdownlist absolute bg-gray-800 text-white right-0 mt-1 p-3 overflow-auto z-30"
              >
                <a
                  href="#"
                  class="p-2 hover:bg-gray-500 text-white text-sm no-underline hover:no-underline block"
                  ><i class="fa fa-user fa-fw"></i> Profile</a
                >
                <a
                  href="#"
                  class="p-2 hover:bg-gray-500 text-white text-sm no-underline hover:no-underline block"
                  ><i class="fa fa-cog fa-fw"></i> Settings</a
                >
                <a
                  href="#"
                  @click.prevent="handleLogout"
                  class="p-2 hover:bg-gray-500 text-white text-sm no-underline hover:no-underline block"
                  ><i class="fas fa-sign-out-alt fa-fw"></i> Log Out</a
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
