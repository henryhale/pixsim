import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/pixsim/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        font: resolve(__dirname, 'font/index.html'),
        img: resolve(__dirname, 'img/index.html'),
      },
    },
  },
})

