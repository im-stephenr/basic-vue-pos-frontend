<script setup>
import {
  ref,
  defineProps,
  inject,
  onMounted,
  provide,
  computed,
  onUpdated,
} from "vue";
const props = defineProps({
  orderDetails: Object,
  initialCustomerId: String,
  handleCustomerAdd: Function,
  customers: Object,
  customerActiveTab: String,
});

// Retrieve the orderDetails from specific active customer and make a separate variable
// Using computed() since this property uses cached calculations which only updates when their dependencies change.
// computed is used if you want the result to be rendered automatically when their dependencies are updated.
// For this variable, since customers.orderDetails updates when adding order, it will automatically render the new added orders in the page
// To access activeCustomerOrder inside script setup, you should add .value since it acts like ref
const activeCustomerOrder = computed(() => {
  // Search from customers where id is equal to customerActiveTab and return orderDetails only
  const customer = props.customers.find(
    (c) => c.id === props.customerActiveTab
  );
  return customer ? customer.orderDetails : [];
});

// Add quantity
const handleAddQuantity = (productId) => {
  let order = activeCustomerOrder.value.find((order) => order.id === productId);
  order.quantity++;
  // Trigger the calculateSubTotal when adding quantity
  calculateSubTotal(activeCustomerOrder.value);
};

// Deduct quantity
const handleDeductQuantity = (productId) => {
  let order = activeCustomerOrder.value.find((order) => order.id === productId);
  order.quantity > 1 ? order.quantity-- : 0; // if order quantity > 1 remain 1
  // Trigger the calculateSubTotal when deducting quantity
  calculateSubTotal(activeCustomerOrder.value);
};

// Remove order
const handleRemoveOrder = (productId) => {
  // Search in object that has id of selected product and remove it
  let index = activeCustomerOrder.value.findIndex(
    (order) => order.id === productId
  );
  if (index !== -1) {
    activeCustomerOrder.value.splice(index, 1);
  }
  // Trigger the calculateSubTotal when removing order
  calculateSubTotal(activeCustomerOrder.value);
};

const calculateSubTotal = inject("calculateSubTotal");
// define emit variable
const emit = defineEmits(["handleCustomerActiveTab", "handleRemoveCustomer"]);

// when component is mounted, emit the handleCustomerActiveTab with the initialCustomerId so the Customer #1 tab will set as active initially
onMounted(async () => {
  emit("handleCustomerActiveTab", props.initialCustomerId);
});
</script>
<template>
  <div class="w-full text-center">
    <h1 class="text-2xl font-bold inline mr-2">Order List</h1>
    <button
      @click.prevent="handleCustomerAdd"
      title="Add Customer"
      class="p-2 rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300"
    >
      <i class="pi pi-plus"></i>
    </button>
    <button
      @click.prevent="emit('handleRemoveCustomer', customerActiveTab)"
      title="Remove Customer"
      class="p-2 rounded-md float-right cursor-pointer bg-red-500 text-white hover:bg-red-800"
    >
      <i class="pi pi-trash"></i>
    </button>
  </div>
  <div class="inline">
    <ul
      class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400"
    >
      <!-- DYNAMIC ADDED CUSTOMER -->
      <li v-for="(customer, index) in customers" :key="index" class="me-2">
        <a
          @click.prevent="emit('handleCustomerActiveTab', customer.id)"
          :id="`${customer.id}`"
          href="#"
          :class="[
            customerActiveTab === customer.id ? 'text-white bg-blue-600' : '',
            'inline-block',
            'px-4',
            'py-3',
            'rounded-lg',
            'hover:text-gray-900',
            'hover:bg-gray-100',
            'dark:hover:bg-gray-800',
            'dark:hover:text-white',
          ]"
          >Customer #{{ index + 1 }}</a
        >
      </li>
    </ul>
  </div>
  <ul
    class="w-full pr-10 h-[calc(100vh-400px)] mb-2 overflow-y-scroll divide-y divide-gray-200 dark:divide-gray-700 border-t-2 border-t-blue-400 mt-2"
  >
    <li
      v-if="activeCustomerOrder"
      v-for="orderDetail in activeCustomerOrder"
      :key="orderDetail.id"
      class="pb-3 sm:pb-4"
    >
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="shrink-0">
          <img
            class="w-12 h-12 rounded-full"
            src="https://picsum.photos/200"
            alt="Neil image"
          />
        </div>
        <div class="flex-1 p-5 min-w-0">
          <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
            {{ orderDetail.title }}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            <input
              type="text"
              readonly
              :value="`${orderDetail.quantity}`"
              class="text-center w-[35px] p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <!-- ADD QTY BUTTON -->
            <button
              @click="handleAddQuantity(orderDetail.id)"
              class="ml-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg px-1 py-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              type="button"
              title="Add"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
            <!-- DELETE QTY BUTTON -->
            <button
              @click="handleDeductQuantity(orderDetail.id)"
              type="button"
              title="Minus"
              class="ml-3 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-1 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
                  d="M5 12h14"
                />
              </svg>
            </button>
            <!-- REMOVE PRODUCT BUTTON -->
            <button
              @click="handleRemoveOrder(orderDetail.id)"
              type="button"
              title="Remove"
              class="ml-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg px-1 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
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
            </button>
          </p>
        </div>
        <div
          class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
        >
          ₱
          {{ parseFloat(orderDetail.price * orderDetail.quantity).toFixed(2) }}
        </div>
      </div>
    </li>
  </ul>
</template>
