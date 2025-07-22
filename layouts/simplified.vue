<script setup>
import { nameI18n } from '~/utils/i18n';

const { locale } = useI18n()
const localePath = useLocalePath()
const basicInfo = await stateMerchant.basic(true)
const themeId = basicInfo.website ? basicInfo.website.theme : '1'
const scripts = basicInfo.website ? basicInfo.website.script : ''
</script>

<template>
  <NuxtLayout v-if="!isNotEmptyObj(basicInfo)" name="default">
    <p class="mt-40 text-xl font-medium flex items-center justify-center">
      Missing NUXT_IDATARIVER_MERCHANT_SECRET 😉
    </p>
  </NuxtLayout>
  <NuxtLayout v-else name="default">
    <!-- Header -->
    <div class="fixed top-0 z-50 w-full flex items-center justify-center bg-black shadow-md">
      <div class="w-full px-4 py-2"
        :class="{ 'max-w-screen-xl': themeId == '1', 'max-w-screen-lg': themeId == '2' }">
        <div class="flex items-center h-16">
          <div class="flex items-center gap-x-2">
            <NuxtLink :to="localePath('/')" class="flex items-center gap-x-2">
              <img src="/logo_cyberpunk_glow.png" alt="logo" class="h-10 w-10 rounded-xl shadow-md" />
              <span class="text-lg font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
                {{ nameI18n(locale, basicInfo) }}
              </span>
            </NuxtLink>
          </div>
          <div class="flex-grow" />
          <div class="flex items-center space-x-1">
            <NuxtLink :to="localePath('/order/search')" class="btn btn-sm btn-outline rounded-md text-white border-fuchsia-500">
              {{ $t('header_search_order') }}
            </NuxtLink>
            <LangSwitcher />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mt-16 w-full flex items-center justify-center bg-gradient-to-b from-[#0f051d] to-[#120c2c] text-white min-h-screen">
      <div class="w-full">
        <slot />
      </div>
    </div>

    <Footer />

    <template v-if="scripts">
      <div v-html="scripts"></div>
    </template>
  </NuxtLayout>
</template>

<style>
.merchant-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

body {
  background-color: #0f051d;
  color: #ffffff;
  font-family: 'Orbitron', 'Segoe UI', 'Roboto', sans-serif;
}

.btn-outline {
  border-color: #f0f;
  color: #f0f;
}
</style>
