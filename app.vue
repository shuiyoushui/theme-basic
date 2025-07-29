<template>
  <NuxtLayout>
    <NuxtPage />
    <ChaportDebugger /> <!-- 👈 添加这行 -->
  </NuxtLayout>
</template>

<script setup>
import ChaportDebugger from '@/components/ChaportDebugger.vue'
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>