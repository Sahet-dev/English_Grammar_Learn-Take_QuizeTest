import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {CkeditorPlugin} from "@ckeditor/ckeditor5-vue";

const pinia = createPinia()
const app = createApp(App)


app.use(router).use(CkeditorPlugin).use(pinia)

app.mount('#app')
