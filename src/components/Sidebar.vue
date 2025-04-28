<script setup>
import { useRoute, RouterLink } from "vue-router";

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>
<template>
  <div
    class="bg-gray-800 shadow-xl bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48"
  >
    <div
      class="md:mt-12 md:w-48 h-full md:left-0 md:top-0 content-center md:content-start text-left justify-between"
    >
      <ul
        class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left"
      >
        <li class="mr-3 flex-1">
          <RouterLink
            to="/dashboard"
            :class="[
              isActiveLink('/dashboard') ? 'border-b-2 border-blue-600' : '',
              'block',
              'py-1',
              'md:py-3',
              'pl-1',
              'align-middle',
              'text-white',
              'no-underline',
              'hover:text-white',
            ]"
          >
            <i class="fas fa-tasks pr-0 md:pr-3"></i
            ><span
              :class="[
                isActiveLink('/dashboard') ? 'text-blue-500 ' : 'text-white',
                'block',
                'md:inline-block',
                'pb-1',
                'md:pb-0 ',
                'text-xs',
                'md:text-base',
              ]"
              >Dashboard</span
            >
          </RouterLink>
        </li>

        <li class="mr-3 flex-1">
          <RouterLink
            to="/"
            :class="[
              isActiveLink('/') ? 'border-b-2 border-blue-600' : '',
              'block',
              'py-1',
              'md:py-3',
              'pl-1',
              'align-middle',
              'text-white',
              'no-underline',
              'hover:text-white',
            ]"
          >
            <i class="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i
            ><span
              :class="[
                isActiveLink('/') ? 'text-blue-500 ' : 'text-white',
                'block',
                'md:inline-block',
                'pb-1',
                'md:pb-0 ',
                'text-xs',
                'md:text-base',
              ]"
              >POS</span
            >
          </RouterLink>
        </li>
        <li class="mr-3 flex-1">
          <RouterLink
            to="/settings"
            :class="[
              isActiveLink('/settings') ? 'border-b-2 border-blue-600' : '',
              'block',
              'py-1',
              'md:py-3',
              'pl-1',
              'align-middle',
              'text-white',
              'no-underline',
              'hover:text-white',
            ]"
          >
            <i class="fa fa-wallet pr-0 md:pr-3"></i
            ><span
              :class="[
                isActiveLink('/settings') ? 'text-blue-500 ' : 'text-white',
                'block',
                'md:inline-block',
                'pb-1',
                'md:pb-0 ',
                'text-xs',
                'md:text-base',
              ]"
              >Settings</span
            >
          </RouterLink>
        </li>
        <li class="mr-3 flex-1">
          <RouterLink
            to="/products"
            :class="[
              isActiveLink('/products') ? 'border-b-2 border-blue-600' : '',
              'block',
              'py-1',
              'md:py-3',
              'pl-1',
              'align-middle',
              'text-white',
              'no-underline',
              'hover:text-white',
            ]"
          >
            <i class="fa fa-wallet pr-0 md:pr-3"></i
            ><span
              :class="[
                isActiveLink('/products') ? 'text-blue-500 ' : 'text-white',
                'block',
                'md:inline-block',
                'pb-1',
                'md:pb-0 ',
                'text-xs',
                'md:text-base',
              ]"
              >Products</span
            >
          </RouterLink>
        </li>
        <li class="mr-3 flex-1">
          <RouterLink
            to="/category-list"
            :class="[
              isActiveLink('/category-list')
                ? 'border-b-2 border-blue-600'
                : '',
              'block',
              'py-1',
              'md:py-3',
              'pl-1',
              'align-middle',
              'text-white',
              'no-underline',
              'hover:text-white',
            ]"
          >
            <i class="fa fa-wallet pr-0 md:pr-3"></i
            ><span
              :class="[
                isActiveLink('/category-list')
                  ? 'text-blue-500 '
                  : 'text-white',
                'block',
                'md:inline-block',
                'pb-1',
                'md:pb-0 ',
                'text-xs',
                'md:text-base',
              ]"
              >Categories</span
            >
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
