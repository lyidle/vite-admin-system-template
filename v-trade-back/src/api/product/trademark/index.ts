import request from "@/utils/request"
import { PREFIX } from "@/api/prefixAPI"
import type {
  TradeMarkResponseData,
  TradeMark,
} from "@/api/product/trademark/type"
import type { managerResponseData } from "@/api/publicType"
// 统一管理API
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  //添加品牌
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  //修改已有品牌
  UPDATETRADEMARKURL = "/admin/product/baseTrademark/update",
  // 删除已有品牌
  DELETE_URL = "/admin/product/baseTrademark/remove/",
}
/* 
获取已有品牌的接口方法
page:获取第几页---默认第一页
limit：获取几个已有品牌的额数据
 */
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    `${PREFIX.MANAGER + API.TRADEMARK_URL + page}/${limit}`
  )

//添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    // 有id就是修改
    return request.put<any, managerResponseData>(
      PREFIX.MANAGER + API.UPDATETRADEMARKURL,
      data
    )
  }
  // 没有就是新增
  else
    return request.post<any, managerResponseData>(
      PREFIX.MANAGER + API.ADDTRADEMARK_URL,
      data
    )
}

//删除某一个已有品牌的数据
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, managerResponseData>(PREFIX.MANAGER + API.DELETE_URL + id)
