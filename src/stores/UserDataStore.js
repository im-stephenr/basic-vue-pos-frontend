import { defineStore } from "pinia";
import axios from "axios";

export const useUserDataStore = defineStore("userDataStore", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get("http://localhost:8000/api/user", {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        });
        this.user = response.data;
      } catch (error) {
        this.user = null;
      }
    },
  },
});
