<script setup>
import { defineProps } from "vue";
defineProps({
  bgColor: {
    type: String,
    default: "from-green-200 to-green-100 border-green-600",
  },
  iconColor: {
    type: String,
    default: "bg-green-600",
  },
  title: {
    type: String,
    default: "Card Title",
  },
});
</script>
<template>
  <div class="w-full md:w-1/2 xl:w-1/3 p-6">
    <!--Metric Card-->
    <!-- How to use the props above and put it inside class attribute is by adding colon : -->
    <div
      :class="`${bgColor} bg-gradient-to-b border-b-4 rounded-lg shadow-xl p-5`"
    >
      <div class="flex flex-row items-center">
        <div class="flex-shrink pr-4">
          <div :class="`${iconColor} rounded-full p-5`">
            <i class="fa fa-wallet fa-2x fa-inverse"></i>
          </div>
        </div>
        <div class="flex-1 text-right md:text-center">
          <h5 class="font-bold uppercase text-gray-600">{{ title }}</h5>
          <slot></slot>
        </div>
      </div>
    </div>
    <!--/Metric Card-->
  </div>
</template>
