<script setup>
// IMPORTING COMPONENT FILES
import PageTitle from "@/components/PageTitle.vue";
import SalesGraph from "@/components/dashboard/SalesGraph.vue";
import SalesGraphWeek from "@/components/dashboard/SalesGraphWeek.vue";
import MainContent from "@/components/MainContent.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import SoldProductListTable from "@/components/dashboard/SoldProductListTable.vue";
import SalesMadeListTable from "@/components/dashboard/SalesMadeListTable.vue";

const sales_weekly = ref({
  sunday: "",
  monday: "",
  tuesday: "",
  wednesday: "",
  thursday: "",
  friday: "",
  saturday: "",
});

const sales_monthly = ref({
  january: "",
  february: "",
  march: "",
  april: "",
  may: "",
  june: "",
  july: "",
  august: "",
  september: "",
  october: "",
  november: "",
  december: "",
});

const sales_made = ref(null);
const sold_products = ref(null);

const fetch_weekly_sale = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/sales/weekly", {
      withCredentials: true,
    });
    if (response) {
      sales_weekly.value.sunday = response.data.Sunday.total;
      sales_weekly.value.monday = response.data.Monday.total;
      sales_weekly.value.tuesday = response.data.Tuesday.total;
      sales_weekly.value.wednesday = response.data.Wednesday.total;
      sales_weekly.value.thursday = response.data.Thursday.total;
      sales_weekly.value.friday = response.data.Friday.total;
      sales_weekly.value.saturday = response.data.Saturday.total;
    }
  } catch (error) {
    console.log("ERror", error);
  }
};

const fetch_monthly_sales = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/sales/monthly",
      {
        withCredentials: true,
      }
    );
    if (response) {
      sales_monthly.value.january = response.data.January.total;
      sales_monthly.value.february = response.data.February.total;
      sales_monthly.value.march = response.data.March.total;
      sales_monthly.value.april = response.data.April.total;
      sales_monthly.value.may = response.data.May.total;
      sales_monthly.value.june = response.data.June.total;
      sales_monthly.value.july = response.data.July.total;
      sales_monthly.value.august = response.data.August.total;
      sales_monthly.value.september = response.data.September.total;
      sales_monthly.value.october = response.data.October.total;
      sales_monthly.value.november = response.data.November.total;
      sales_monthly.value.december = response.data.December.total;
    }
  } catch (error) {
    console.log("ERror", error);
  }
};

const fetch_sold_products = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/products/sold-products",
      {
        withCredentials: true,
      }
    );
    if (response) {
      sold_products.value = response.data;
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const fetch_sales = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/sales", {
      withCredentials: true,
    });
    if (response.data) {
      sales_made.value = response.data;
    }
  } catch (error) {
    console.log("Error AXIOS", error);
  }
};

onMounted(async () => {
  fetch_weekly_sale();
  fetch_monthly_sales();
  fetch_sales();
  fetch_sold_products();
});
</script>
<template>
  <!-- MAIN CONTENT -->
  <MainContent>
    <PageTitle title="Dashboard" />
    <div class="grid grid-cols-2">
      <div class="border border-gray-200 rounded-lg shadow-sm m-10 p-5">
        <SalesGraph :sales_monthly="sales_monthly" />
      </div>
      <div class="border border-gray-200 rounded-lg shadow-sm m-10 p-5">
        <SalesGraphWeek :sales_weekly="sales_weekly" />
      </div>
      <div class="border border-gray-200 rounded-lg shadow-sm m-10 p-5">
        <SalesMadeListTable :sales_made="sales_made" />
      </div>
      <div class="border border-gray-200 rounded-lg shadow-sm m-10 p-5">
        <SoldProductListTable :sold_products="sold_products" />
      </div>
    </div>
  </MainContent>
</template>
