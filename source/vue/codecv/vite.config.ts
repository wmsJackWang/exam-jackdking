import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import eslint from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
// import externalGlobals from 'rollup-plugin-external-globals'
import viteImagemin from 'vite-plugin-imagemin'

// const globals = externalGlobals({
// jspdf: 'jspdf.jsPDF',
// axios: 'axios'
// html2canvas: 'html2canvas'
// })

const viteCompressionPlugin = viteCompression({
  disable: false,
  threshold: 10240 // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
})

const viteImageminPlugin = viteImagemin({
  gifsicle: {
    optimizationLevel: 7,
    interlaced: false
  },
  optipng: {
    optimizationLevel: 7
  },
  mozjpeg: {
    quality: 20
  },
  pngquant: {
    quality: [0.8, 0.9],
    speed: 4
  },
  svgo: {
    plugins: [
      {
        name: 'removeViewBox'
      },
      {
        name: 'removeEmptyAttrs',
        active: false
      }
    ]
  }
})

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      eslint({ lintOnStart: false, cache: false }) // 打包以及启动项目开启eslint检查
    ],
    define: {
      // 'import.meta.env.VITE_BASE_URL': JSON.stringify('http://bittechblog.com')
      'import.meta.env.VITE_BASE_URL': JSON.stringify('http://localhost:8083'),
      // VITE_UPSTASH_BASE_URL
      'import.meta.env.VITE_UPSTASH_BASE_URL': JSON.stringify('http://localhost:8083')
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@@types': resolve(__dirname, 'types')
      }
    },
    esbuild: {
      drop: env?.VITE_DROP_CONSOLE === 'true' ? ['console', 'debugger'] : []
    },
    base: './',
    build: {
      rollupOptions: {
        // external: ['jspdf', 'axios', 'html2canvas'],
        // external: ['axios'],
        plugins: [
          /* globals,  */ viteCompressionPlugin,
          viteImageminPlugin,
          visualizer({ open: true })
        ],
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  })
}
