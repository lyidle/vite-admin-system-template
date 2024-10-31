import request from "@/utils/request"
import { PREFIX } from "@/api/prefixAPI"
import type { MenuResponseData, MenuParams } from "@/api/acl/menu/type"
import type { authResponseData } from "@/api/publicType"
//枚举地址
enum API {
  //获取全部菜单与按钮的标识数据
  ALL_PERMISSION_URL = "/admin/acl/permission",
  //给某一级菜单新增一个子菜单
  ADD_MENU_URL = "/admin/acl/permission/save",
  //更新某一个已有的菜单
  UPDATE_MENU_URL = "/admin/acl/permission/update",
  //删除已有的菜单
  DELETE_MENU_URL = "/admin/acl/permission/remove/",
}
//获取菜单数据
export const reqAllPermission = () =>
  request.get<any, MenuResponseData>(PREFIX.AUTH + API.ALL_PERMISSION_URL)
//添加与更新菜单的方法T
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    // 新增
    return request.put<any, authResponseData>(
      PREFIX.AUTH + API.UPDATE_MENU_URL,
      data
    )
  } else {
    // 更新
    return request.post<any, authResponseData>(
      PREFIX.AUTH + API.ADD_MENU_URL,
      data
    )
  }
}
//删除某一个已有的菜单
export const reqRemoveMenu = (id: number | string) =>
  request.delete<any, authResponseData>(PREFIX.AUTH + API.DELETE_MENU_URL + id)
