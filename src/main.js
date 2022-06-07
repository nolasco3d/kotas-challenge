import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './services/http'

import './styles/main.scss'

export function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const app = createApp(App)
app.config.globalProperties.$axios = {...http}
app.use(router).use(store).mount('#app')

