import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['src/assets'],                     
        additionalData: `@use "variables" as *;`      
      }
    }
  }
})