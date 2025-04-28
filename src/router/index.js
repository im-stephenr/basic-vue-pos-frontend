import { createRouter, createWebHashHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import POSView from "@/views/POSView.vue";
import SettingsView from "@/views/SettingsView.vue";
import ProductsView from "@/views/ProductsView.vue";
import AddProductView from "@/views/AddProductView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DefaultLayoutView from "@/views/layouts/DefaultLayoutView.vue";
import AuthLayoutView from "@/views/layouts/AuthLayoutView.vue";
import AddCategoryView from "@/views/AddCategoryView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import ManageAccountView from "@/views/ManageAccountView.vue";
import { useUserDataStore } from "@/stores/UserDataStore";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // adding this so we go use back button from browser
  routes: [
    {
      path: "/",
      component: DefaultLayoutView,
      meta: { requiresAuth: true }, // Protect all routes under Default layout
      children: [
        {
          path: "",
          name: "POS",
          component: POSView,
        },
        {
          path: "dashboard",
          name: "Dashboard",
          component: DashboardView,
        },
        {
          path: "/settings",
          name: "Settings",
          component: SettingsView,
        },
        {
          path: "/products",
          name: "Products",
          component: ProductsView,
        },
        {
          path: "/add-product",
          name: "Add Product",
          component: AddProductView,
        },
        {
          path: "/category-list",
          name: "Category List",
          component: CategoriesView,
        },
        {
          path: "/add-category",
          name: "Add Category",
          component: AddCategoryView,
        },
        {
          path: "/manage-account",
          name: "Manage Account",
          component: ManageAccountView,
        },
      ],
    },
    {
      path: "/auth",
      component: AuthLayoutView,
      meta: { requiresGuest: true },
      children: [
        {
          path: "register",
          name: "Register",
          component: RegisterView,
        },
        {
          path: "login",
          name: "Login",
          component: LoginView,
        },
        {
          path: "/:pathMatch(.*)*", // any file or page that doesnt exist
          name: "NotFound",
          component: NotFoundView,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserDataStore();

  // Fetch user only if not already set
  if (userStore.user === null) {
    await userStore.fetchUser();
  }

  // If meta.requiresAuth from above is true and userStore.user from pinia is false then redirect to login
  // Default layout has requiresAuth = true, meaning this routes needs authentication
  if (to.meta.requiresAuth && !userStore.user) {
    console.log("Redirecting to login...");
    next("/auth/login");
  }

  // If meta.requiresGuest from above is true and userStore.user from pinia is true or has data inside then redirect to dashboard
  // Default layout has requiresAuth = true, meaning this routes needs authentication
  if (to.meta.requiresGuest && userStore.user) {
    console.log("Redirecting to Dashboard...");
    next("/dashboard");
  }

  next();
});

export default router;
