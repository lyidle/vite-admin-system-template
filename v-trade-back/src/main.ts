import { createApp } from "vue"
import App from "@/App.vue"
// 引入路由
import router from "@/router/index"
// 引入全局路由守卫
import "@/router/permission"
import plugin from "../config/vite.config/mainPlugin"
const app = createApp(App)
// 注册路由
app.use(router)
// 注册插件
plugin(app)
app.mount("#app")
