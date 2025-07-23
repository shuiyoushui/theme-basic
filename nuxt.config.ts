// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
    idatariverMerchantSecret: '',
    public: {
      idatariver: 'https://www.idatariver.com',
      idatariverServer: 'https://open.idatariver.com',
      apiEncryptKey: 'Powered By iDataRiver.com',
    }
  },

  components: [
    {
      path: '~/components',
    },
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],

  css: ['~/assets/css/main.css'],

  nitro: {
    compressPublicAssets: true,
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
})