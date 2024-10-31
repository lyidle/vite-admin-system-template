import type { authResponseData } from "@/api/publicType"
// 用户信息类型
export interface User {
  id?: string | number
  gmtCreate?: string
  gmtModified?: string
  deleted?: boolean
  username: string | undefined
  password?: string
  nickName: string | undefined
  salt?: null
  token?: null
  roleName?: string
}
//数组包含全部的用户信息
export type Records = User[]
//获取全部用户信息接口返回的数据ts类型
export interface UserResponseData extends authResponseData {
  data: {
    total: number
    items: Records
  }
}
// 代表一个职位的ts类型
export interface RoleData {
  id?: string
  gmtCreate?: string
  gmtModified?: string
  deleted?: boolean
  roleName: string
  remark: null
}
// 全部职位的列表
export interface RolesList {
  assignRoles: RoleData[]
  allRolesList: RoleData[]
}
//获取全部职位的接口返回的数据ts类型
export interface AllRoleResponseData extends authResponseData {
  data: RolesList
}

//给用户分配职位接口携带参数的ts类型
export interface SetRoleData {
  roleIdList: string[]
  userId: string
}
