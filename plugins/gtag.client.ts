// plugins/gtag.client.ts
export default defineNuxtPlugin(() => {
  if (process.client) {
    const GA_ID = 'G-S40NYGB5ZK'

    // 避免重复注入
    if ((window as any).gtag) return

    // 先准备 dataLayer 与 gtag 占位
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).gtag = function gtag() { (window as any).dataLayer.push(arguments) }

    // 挂载远程脚本，并在 onload 里做初始化（保证 100% 命中）
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    s.onload = () => {
      (window as any).gtag('js', new Date())
      ;(window as any).gtag('config', GA_ID, { debug_mode: true })

      // 手动发送首屏 + 监听路由变化
      const router = useRouter()
      const sendPV = (path: string) => {
        (window as any).gtag('config', GA_ID, { page_path: path })
        ;(window as any).gtag('event', 'page_view', { page_path: path })
      }
      // 首屏
      sendPV(window.location.pathname + window.location.search)
      // 路由切换
      router.afterEach((to) => sendPV(to.fullPath))

      console.log('[GA] gtag loaded & hooked')
    }
    s.onerror = () => console.error('[GA] gtag script load failed')
    document.head.appendChild(s)
  }
})
