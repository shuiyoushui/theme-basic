// plugins/00.chaport.client.ts
declare global {
  interface Window {
    chaportConfig?: { appId: string }
    chaport?: any
    chaportInitResult?: any
  }
}

export default defineNuxtPlugin(() => {
  if (!process.client) return

  // 1) 先建立全局对象，避免 insert.js 提前访问时报错
  window.chaport = window.chaport || {}
  window.chaportConfig = { appId: '6888b22fb1d3d5d22493d690' }

  // 2) 仅注入一次，防止重复加载
  const TAG_ID = 'chaport-insert-js'
  if (!document.getElementById(TAG_ID)) {
    const script = document.createElement('script')
    script.id = TAG_ID
    script.src = 'https://app.chaport.com/javascripts/insert.js'
    script.async = true
    script.type = 'text/javascript'

    script.onload = () => {
      console.log('[Chaport] 插件加载完成')
      // 插入后轮询一次 __assets 是否就绪（最多 20 次）
      let tries = 0
      const timer = setInterval(() => {
        tries++
        if (window.chaport && window.chaport.__assets) {
          console.log('[Chaport] 资源已就绪')
          clearInterval(timer)
        }
        if (tries > 20) clearInterval(timer)
      }, 250)
    }

    script.onerror = () => {
      console.error('[Chaport] 插件加载失败')
    }

    document.head.appendChild(script)
  }
})
