import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { codeInspectorPlugin } from 'code-inspector-plugin';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    codeInspectorPlugin({bundler: 'vite'}),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 使用 @ 指向 src 目录
    },
  },
  server: {
    proxy: {
      port: "5000",
      // 字符串简写写法
      "/foo": "http://localhost:4567",
      // 选项写法
      "/api": {
        target: "https://api.xygeng.cn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
