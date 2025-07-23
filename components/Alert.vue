<script setup lang="ts">
const alertError = useAlertError()
const alertInfo = useAlertInfo()

watchEffect(() => {
  if (alertError.value !== '') {
    setTimeout(() => {
      alertError.value = '';
    }, 3000);
  }

  if (alertInfo.value !== '') {
    setTimeout(() => {
      alertInfo.value = '';
    }, 3000);
  }
})
</script>

<template>
  <!-- 错误提示 -->
  <section v-if="alertError" class="fixed top-4 z-50 left-1/2 -translate-x-1/2">
    <div
      id="alerterror"
      class="flex items-center p-4 mb-4 text-neonRed border border-red-400 rounded-lg bg-gradient-to-r from-black via-[#330000] to-black shadow-lg font-orbitron"
      role="alert"
    >
      <svg
        class="flex-shrink-0 w-4 h-4 text-red-400"
        aria-hidden="true"
        xmlns="http:/*www.w3.org/2000/svg" */
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <span class="sr-only">Error</span>
      <div class="ms-3 text-sm font-medium tracking-wide">
        ⚠ SYSTEM ERROR: {{ alertError }}
      </div>
    </div>
  </section>

  <!-- 信息提示 -->
  <section v-if="alertInfo" class="fixed top-4 z-50 left-1/2 -translate-x-1/2">
    <div
      id="alertInfo"
      class="flex items-center p-4 mb-4 text-cyan-300 border border-cyan-400 rounded-lg bg-gradient-to-r from-black via-[#002b36] to-black shadow-lg font-orbitron"
      role="alert"
    >
      <svg
        class="flex-shrink-0 w-4 h-4 text-cyan-400"
        aria-hidden="true"
        xmlns="http:/*www.w3.org/2000/svg" */
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <span class="sr-only">Info</span>
      <div class="ms-3 text-sm font-medium tracking-wide">
        💡 NOTICE: {{ alertInfo }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-orbitron {
  font-family: 'Orbitron', sans-serif;
}
</style>