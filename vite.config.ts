import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { visualizer } from "rollup-plugin-visualizer"
import viteImagemin from 'vite-plugin-imagemin'
import importToCDN from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), visualizer({
    filename: './dist/stats.html',
    open: true,
    gzipSize: true,
  }),
  viteImagemin({
    gifsicle: { optimizationLevel: 7 },
    mozjpeg: { quality: 20 },
    pngquant: { quality: [0.8, 0.9], speed: 4 },
    svgo: { plugins: [{ name: 'removeViewBox' }] },
  }),
  importToCDN({
    modules: [
      {
        name: 'vue',
        var: 'Vue',
        path: 'https://cdn.jsdelivr.net/npm/vue@3.5.13/dist/vue.global.min.js',
      },
      {
        name: 'axios',
        var: 'axios',
        path: 'https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js',
      },
      {
        name: 'naive-ui',
        var: 'naive',
        path: 'https://cdn.jsdelivr.net/npm/naive-ui@2.38.3/dist/index.js',
      }
    ],
  })],
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vendor-vue';
            if (id.includes('axios')) return 'vendor-axios';
            if (id.includes('node_modules/chart.js')) {
              return 'chartjs-bundle';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {},
  },
})
