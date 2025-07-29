// plugins/chaport.client.ts

declare global {
  interface Window {
    chaportConfig?: {
      appId: string
    }
    chaport?: any
    __assets?: any // 可选声明，用于安全判断
  }
}

export default defineNuxtPlugin(() => {
  if (process.client) {
    window.chaportConfig = {
      appId: '6888b22fb1d3d5d22493d690'
    }

    const script = document.createElement('script')
    script.src = 'https://app.chaport.com/javascripts/insert.js'
    script.async = true
    script.type = 'text/javascript'

    script.onload = () => {
      try {
        // ✅ 防御式检查，避免访问未定义对象报错
        if (typeof window.__assets !== 'undefined') {
          console.log('[Chaport] 插件加载完成，__assets 可用')
        } else {
          console.warn('[Chaport] 插件加载完成，但 window.__assets 未定义')
        }
      } catch (e) {
        console.error('[Chaport] 插件加载后出错：', e)
      }
    }

    script.onerror = () => {
      console.error('[Chaport] 插件加载失败')
    }

    document.head.appendChild(script)
  }
})