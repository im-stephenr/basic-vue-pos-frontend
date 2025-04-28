<script setup>
// IMPORTING COMPONENT FILES
import PageTitle from "@/components/PageTitle.vue";
import MainContent from "@/components/MainContent.vue";
import ProductsList from "@/components/products/ProductsList.vue";
import OrderList from "@/components/products/OrderList.vue";
import { inject, onMounted, provide, ref } from "vue";
import axios from "axios";
import SubTotal from "@/components/products/SubTotal.vue";
import CategoriesTab from "@/components/products/CategoriesTab.vue";
import { useToast } from "vue-toastification";
import { useUserDataStore } from "@/stores/UserDataStore";

const subTotal = ref(0);
const activeTab = ref("all"); // category tab
const customerActiveTab = ref("");
const toast = useToast();
const userStore = useUserDataStore();

// ADD ORDER TO LIST
const generateRandomId = () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  return randomString;
};

// Handle Adding Customer Tab
const handleCustomerAdd = () => {
  const newCustomer = {
    id: generateRandomId(),
    orderDetails: [],
  };
  customers.value.push(newCustomer);
};

const initialCustomerId = ref(generateRandomId()); // generated ID for the first customer, declared after generateRandomId to avoid error
const customers = ref([
  {
    id: initialCustomerId.value,
    orderDetails: [],
  },
]);

// // Handle Customer Current Active tab
const handleCustomerActiveTab = (customerId) => {
  // Set customerActiveTab when switching customer tab
  customerActiveTab.value = customerId;
  // Search through customers
  const searchCustomer = customers.value.find(
    (c) => c.id && c.id === customerActiveTab.value
  );
  // Also recalculate the subtotal when changing customer tabs
  if (searchCustomer) {
    calculateSubTotal(searchCustomer.orderDetails);
  }
};

// Handle Adding Order to Specific Customer
const addOrder = async (productId) => {
  console.log("ADDING", productId);

  try {
    // Get specific product
    const response = await axios.get(
      `http://localhost:8000/api/products/show/${productId}`
    );
    response.data["quantity"] = 1; // add quantity property to object

    // Search through customers
    // Creating a reference to customers variable, whenever searchCustomer is updated, it will also update the customers since we use ref and it is reactive
    const searchCustomer = customers.value.find(
      (c) => c.id && c.id === customerActiveTab.value
    );

    if (searchCustomer) {
      // Check if id already exist in orderDetails
      // Again creating a reference in searchCustomer variable which is connected to customers variable. Whenever order is updated, it will also update the searchCustomer and Customers
      let order = searchCustomer.orderDetails.find(
        (order) => order.id === response.data.id
      );

      // If order exist then just update the property quantity value
      if (order) {
        // Get the data from searchCustomer orderDetails where id = response.data.id
        order.quantity += 1;
      } else {
        searchCustomer.orderDetails.push(response.data);
      }
    }
    // Calculate subtotal when adding new order
    calculateSubTotal(searchCustomer.orderDetails);
  } catch (error) {
    console.log(error);
  }
};

// Handle calculate subtotal for specific order
const calculateSubTotal = (orders) => {
  // Sum of all price in order list
  // Reduce function, sum = accumulator, it is a single value, this will be the return value of reduce.
  subTotal.value = orders.reduce(
    (sum, order) => sum + order.price * order.quantity, // sum is the total (single value), order is the object iterated. sum + price * quantity of specific ordered product
    0 // initial value
  );
};

// Handle Removing/Cancelling Order
// Remove order
const handleRemoveCustomer = (customerId) => {
  customers.value = customers.value.filter((c) => c.id !== customerId); // removing data in customer object based on given id
  const searchCustomer = customers.value.find(
    (c) => c.id && c.id === customerId
  );
};

// Add Sales / Proceed Order
const handleProceedOrder = () => {
  const searchCustomer = customers.value.find(
    (c) => c.id && c.id === customerActiveTab.value
  );
  if (searchCustomer) {
    if (searchCustomer.orderDetails.length !== 0) {
      const now = new Date();
      const currentDay = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const currentTime = now.toTimeString().slice(0, 8); // HH:MM:SS
      const currentDate = `${currentDay} ${currentTime}`;

      try {
        const response = axios
          .post(
            "http://localhost:8000/api/sales/add-sales",
            {
              customerId: searchCustomer.id,
              orders: JSON.stringify(searchCustomer.orderDetails),
              total: subTotal.value,
            },
            {
              withCredentials: true, // Only needed for Sanctum
              withXSRFToken: true,
            }
          )
          .then((res) => {
            searchCustomer.orderDetails = []; // clear the order details
            toast.success("Order processed successfully!", {
              timeout: 2000,
            });
          })
          .catch((err) => {
            console.log("ERROR PROCEED", err);
          });
      } catch (error) {
        console.log("Error Proceed", error);
      }
    }
  }
};
/** Category TAB related Function */
// Handle active tab
const handleActiveTab = (category) => {
  activeTab.value = category === "all" ? category : category.title;
};

// this function will be passed to all imported components in this file
provide("addOrder", addOrder);
provide("calculateSubTotal", calculateSubTotal);
provide("handleProceedOrder", handleProceedOrder);
</script>
<template>
  <!-- MAIN CONTENT -->
  <MainContent>
    <PageTitle title="POS" />

    <div class="grid gap-1 grid-cols-[70%_30%] h-[calc(100vh-100px)]">
      <div class="p-5">
        <div class="w-full">
          <CategoriesTab
            @toggleCategoryTab="handleActiveTab"
            :activeTab="activeTab"
          />
        </div>
        <div
          class="grid gap-5 grid-cols-1 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 mx-5 p-5 h-[calc(100vh-200px)] overflow-auto items-start"
        >
          <!-- PRODUCT LIST -->
          <ProductsList :activeTab="activeTab" />
        </div>
      </div>
      <div class="p-5 mt-1 h-[calc(100vh - 300px)] bg-white">
        <OrderList
          :customerActiveTab="customerActiveTab"
          :handleCustomerAdd="handleCustomerAdd"
          :initialCustomerId="initialCustomerId"
          :customers="customers"
          @handleCustomerActiveTab="handleCustomerActiveTab"
          @handleRemoveCustomer="handleRemoveCustomer"
        />
        <SubTotal :subTotal="subTotal" />
      </div>
    </div>
  </MainContent>
</template>
