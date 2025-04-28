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
import { onMounted, defineProps, computed } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
// Get week in current day
const selectWeek = (date) => {
  const selectWeek = [];
  let temp = date;
  while (temp.getDay() > 0) temp.setDate(temp.getDate() - 1); // find Sunday
  // get the rest of the week in the only do while loop ever created
  do {
    selectWeek.push(new Date(temp));
    temp.setDate(temp.getDate() + 1);
  } while (temp.getDay() !== 0);

  return selectWeek;
};
const currentWeek = selectWeek(new Date());
const currentWeekArray = [];
const iterateWeek = currentWeek.map((date) => {
  currentWeekArray.push(date.toLocaleString("en-us", { weekday: "long" }));
});

const props = defineProps({
  sales_weekly: Object,
});

const date = new Date(Date.now());
const year = date.getFullYear();
const month = date.toLocaleString("en-US", { month: "long" });

const chartData = computed(() => ({
  labels: currentWeekArray, // Ensure this is defined
  datasets: [
    {
      label: "Sales Weekly (" + month + ", " + year + ")",
      backgroundColor: "#006400",
      data: [
        props.sales_weekly.sunday,
        props.sales_weekly.monday,
        props.sales_weekly.tuesday,
        props.sales_weekly.wednesday,
        props.sales_weekly.thursday,
        props.sales_weekly.friday,
        props.sales_weekly.saturday,
      ],
    },
  ],
}));

const chartOptions = {
  responsive: true,
};
</script>
