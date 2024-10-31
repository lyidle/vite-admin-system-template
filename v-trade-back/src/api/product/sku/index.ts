import request from "@/utils/request"
import { PREFIX } from "@/api/prefixAPI"
// 类型
import type{ SkuResponseData, SkuInfoData } from "@/api/product/sku/type"
import type{ managerResponseData } from "@/api/publicType"
// 统一管理接口
enum API {
  //获取已有的商品的数据-SKU
  SKU_URL = "/admin/product/list/",
  //上架
  ON_SALE_URL = "/admin/product/onSale/",
  //下架的接口
  CANCEL_SALE_URL = "/admin/product/cancelSale/",
  //获取商品详情的接口
  SKU_INFO_URL = "/admin/product/getSkuById/",
  //删除已有的商品
  DELETE_SKU_URL = "/admin/product/deleteSku/",
}
//获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(
    PREFIX.MANAGER + API.SKU_URL + `${page}/${limit}`
  )

//已有商品上架的请求
export const reqSaleSku = (skuId: number) =>
  request.get<any, managerResponseData>(
    PREFIX.MANAGER + API.ON_SALE_URL + skuId
  )

//已有商品下架的请求
export const reqCancelsale = (skuId: number) =>
  request.get<any, managerResponseData>(
    PREFIX.MANAGER + API.CANCEL_SALE_URL + skuId
  )
//获取商品详情的接口
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(PREFIX.MANAGER + API.SKU_INFO_URL + skuId)
//删除某一个已有的商品
export const reqRemoveSku = (skuId: number) =>
  request.delete<any, managerResponseData>(
    PREFIX.MANAGER + API.DELETE_SKU_URL + skuId
  )
