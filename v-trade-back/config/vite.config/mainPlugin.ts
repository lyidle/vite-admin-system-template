// svg 图标
import "virtual:svg-icons-register"
// element-plus
// import ElementPlus from "element-plus"
// element-plus样式
// import "element-plus/dist/index.css"
// import zhCn from "element-plus/es/locale/lang/zh-cn"
// element-plus切换暗夜模式
import "element-plus/theme-chalk/dark/css-vars.css"
// 引入自定义插件
// import globalComponents from "@/components"
// 引入全局样式
import "@/styles/index.scss"
// 引入仓库
import pinia from "@/store"
// 引入自定义指令
import isHasBUtton from "@/directive/hasButton"

export default function plugin(app: any) {
  // 安装仓库
  app.use(pinia)
  // // element-plus
  // app.use(ElementPlus, {
  //   locale: zhCn,
  // })
  // 自定义插件
  // app.use(globalComponents)
  // 自定义指令
  isHasBUtton(app)
}
