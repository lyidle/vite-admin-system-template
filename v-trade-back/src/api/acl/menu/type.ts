import { authResponseData } from "@/api/publicType"
//菜单与按钮数据的ts类型
export interface MenuChildrenData {
  id: string | number
  gmtCreate: string
  gmtModified: string
  deleted: boolean
  pid: string | number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: MenuList[]
  select: boolean
}
// 菜单与按钮数据的children类型
export type MenuList = MenuChildrenData[]
//菜单与按钮数据的返回类型
export interface MenuResponseData extends authResponseData {
  data: {
    children: MenuList
  }
}

//添加与修改菜单携带的参数的ts类型
export interface MenuParams {
  id?: number //ID
  code: string | undefined //权限数值
  level: number | undefined //几级菜单
  name: string | undefined //菜单的名字I
  pid: number | string | undefined //菜单的ID
}
