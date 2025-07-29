<!-- components/ChaportDebugger.vue -->
<template>
  <div class="fixed bottom-4 right-4 z-50 p-4 bg-white shadow-md border rounded-lg">
    <button @click="runDiagnostics" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      🧪 检查 Chaport 插件状态
    </button>
    <div class="mt-2 text-sm text-gray-700 whitespace-pre-wrap" v-if="log.length">
      {{ log }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const log = ref('')

function runDiagnostics() {
  log.value = '正在检测 Chaport 插件状态...\n'

  // 1. 检查 window.chaport
  if (typeof window.chaport !== 'undefined') {
    log.value += '✅ window.chaport 已存在。\n'
  } else {
    log.value += '❌ window.chaport 不存在。\n'
  }

  // 2. 检查插件 DOM 是否存在
  const widget = document.querySelector('[class*="chaport"]')
  if (widget) {
    log.value += `✅ 找到插件 DOM 节点，class: ${widget.className}\n`

    const style = window.getComputedStyle(widget as HTMLElement)
    if (style.display === 'none') {
      log.value += '⚠️ 插件 DOM 被隐藏（display: none）\n'
    } else {
      log.value += '✅ 插件 DOM 可见。\n'
    }
  } else {
    log.value += '❌ 页面中未找到任何 chaport 插件 DOM。\n'
  }

  // 3. 检查脚本是否加载
  const scriptTag = document.querySelector('script[src*="chaport"]')
  if (scriptTag) {
    log.value += '✅ 插件脚本已插入页面。\n'
  } else {
    log.value += '❌ 插件脚本未加载或加载失败。\n'
  }

  // 4. 检查 InitResult 和 Assets
  if (window.chaportInitResult) {
    log.value += '✅ window.chaportInitResult 存在。\n'
  } else {
    log.value += '⚠️ window.chaportInitResult 不存在（可能未获取资源配置）。\n'
  }

  if (window.chaport && window.chaport.__assets) {
    log.value += '✅ chaport.__assets 加载成功。\n'
  } else {
    log.value += '⚠️ chaport.__assets 未定义，插件可能未初始化完成。\n'
  }
}
</script>