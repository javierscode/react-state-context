import Script from 'next/script'

export function ReactScanScript() {
  return (
    <Script
      src='https://unpkg.com/react-scan/dist/auto.global.js'
      strategy='beforeInteractive'
    />
  )
}
