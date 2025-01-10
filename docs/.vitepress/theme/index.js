import './style.css'
import DefaultTheme from 'vitepress/theme'
import AppView from './components/AppView.vue'

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('AppView', AppView)
	}
}