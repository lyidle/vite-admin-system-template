import request from "@/utils/request"
// 引入类型
import { PREFIX } from "@/api/prefixAPI"
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from "@/api/acl/user/type"
import { authResponseData } from "@/api/publicType"
enum API {
  //获取全部已有用户账号信息
  ALL_USER_URL = "/admin/acl/user/",
  //添加一个新的用户账号
  ADD_USER_URL = "/admin/acl/user/save",
  //更新已有的用户账号
  UPDATE_USER_URL = "/admin/acl/user/update",
  //获取全部职位，当前账号拥有的职位接口
  ALL_ROLE_URL = "/admin/acl/user/toAssign/",
  //给已有的用户分配角色接口
  SET_ROLE_URL = "/admin/acl/user/doAssignRole",
  //删除某一个账号
  DELETE_USER_URL = "/admin/acl/user/remove/",
  //批量删除的接口
  DELETE_ALL_USER_URL = "/admin/acl/user/batchRemove",
}
//获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    PREFIX.AUTH + API.ALL_USER_URL + `${page}/${limit}/?username=${username}`
  )
//添加用户与更新已有用户的接口
export const reqAddOrUpdateUser = (data: User) => {
  // 携带参数有ID更新
  if (data.id) {
    return request.put<any, authResponseData>(
      PREFIX.AUTH + API.UPDATE_USER_URL,
      data
    )
  } else {
    // 反之新增
    return request.post<any, authResponseData>(
      PREFIX.AUTH + API.ADD_USER_URL,
      data
    )
  }
}

// 获取全部职位以及包含当前用户的己有的职位
export const reqAllRole = (userId: number | string) =>
  request.get<any, AllRoleResponseData>(PREFIX.AUTH + API.ALL_ROLE_URL + userId)
//分配职位
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, authResponseData>(PREFIX.AUTH + API.SET_ROLE_URL, data)
//删除某一个账号的信息
export const reqRemoveUser = (userId: number | string) =>
  request.delete<any, authResponseData>(
    PREFIX.AUTH + API.DELETE_USER_URL + userId
  )
//批量删除的接口
export const reqSelectUser = (idList: number[] | string[]) =>
  request.delete<any, authResponseData>(PREFIX.AUTH + API.DELETE_ALL_USER_URL, {
    data: idList,
  })
