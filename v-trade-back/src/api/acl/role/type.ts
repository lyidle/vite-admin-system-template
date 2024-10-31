import type { authResponseData } from "@/api/publicType"
// 职务数据Items类型
export interface RoleItemData {
  id?: string | number
  gmtCreate?: string
  gmtModified?: string
  deleted?: boolean
  roleName: string
  remark?: null
}
// 职务数据类型
export interface RoleData {
  total: number
  items: RoleItemData[]
}
// 全部职位数据的相应的ts类型
export interface RoleResponseData extends authResponseData {
  data: RoleData
}
// 相应的职位下发权限携带数据类型
export interface SetPermissionData {
  permissionIdList: string[]
  roleId: string
}
