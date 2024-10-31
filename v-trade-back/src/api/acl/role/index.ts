import request from "@/utils/request"
import { PREFIX } from "@/api/prefixAPI"
import type {
  RoleResponseData,
  RoleItemData,
  SetPermissionData,
} from "@/api/acl/role/type"
import type { MenuResponseData } from "@/api/acl/menu/type"
import type { authResponseData } from "@/api/publicType"
enum API {
  //获取全部的职位接口
  ALL_ROLE_URL = "/admin/acl/role/",
  //新增岗位的接口地址
  ADD_ROLE_URL = "/admin/acl/role/save",
  //更新已有的职位
  UPDATE_ROLE_URL = "/admin/acl/role/update",
  //获取全部的菜单与按钮的数据
  ALL_PERMISSION = "/admin/acl/permission/toAssign/",
  //给相应的职位分配权限
  SET_PERMISSION_URL = "/admin/acl/permission/doAssignAcl",
  //删除已有的职位
  REMoVE_ROLE_URL = "/admin/acl/role/remove/",
}

//获取全部的角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    PREFIX.AUTH + API.ALL_ROLE_URL + `${page}/${limit}/?roleName=${roleName}`
  )
//添加职位与更新已有职位接口
export const reqAddOrUpdateRole = (data: RoleItemData) => {
  if (data.id) {
    // 修改
    return request.put<any, authResponseData>(
      PREFIX.AUTH + API.UPDATE_ROLE_URL,
      data
    )
  } else {
    // 新增
    return request.post<any, authResponseData>(
      PREFIX.AUTH + API.ADD_ROLE_URL,
      data
    )
  }
}
//获取全部菜单与按钮权限数据
export const reqAllMenuList = (roleId: number | string) =>
  request.get<any, MenuResponseData>(PREFIX.AUTH + API.ALL_PERMISSION + roleId)
// 给相应的职位下发权限
export const reqSetPermission = (data: SetPermissionData) =>
  request.post<any, MenuResponseData>(
    PREFIX.AUTH + API.SET_PERMISSION_URL,
    data
  )

//删除已有的职位
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, authResponseData>(
    PREFIX.AUTH + API.REMoVE_ROLE_URL + roleId
  )
