export default defineNuxtPlugin(() => {
  if (process.client) {
    const GA_ID = 'G-S40NYGB5ZK'  // 替换成你的 GA ID

    // 插入 GA 远程脚本
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    // 初始化 dataLayer
    window.dataLayer = window.dataLayer || []
    const gtag = function () {
      window.dataLayer.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', GA_ID, {
      debug_mode: true  // ✅ 启用调试模式，确保数据出现在 GA DebugView
    })

    // 挂载到全局（可选）
    window.gtag = gtag
  }
})
