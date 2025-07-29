// plugins/chaport.client.ts

// ✅ 声明 window.chaportConfig 类型，避免 TS 报错阻断插件执行
declare global {
  interface Window {
    chaportConfig?: {
      appId: string
    }
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
    document.head.appendChild(script)
  }
})