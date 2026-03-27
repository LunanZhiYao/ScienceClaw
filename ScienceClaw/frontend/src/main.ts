import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'
import './assets/theme.css'
import 'highlight.js/styles/github-dark.css'  // 代码高亮样式
import 'katex/dist/katex.min.css'  // KaTeX 数学公式样式
import './utils/toast'
import i18n from './composables/useI18n'
import router from './router'
import { configure } from "vue-gtag";

configure({
  tagId: 'G-XCRZ3HH31S' // Replace with your own Google Analytics tag ID
})

import MoleculeViewer from './components/MoleculeViewer.vue'

const app = createApp(App)

app.component('molecule-viewer', MoleculeViewer) // Register globally

app.use(router)
app.use(i18n)
app.mount('#app')
