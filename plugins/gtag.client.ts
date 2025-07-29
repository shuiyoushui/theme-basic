// plugins/gtag.client.ts
export default defineNuxtPlugin(() => {
  if (process.client) {
    const GA_ID = 'G-S40NYGB5ZK' // 替换为你的实际 ID

    // 插入 GA 远程脚本
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    // 初始化 dataLayer
    window.dataLayer = window.dataLayer || []
    const gtag = (...args: any[]) => {
      window.dataLayer.push(args)
    }

    gtag('js', new Date())
    gtag('config', GA_ID, {
      debug_mode: true // ✅ 启用调试模式
    })

    // 挂载到全局
    window.gtag = gtag
  }
})