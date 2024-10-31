// 引入路由类型
import type { RouteRecordRaw } from "vue-router"
// 定义小仓库数据state类型
interface userInfoType {
  routes?: string[]
  buttons?: string[]
  roles?: string[]
  username?: string
  avatar?: string
}
export interface UserState {
  token: string
  menuRoutes: RouteRecordRaw[]
  userInfo: userInfoType
}
