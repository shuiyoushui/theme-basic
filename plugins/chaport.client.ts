// plugins/chaport.client.ts

declare global {
  interface Window {
    chaportConfig?: {
      appId: string
    }
    chaport?: any
  }
}

export default defineNuxtPlugin(() => {
  if (process.client) {
    // ✅ 提前配置 chaportConfig
    window.chaportConfig = {
      appId: '6888b22fb1d3d5d22493d690'
    }

    // ✅ 创建 script 标签并监听 onload
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

    // ✅ 插入 script 标签
    document.head.appendChild(script)
  }
})