// plugins/chaport.client.ts
declare global {
  interface Window {
    chaportConfig?: { appId: string }
    chaport?: any
    chaportInitResult?: any
  }
}

export default defineNuxtPlugin(() => {
  if (process.client) {
    // ✅ 设置 config
    window.chaportConfig = {
      appId: '6888b22fb1d3d5d22493d690'
    }

    // ✅ 避免 insert.js 报错
    if (!window.chaport) {
      window.chaport = {}
    }

    // ✅ 安全延迟加载 script，避免影响主页面渲染
    setTimeout(() => {
      const script = document.createElement('script')
      script.src = 'https://app.chaport.com/javascripts/insert.js'
      script.async = true
      script.type = 'text/javascript'

      script.onload = () => {
        console.log('[Chaport] 插件加载完成')
      }

      script.onerror = () => {
        console.error('[Chaport] 插件加载失败')
      }

      document.head.appendChild(script)
    }, 100) // ✅ 可根据需要再延长一点
  }
})