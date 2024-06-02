import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import echarts from 'echarts'


const app = createApp(App)
app.config.globalProperties.$echarts = echarts;
app.use(ElementPlus)
app.use(router)
app.mount('#app')
