import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/pixsim/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        font: resolve(__dirname, 'font.html'),
        img: resolve(__dirname, 'img.html'),
        lang: resolve(__dirname, 'lang.html'),
      },
    },
  },
})

