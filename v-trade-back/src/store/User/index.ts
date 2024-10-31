// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user"
// 引入数据类型
import type {
  loginForm,
  loginResponseData,
  userInfoResponseData,
  userLogoutResponseData,
} from "@/api/user/type"
import type { UserState } from "@/store/User/Type"
// token方法简化
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token"
// 引入需要权限判断的路由
import { constantRoute, anyRoute, asyncRoute } from "@/router/routes"
// 引入路由
import router from "@/router"
// 引入lodash
// @ts-ignore
import cloneDeep from "lodash/cloneDeep"
// 过滤路由
const isAuthFilter = import.meta.env.VITE_FILTER_ROUTE
function filterRoutes(asyncRoute: any, routes: any, _this: any) {
  function filer(asyncRoute: any, routes: any) {
    // 过滤需要权限判断的路由
    return asyncRoute.filter((item: any) => {
      if (routes.includes(item.name)) {
        if (item.children && item.children.length > 0) {
          // 修改孩子为找到的孩子项
          item.children = filer(item.children, routes)
        }
        return true
      }
    })
  }
  if (JSON.parse(isAuthFilter)) {
    // 过滤出有权限的路由
    const accessRoutes = filer(
      // 使用深拷贝
      cloneDeep(asyncRoute),
      routes
    )
    // 添加到菜单中进行展示
    _this.$state.menuRoutes = [...constantRoute, ...accessRoutes, ...anyRoute]
    // 遍历添加过滤出的路由
    ;[...accessRoutes].forEach((item: any) => {
      router.addRoute(item)
    })
  } else {
    // 不过滤
    _this.$state.menuRoutes = [...constantRoute, ...asyncRoute, ...anyRoute]
    // 遍历添加路由
    ;[...asyncRoute].forEach((item: any) => {
      router.addRoute(item)
    })
  }
}
// 暴露仓库
export default defineStore("User", {
  state(): UserState {
    return {
      token: GET_TOKEN("TOKEN") || "", //用户唯一标识token
      menuRoutes: [], //仓库存储生成菜单需要数组（路由）
      userInfo: {},
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      const state = result.code
      if (state === 20000) {
        this.token = result.data.token || ""
        SET_TOKEN("TOKEN", this.token)
      } else return Promise.reject(new Error(result.message))
    },
    async userInfo() {
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code === 20000) {
        Object.keys(result.data).forEach((item) => {
          if (item === "name") {
            this.$state.userInfo.username = result.data[item]
          } else {
            // @ts-ignore
            this.$state.userInfo[item] = result.data[item]
          }
        })
        // 过滤出有权限的路由
        filterRoutes(
          // 使用深拷贝
          cloneDeep(asyncRoute),
          result.data.routes,
          this
        )
      } else {
        return Promise.reject("获取用户信息失败~")
      }
    },
    async userLogout() {
      // 1.服务端清除 token
      const result: userLogoutResponseData = await reqLogout()
      if (result.code === 20000) {
        // 2.清除仓库和localstorage中用户相关信息
        this.token = ""
        this.$state.userInfo.username = ""
        this.$state.userInfo.avatar = ""
        REMOVE_TOKEN("TOKEN")
      } else return Promise.reject(new Error(result.message))
    },
  },
  getters: {},
})
