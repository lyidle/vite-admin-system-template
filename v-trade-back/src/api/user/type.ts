import type { authResponseData } from "@/api/publicType"
// 登录接口需要携带的参数类型
export interface loginForm {
  username: string
  password: string
}
// 登录接口返回数据类型
export interface loginResponseData extends authResponseData {
  data: { token: string }
}
// 定义服务器返回用户信息相关的数据类型
export interface userInfoResponseData extends authResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
// 定义退出返回数据类型
export interface userLogoutResponseData extends authResponseData {
  data: {}
}
