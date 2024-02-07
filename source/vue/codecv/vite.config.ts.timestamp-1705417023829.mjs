// vite.config.ts
import vue from "file:///C:/Users/10421/Documents/GitHub/exam-jackdking/source/vue/codecv/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///C:/Users/10421/Documents/GitHub/exam-jackdking/source/vue/codecv/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/Users/10421/Documents/GitHub/exam-jackdking/source/vue/codecv/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Components from "file:///C:/Users/10421/Documents/GitHub/exam-jackdking/source/vue/codecv/node_modules/unplugin-vue-components/dist/vite.mjs";
import { defineConfig, loadEnv } from "file:///C:/Users/10421/Documents/GitHub/exam-jackdking/source/vue/codecv/node_modules/vite/dist/node/index.js";
import viteCompression from "file:///C:/Users/10421/Documents/GitHub/exam-jackdking/source/vue/codecv/node_modules/vite-plugin-compression/dist/index.mjs";
import eslint from "file:///C:/Users/10421/Documents/GitHub/exam-jackdking/source/vue/codecv/node_modules/vite-plugin-eslint/dist/index.mjs";
import { visualizer } from "file:///C:/Users/10421/Documents/GitHub/exam-jackdking/source/vue/codecv/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteImagemin from "file:///C:/Users/10421/Documents/GitHub/exam-jackdking/source/vue/codecv/node_modules/vite-plugin-imagemin/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\10421\\Documents\\GitHub\\exam-jackdking\\source\\vue\\codecv";
var viteCompressionPlugin = viteCompression({
  disable: false,
  threshold: 10240
});
var viteImageminPlugin = viteImagemin({
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
        name: "removeViewBox"
      },
      {
        name: "removeEmptyAttrs",
        active: false
      }
    ]
  }
});
var vite_config_default = ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      eslint({ lintOnStart: false, cache: false })
    ],
    define: {
      "import.meta.env.VITE_BASE_URL": JSON.stringify("http://bittechblog.com")
    },
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src"),
        "@@types": resolve(__vite_injected_original_dirname, "types")
      }
    },
    esbuild: {
      drop: (env == null ? void 0 : env.VITE_DROP_CONSOLE) === "true" ? ["console", "debugger"] : []
    },
    base: "./",
    build: {
      rollupOptions: {
        plugins: [
          viteCompressionPlugin,
          viteImageminPlugin,
          visualizer({ open: true })
        ],
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          }
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxMDQyMVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXGV4YW0tamFja2RraW5nXFxcXHNvdXJjZVxcXFx2dWVcXFxcY29kZWN2XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxMDQyMVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXGV4YW0tamFja2RraW5nXFxcXHNvdXJjZVxcXFx2dWVcXFxcY29kZWN2XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8xMDQyMS9Eb2N1bWVudHMvR2l0SHViL2V4YW0tamFja2RraW5nL3NvdXJjZS92dWUvY29kZWN2L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xuaW1wb3J0IGVzbGludCBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuLy8gaW1wb3J0IGV4dGVybmFsR2xvYmFscyBmcm9tICdyb2xsdXAtcGx1Z2luLWV4dGVybmFsLWdsb2JhbHMnXG5pbXBvcnQgdml0ZUltYWdlbWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJ1xuXG4vLyBjb25zdCBnbG9iYWxzID0gZXh0ZXJuYWxHbG9iYWxzKHtcbi8vIGpzcGRmOiAnanNwZGYuanNQREYnLFxuLy8gYXhpb3M6ICdheGlvcydcbi8vIGh0bWwyY2FudmFzOiAnaHRtbDJjYW52YXMnXG4vLyB9KVxuXG5jb25zdCB2aXRlQ29tcHJlc3Npb25QbHVnaW4gPSB2aXRlQ29tcHJlc3Npb24oe1xuICBkaXNhYmxlOiBmYWxzZSxcbiAgdGhyZXNob2xkOiAxMDI0MCAvLyBcdTU5ODJcdTY3OUNcdTRGNTNcdTc5RUZcdTU5MjdcdTRFOEVcdTk2MDhcdTUwM0NcdUZGMENcdTVDMDZcdTg4QUJcdTUzOEJcdTdGMjlcdUZGMENcdTUzNTVcdTRGNERcdTRFM0FiXHVGRjBDXHU0RjUzXHU3OUVGXHU4RkM3XHU1QzBGXHU2NUY2XHU4QkY3XHU0RTBEXHU4OTgxXHU1MzhCXHU3RjI5XHVGRjBDXHU0RUU1XHU1MTREXHU5MDAyXHU1Rjk3XHU1MTc2XHU1M0NEXG59KVxuXG5jb25zdCB2aXRlSW1hZ2VtaW5QbHVnaW4gPSB2aXRlSW1hZ2VtaW4oe1xuICBnaWZzaWNsZToge1xuICAgIG9wdGltaXphdGlvbkxldmVsOiA3LFxuICAgIGludGVybGFjZWQ6IGZhbHNlXG4gIH0sXG4gIG9wdGlwbmc6IHtcbiAgICBvcHRpbWl6YXRpb25MZXZlbDogN1xuICB9LFxuICBtb3pqcGVnOiB7XG4gICAgcXVhbGl0eTogMjBcbiAgfSxcbiAgcG5ncXVhbnQ6IHtcbiAgICBxdWFsaXR5OiBbMC44LCAwLjldLFxuICAgIHNwZWVkOiA0XG4gIH0sXG4gIHN2Z286IHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdyZW1vdmVWaWV3Qm94J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ3JlbW92ZUVtcHR5QXR0cnMnLFxuICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICB9XG4gICAgXVxuICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldXG4gICAgICB9KSxcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldXG4gICAgICB9KSxcbiAgICAgIGVzbGludCh7IGxpbnRPblN0YXJ0OiBmYWxzZSwgY2FjaGU6IGZhbHNlIH0pIC8vIFx1NjI1M1x1NTMwNVx1NEVFNVx1NTNDQVx1NTQyRlx1NTJBOFx1OTg3OVx1NzZFRVx1NUYwMFx1NTQyRmVzbGludFx1NjhDMFx1NjdFNVxuICAgIF0sXG4gICAgZGVmaW5lOiB7XG4gICAgICAnaW1wb3J0Lm1ldGEuZW52LlZJVEVfQkFTRV9VUkwnOiBKU09OLnN0cmluZ2lmeSgnaHR0cDovL2JpdHRlY2hibG9nLmNvbScpXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAgICdAQHR5cGVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICd0eXBlcycpXG4gICAgICB9XG4gICAgfSxcbiAgICBlc2J1aWxkOiB7XG4gICAgICBkcm9wOiBlbnY/LlZJVEVfRFJPUF9DT05TT0xFID09PSAndHJ1ZScgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdXG4gICAgfSxcbiAgICBiYXNlOiAnLi8nLFxuICAgIGJ1aWxkOiB7XG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIC8vIGV4dGVybmFsOiBbJ2pzcGRmJywgJ2F4aW9zJywgJ2h0bWwyY2FudmFzJ10sXG4gICAgICAgIC8vIGV4dGVybmFsOiBbJ2F4aW9zJ10sXG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAvKiBnbG9iYWxzLCAgKi8gdml0ZUNvbXByZXNzaW9uUGx1Z2luLFxuICAgICAgICAgIHZpdGVJbWFnZW1pblBsdWdpbixcbiAgICAgICAgICB2aXN1YWxpemVyKHsgb3BlbjogdHJ1ZSB9KVxuICAgICAgICBdLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdbZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9ZLE9BQU8sU0FBUztBQUNwWixTQUFTLGVBQWU7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsa0JBQWtCO0FBRTNCLE9BQU8sa0JBQWtCO0FBVnpCLElBQU0sbUNBQW1DO0FBa0J6QyxJQUFNLHdCQUF3QixnQkFBZ0I7QUFBQSxFQUM1QyxTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQ2IsQ0FBQztBQUVELElBQU0scUJBQXFCLGFBQWE7QUFBQSxFQUN0QyxVQUFVO0FBQUEsSUFDUixtQkFBbUI7QUFBQSxJQUNuQixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxVQUFVO0FBQUEsSUFDUixTQUFTLENBQUMsS0FBSyxHQUFHO0FBQUEsSUFDbEIsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRUQsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQzNCLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsU0FBTyxhQUFhO0FBQUEsSUFDbEIsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDbkMsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDbkMsQ0FBQztBQUFBLE1BQ0QsT0FBTyxFQUFFLGFBQWEsT0FBTyxPQUFPLE1BQU0sQ0FBQztBQUFBLElBQzdDO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixpQ0FBaUMsS0FBSyxVQUFVLHdCQUF3QjtBQUFBLElBQzFFO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLFFBQzdCLFdBQVcsUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFNLDJCQUFLLHVCQUFzQixTQUFTLENBQUMsV0FBVyxVQUFVLElBQUksQ0FBQztBQUFBLElBQ3ZFO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsUUFHYixTQUFTO0FBQUEsVUFDUztBQUFBLFVBQ2hCO0FBQUEsVUFDQSxXQUFXLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFBQSxRQUMzQjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsYUFBYSxJQUFJO0FBQ2YsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixxQkFBTyxHQUFHLFNBQVMsRUFBRSxNQUFNLGVBQWUsRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsU0FBUztBQUFBLFlBQ3hFO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
