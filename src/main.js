import './assets/style.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import { createApp } from 'vue'
import App from './App.vue'

const app=createApp(App)
app.mount('#app')
app.use(Toast)



