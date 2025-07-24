export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap'
        }
      ]
    }
  },

  runtimeConfig: {
    idatariverMerchantSecret: process.env.NUXT_IDATARIVER_MERCHANT_SECRET || '',
    public: {
      idatariver: 'https://www.idatariver.com',
      idatariverServer: 'https://open.idatariver.com',
      apiEncryptKey: 'Powered By iDataRiver.com',
    }
  },

  components: [{ path: '~/components' }],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],

  sitemap: {
    disableDefaultSitemapIndex: true, // ✅ 关键点，禁用 sitemap_index.xml
    sitemaps: [
      { path: '/sitemap-en.xml', locale: 'en' },
      { path: '/sitemap-es.xml', locale: 'es' },
      { path: '/sitemap-de.xml', locale: 'de' },
      { path: '/sitemap-fr.xml', locale: 'fr' },
      { path: '/sitemap-ja.xml', locale: 'ja' },
      { path: '/sitemap-zh-cn.xml', locale: 'zh-cn' },
      { path: '/sitemap-zh-hk.xml', locale: 'zh-hk' },
      { path: '/sitemap-ko.xml', locale: 'ko' },
      { path: '/sitemap-tr.xml', locale: 'tr' },
      { path: '/sitemap-ru.xml', locale: 'ru' },
      { path: '/sitemap-uk.xml', locale: 'uk' },
      { path: '/sitemap-uz.xml', locale: 'uz' },
      { path: '/sitemap-kk.xml', locale: 'kk' },
      { path: '/sitemap-pl.xml', locale: 'pl' },
      { path: '/sitemap-ar.xml', locale: 'ar' },
      { path: '/sitemap-pt.xml', locale: 'pt' },
      { path: '/sitemap-fa.xml', locale: 'fa' },
      { path: '/sitemap-pa.xml', locale: 'pa' },
    ]
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      { code: 'en', iso: 'en' },
      { code: 'es', iso: 'es' },
      { code: 'de', iso: 'de' },
      { code: 'fr', iso: 'fr' },
      { code: 'ja', iso: 'ja' },
      { code: 'zh-cn', iso: 'zh-cn' },
      { code: 'zh-hk', iso: 'zh-hk' },
      { code: 'ko', iso: 'ko' },
      { code: 'tr', iso: 'tr' },
      { code: 'ru', iso: 'ru' },
      { code: 'uk', iso: 'uk' },
      { code: 'uz', iso: 'uz' },
      { code: 'kk', iso: 'kk' },
      { code: 'pl', iso: 'pl' },
      { code: 'ar', iso: 'ar' },
      { code: 'pt', iso: 'pt' },
      { code: 'fa', iso: 'fa' },
      { code: 'pa', iso: 'pa' },
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    }
  },

  robots: {
    configPath: './robots.config.ts',
  },

  site: {
    autoLastmod: true,
  },

  postcss: {
    plugins: {
      // tailwindcss: {}, // 可根据需要开启
      // autoprefixer: {}, // 可根据需要开启
    },
  },

  nitro: {
    compressPublicAssets: true,
    compatibilityDate: '2025-07-24',
  },
})