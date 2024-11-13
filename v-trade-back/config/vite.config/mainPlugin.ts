// element-plus切换暗夜模式
import "element-plus/theme-chalk/dark/css-vars.css"
// 引入全局样式
import "@/styles/index.scss"
// 引入仓库
import pinia from "@/store"
// 引入自定义指令 按钮权限
import isHasBUtton from "@/directive/hasButton"
// UnoCss
import "virtual:uno.css"
export default function plugin(app: any) {
  // 安装仓库
  app.use(pinia)
  // 自定义指令
  isHasBUtton(app)
}
