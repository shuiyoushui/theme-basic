// types/gtag.d.ts
export {}

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}