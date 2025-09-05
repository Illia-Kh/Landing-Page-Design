
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'node:fs'
import path from 'node:path'

// https://vitejs.dev/config/
// Banner manifest generator: exposes /media/banner/manifest.json
// - Dev: serves virtual json by reading public/media/banner
// - Build: writes dist/media/banner/manifest.json
const bannerManifestPlugin = () => {
  return {
    name: 'banner-manifest-plugin',
    configureServer(server: any) {
      server.middlewares.use('/media/banner/manifest.json', async (_req: any, res: any) => {
        try {
          const dir = path.join(server.config.root, 'public', 'media', 'banner')
          const files = fs.existsSync(dir) ? fs.readdirSync(dir) : []
          const allowed = files
            .filter((f: string) => /\.(webp|avif|jpe?g)$/i.test(f))
            .sort((a: string, b: string) => a.localeCompare(b, undefined, { numeric: true }))
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ files: allowed }))
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ files: [] }))
        }
      })
    },
    closeBundle(this: any) {
      try {
        const rootDir = this?.meta?.watchMode ? process.cwd() : process.cwd()
        const publicDir = path.join(rootDir, 'public', 'media', 'banner')
        const outDir = path.join(rootDir, 'dist', 'media', 'banner')
        const files = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : []
        const allowed = files
          .filter((f: string) => /\.(webp|avif|jpe?g)$/i.test(f))
          .sort((a: string, b: string) => a.localeCompare(b, undefined, { numeric: true }))
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true })
        }
        fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify({ files: allowed }))
      } catch {
        // noop
      }
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    bannerManifestPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
          framer: ['framer-motion'],
          radix: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-tooltip'
          ]
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            extType = 'css';
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
            extType = 'fonts';
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/.test(assetInfo.name)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    target: 'esnext',
    cssCodeSplit: true,
    cssMinify: true,
    assetsInlineLimit: 4096,
  }
})