import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	base: '/pixsim/app',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				font: resolve(__dirname, 'font.html'),
				display: resolve(__dirname, 'display.html'),
			},
		},
	},
})

