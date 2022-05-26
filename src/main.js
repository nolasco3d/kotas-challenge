import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './services/http'
import './index.css'

const app = createApp(App)
app.config.globalProperties.$axios = {...http}
app.use(router).use(store).mount('#app')
