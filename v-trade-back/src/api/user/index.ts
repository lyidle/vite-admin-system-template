// 统一管理项目用户相关的接口
import request from "@/utils/request"
// 统一管理前缀
import { PREFIX } from "@/api/prefixAPI"
import type {
  loginForm,
  loginResponseData,
  userInfoResponseData,
  userLogoutResponseData,
} from "@/api/user/type"
// 统一管理接口地址
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}
// 暴露请求函数
// 登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(PREFIX.AUTH + API.LOGIN_URL, data)
// 获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(PREFIX.AUTH + API.USERINFO_URL)
// 退出登录
export const reqLogout = () =>
  request.post<any, userLogoutResponseData>(PREFIX.AUTH + API.LOGOUT_URL)
