// // 引入项目中全部的全局组件
// import SvgIcon from "@/components/SvgIcon/index.vue"
// import Category from "@/components/Category/index.vue"
// import MySearch from "@/components/MySearch/index.vue"
// // 注册element-plus 图标
// import * as ElementPlusIconsVue from "@element-plus/icons-vue"
// import ScreenTitle from "@/components/eCharts/title/index.vue"
// // 需要注册的全局组件
// const allGlobalComponent = { Category, MySearch, ScreenTitle }
// export default {
//   install(app: any) {
//     // 注册全局组件
//     Object.keys(allGlobalComponent).forEach((key) => {
//       //@ts-ignore
//       app.component(key, allGlobalComponent[key])
//     })
//     // 注册element-plus 图标
//     for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//       app.component(key, component)
//     }
//   },
// }
