// plugins/chaport.client.ts
declare global {
  interface Window {
    chaportConfig?: {
      appId: string
    }
    chaport?: any
    __assets?: any
  }
}

export default defineNuxtPlugin(() => {
  if (process.client) {
    // ✅ 提前配置 chaportConfig
    window.chaportConfig = {
      appId: '6888b22fb1d3d5d22493d690'
    }

    // ✅ 延迟 50ms 防止首屏加载与 chaport 冲突
    setTimeout(() => {
      const script = document.createElement('script')
      script.src = 'https://app.chaport.com/javascripts/insert.js'
      script.async = true
      script.type = 'text/javascript'

      script.onload = () => {
        console.log('[Chaport] 插件加载完成')
        // ✅ 确保 __assets 不为空，避免后续脚本访问时报错
        if (!window.__assets) {
          window.__assets = {}
        }
      }

      script.onerror = () => {
        console.error('[Chaport] 插件加载失败')
      }

      document.head.appendChild(script)
    }, 50) // 轻微延迟注入
  }
})