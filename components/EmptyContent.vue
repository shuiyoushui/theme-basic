<template>
  <div class="grid w-full gap-y-6 mt-20">
    <p class="flex items-end justify-center">
      <svg
        class="w-16 h-16 text-gray-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
        />
      </svg>
    </p>
    <p class="text-gray-400 font-medium flex items-start justify-center">
      <slot></slot>
    </p>
  </div>
</template>