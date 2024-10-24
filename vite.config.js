import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/pixsim/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        font: resolve(__dirname, 'packages/font/index.html'),
        img: resolve(__dirname, 'packages/img/index.html'),
      },
    },
  },
})

