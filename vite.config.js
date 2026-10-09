import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

function inlineAssets() {
  return {
    name: 'inline-assets',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset' || typeof html.source !== 'string') {
        throw new Error('Could not find the generated index.html to create a standalone build.')
      }

      let standaloneHtml = html.source
      const entry = Object.values(bundle).find(output => output.type === 'chunk' && output.isEntry)
      if (!entry) throw new Error('Could not find the JavaScript entry point for the standalone build.')

      const scriptTag = /<script type="module" crossorigin src="([^"]+)"><\/script>/
      if (!scriptTag.test(standaloneHtml)) {
        throw new Error('Could not find the generated JavaScript tag in index.html.')
      }
      const inlineScript = entry.code.replace(/<\/script/gi, '\\x3c/script')
      standaloneHtml = standaloneHtml.replace(scriptTag, () => `<script type="module">${inlineScript}</script>`)

      const stylesheet = Object.values(bundle).find(output => output.type === 'asset' && output.fileName.endsWith('.css'))
      if (stylesheet) {
        const linkTag = /<link rel="stylesheet" crossorigin href="([^"]+)">/
        if (!linkTag.test(standaloneHtml)) {
          throw new Error('Could not find the generated stylesheet link in index.html.')
        }
        standaloneHtml = standaloneHtml.replace(linkTag, () => `<style>${stylesheet.source}</style>`)
        delete bundle[stylesheet.fileName]
      }

      html.source = standaloneHtml
      delete bundle[entry.fileName]
    },
    writeBundle(outputOptions) {
      if (!outputOptions.dir) throw new Error('Could not determine the build output directory for CityPulse.html.')
      copyFileSync(
        resolve(outputOptions.dir, 'index.html'),
        resolve(projectRoot, 'CityPulse.html'),
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), inlineAssets()],
})
