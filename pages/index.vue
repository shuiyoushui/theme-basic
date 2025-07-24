<!-- pages/index.vue 顶部加入 -->
<!-- === TESTING VERCEL BUILD - 2025-07-24 === -->

<script setup>
import { onMounted } from 'vue'

const { locale } = useI18n()
const merchantInfo = await stateMerchant.info(true)
const themeId = merchantInfo.website?.theme || '1'

const seoInit = (infoObj) => {
  const info = isRef(infoObj) ? infoObj.value : infoObj
  if (!isNotEmptyObj(info)) return

  const url = useRequestURL().href
  const title = nameI18n(locale, info)
  let description = descI18n(locale, info).replace(/[\r\n]/g, ' ')
  let itemListElement = []

  info.projects?.forEach(project => {
    description += '|' + nameI18n(locale, project)
    project?.skus?.forEach(sku => {
      itemListElement.push({
        "@type": "ListItem",
        "position": itemListElement.length + 1,
        "item": {
         "@id": `${url}#${sku.id}`,
         "name": nameI18n(locale, sku)
        }
      })
    })
  })

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { itemprop: 'name', content: title },
      { itemprop: 'description', content: description },
      { itemprop: 'url', content: url }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement
        })
      }
    ]
  })

  useSeoMeta({
    ogType: 'website',
    ogSiteName: title,
    ogTitle: title,
    ogUrl: url,
    ogDescription: description
  })
}

seoInit(merchantInfo)

onMounted(() => {
  import('three').then(THREE => {
    import('vanta/dist/vanta.net.min').then(VANTA => {
      VANTA.default({
        el: "#vanta-bg",
        THREE,
        color: 0xff00ff,
        backgroundColor: 0x000000,
        points: 10.0,
        spacing: 16.0
      })
    })
  })

  const canvas = document.getElementById("matrixRain")
  if (canvas) {
    const ctx = canvas.getContext("2d")
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const matrix = "アカサタナハマヤラワ0123456789".split("")
    const font_size = 12
    const columns = canvas.width / font_size
    const drops = new Array(Math.floor(columns)).fill(1)

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#0F0"
      ctx.font = font_size + "px monospace"
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * font_size, drops[i] * font_size)
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    setInterval(draw, 33)
  }
})
</script>

<template>
  <!-- 背景动效 -->
  <div id="vanta-bg" style="position:fixed;z-index:-2;width:100vw;height:100vh;"></div>
  <canvas id="matrixRain" style="position:fixed;z-index:-1;width:100vw;height:100vh;"></canvas>

  <!-- 主内容区 -->
  <NuxtLayout name="simplified" :merchant="merchantInfo">
    <HomeTheme1 v-if="themeId === '1'" :merchant="merchantInfo" />
    <HomeTheme2 v-else-if="themeId === '2'" :merchant="merchantInfo" />
    <HomeTheme1 v-else :merchant="merchantInfo" />
  </NuxtLayout>
</template>

<style scoped>
/* 清空 style 避免 postcss 缓存错误 */
</style>