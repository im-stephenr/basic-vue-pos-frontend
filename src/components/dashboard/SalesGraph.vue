<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { computed } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  sales_monthly: Object,
});

const chartOptions = {
  responsive: true,
};

const date = new Date();
const year = date.getFullYear();

const chartData = computed(() => ({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Sales Monthly (" + year + ")",
      backgroundColor: "#f87979",
      data: [
        props.sales_monthly.january,
        props.sales_monthly.february,
        props.sales_monthly.march,
        props.sales_monthly.april,
        props.sales_monthly.may,
        props.sales_monthly.june,
        props.sales_monthly.july,
        props.sales_monthly.august,
        props.sales_monthly.september,
        props.sales_monthly.october,
        props.sales_monthly.november,
        props.sales_monthly.december,
      ],
    },
  ],
}));
</script>
