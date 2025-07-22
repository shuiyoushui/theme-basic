<script setup>
import { onMounted } from 'vue'

const { locale } = useI18n()
const translate = useNuxtApp().$i18n.t

const selectedCate = ref({ name: translate('All'), code: 'all' })
const cates = ref([])
const skus = ref([])
const keyword = ref('')
const selectedSKU = useState('SelectedSKU', () => { return {} })

const filterSkus = (projects, keyword = '') => {
  const allCates = [{ name: translate('All'), code: 'all' }]
  const showSkus = []

  projects.forEach((project) => {
    if (!['DIGITAL', 'MANUAL', 'LICENSE', 'GROUP', 'VPN'].includes(project.type)) {
      return
    }

    allCates.push({
      'name': nameI18n(locale, project),
      'code': project.slug,
    })

    const curSkus = project.skus || []
    curSkus.forEach((sku) => {
      if (selectedCate.value.code != 'all' && selectedCate.value.code != project.slug) { return }

      const searchContent = `${nameI18n(locale, project)} ${nameI18n(locale, sku)}`.toLowerCase()
      if (keyword && !searchContent.includes(keyword.toLowerCase())) { return }

      sku.projectSlug = project.slug
      sku.cover = project.cover
      sku.project = {
        id: project.id,
        type: project.type,
        name: project.name,
        nameI18n: project.nameI18n,
        desc: project.desc,
        descI18n: project.descI18n,
        hasCoupons: project.hasCoupons,
      }
      sku.order.affCode = project.aff
      showSkus.push(sku)
    })
  })

  cates.value = allCates
  skus.value = showSkus
}

const props = defineProps(['merchant'])
const merchant = useDataMerchantInfo()
merchant.value = props.merchant
const siteSettings = merchant.value.website ? merchant.value.website.settings : {}

filterSkus(merchant.value.projects)

watch(merchant, () => {
  const merchantInfo = merchant.value
  if (!isNotEmptyObj(merchantInfo)) { return }
  filterSkus(merchantInfo.projects)
})

watch(keyword, () => {
  filterSkus(merchant.value.projects, keyword.value)
})

const changeCate = (code) => {
  cates.value.forEach((cate) => {
    if (cate.code == code) {
      selectedCate.value = cate
    }
  })
  filterSkus(merchant.value.projects)
}

const selectSKU = (sku) => {
  selectedSKU.value = sku
}

onMounted(() => {
  stateMerchant.info(false);

  // 注入赛博朋克背景效果
  import('three').then(THREE => {
    import('vanta/dist/vanta.net.min').then(VANTA => {
      VANTA.default({
        el: "#vanta-bg",
        THREE: THREE,
        color: 0xff00ff,
        backgroundColor: 0x000000,
        points: 10.0,
        spacing: 18.0
      });
    });
  });

  // 注入 Matrix Rain
  const canvas = document.getElementById("matrixRain");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const matrix = "アカサタナハマヤラワ0123456789".split("");
    const font_size = 12;
    const columns = canvas.width / font_size;
    const drops = new Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = font_size + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 33);
  }
});
</script>

<template>
  <!-- 动态背景层 -->
  <div id="vanta-bg" style="position:fixed;z-index:-2;width:100vw;height:100vh;"></div>
  <canvas id="matrixRain" style="position:fixed;z-index:-1;width:100vw;height:100vh;"></canvas>

  <section class="flex justify-center">
    <div v-if="isNotEmptyObj(merchant)" class="w-full max-w-screen-xl space-y-4 px-4 my-2">

      <div class="mt-4 flex items-center">
        <div>
          <BtnMerchantIntro :intro="descI18n(locale, merchant)" :siteSettings="siteSettings" />
        </div>

        <div class="flex-grow" />

        <div class="flex items-center gap-x-2">
          <div v-if="!isNotEmptyObj(selectedSKU)" class="max-w-md mx-auto">
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" v-model="keyword"
                class="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-0 focus:border-gray-800"
                :placeholder="$t('Search')" />
            </div>
          </div>
          <BtnMerchantContact :contacts="merchant.contacts" :vertical="true" />
        </div>
      </div>

      <ClientOnly v-if="!isNotEmptyObj(selectedSKU)">
        <Carousel :siteSettings="siteSettings" />
      </ClientOnly>

      <div v-if="!isNotEmptyObj(selectedSKU)" id="skus" class="space-y-4">
        <div class="space-y-2">
          <button v-for="cate in cates" @click="changeCate(cate.code)" class="mr-2 btn btn-xs btn-outline rounded-md"
            :class="{ 'btn-active': selectedCate.code == cate.code }">
            {{ cate.name }}
          </button>
        </div>

        <div v-if="selectedCate.code != 'all'" class="sku-name text-md text-gray-600 font-medium">
          {{ selectedCate.name }}
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-4">
          <div v-for=" sku in skus" @click="selectSKU(sku)"
            class="relative w-full card bg-base-100 shadow-xl rounded-md card-compact cursor-pointer">
            <span v-if="sku.stock == 0"
              class="z-10 absolute -right-px -top-px rounded-bl-2xl rounded-tr-md bg-gray-600 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white">
              {{ $t('Sold_out') }}
            </span>

            <figure>
              <NuxtImg loading="lazy" format="webp" :src="sku.cover" :alt="nameI18n(locale, sku)"
                class="p-2 h-[120px] w-[120px] object-cover" />
            </figure>

            <div class="card-body">

              <div class="project-name text-xs text-gray-400 text-center cyberpunk-text">
                {{ nameI18n(locale, sku.project) }}
              </div>

              <div class="sku-name h-14 text-center">
                <span class="text-lg font-medium cyberpunk-text">
                  {{ nameI18n(locale, sku) }}
                </span>
              </div>

              <div class="flex items-center justify-center">
                <PriceTag :key="'price-tag-' + sku.id" :price-desc="sku.priceDesc" class="flex items-center gap-x-1" />
              </div>
            </div>
          </div>
        </div>
        <EmptyContent v-if="skus.length === 0" class="pt-40">{{ $t('No_Skus') }}</EmptyContent>
      </div>
      <div v-else>
        <PlaceOrder />
      </div>

    </div>
    <div v-else class="flex items-center justify-center pt-40">
      <span class="loading loading-infinity loading-lg mt-40"></span>
    </div>
  </section>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

body {
  font-family: 'Orbitron', sans-serif;
  background-color: #000;
  color: #0ff;
}

.cyberpunk-text {
  text-shadow:
    0 0 5px #0ff,
    0 0 10px #0ff,
    0 0 20px #0ff,
    0 0 40px #f0f;
}

.project-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sku-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
