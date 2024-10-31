import request from "@/utils/request"
// 前缀
import { PREFIX } from "@/api/prefixAPI"
// 引入类型
import type {
  SpuData,
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SkuInfoData,
} from "@/api/product/spu/type"

import type { SkuData } from "@/api/product/sku/type"
import type { managerResponseData } from "@/api/publicType"
// 统一管理API
enum API {
  // 获取已有的SPU的数据
  HAS_SPU_URL = "/admin/product/",
  //获取全部品牌的数据
  ALL_TRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  //获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = "/admin/product/spuImageList/",
  //获取某一个SPU下全部的已有的销售属性接口地址
  SPU_HAS_SALE_ATTR_URL = "/admin/product/spuSaleAttrList/",
  //获取整个项目全部的销售属性[颜色、版本、尺码］
  ALL_SALE_ATTR_URL = "/admin/product/baseSaleAttrList",
  //追加一个新的SPU
  ADD_SPU_URL = "/admin/product/saveSpuInfo",
  //更新已有的SPU
  UPDATE_SPU_URL = "/admin/product/updateSpuInfo",
  //追加一个新增的SKU地址
  ADD_SKU_URL = "/admin/product/saveSkuInfo",
  //查看某一个已有的SPU下全部售卖的商品
  SKU_INFO_URL = "/admin/product/findBySpuId/",
  //删除已有的SPU
  REMOVE_SPU_URL = "/admin/product/deleteSpu/",
}

//获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, HasSpuResponseData>(
    PREFIX.MANAGER +
      API.HAS_SPU_URL +
      `${page}/${limit}?category3Id=${category3Id}`
  )

//获取全部的SPU的品牌的数据
export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(PREFIX.MANAGER + API.ALL_TRADEMARK_URL)

//获取某一个已有的SPU下全部商品的图片地址
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(PREFIX.MANAGER + API.IMAGE_URL + spuId)
//获取某一个已有的SPU拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(
    PREFIX.MANAGER + API.SPU_HAS_SALE_ATTR_URL + spuId
  )
//获取全部的销售属性
export const reqAllsaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(
    PREFIX.MANAGER + API.ALL_SALE_ATTR_URL
  )
//添加一个新的SPU的
//更新已有的SPU接口
//data：即为新增的SPU|或者已有的SPU对象
export const reqAddOrUpdateSpu = (data: SpuData) => {
  // 如果SPU对象拥有ID，更新已有的SPU
  if (data.id)
    return request.post<any, managerResponseData>(
      PREFIX.MANAGER + API.UPDATE_SPU_URL,
      data
    )
  // 更新
  else
    return request.post<any, managerResponseData>(
      PREFIX.MANAGER + API.ADD_SPU_URL,
      data
    )
}

//添加SKU的请求方法
export const reqAddSku = (data: SkuData) =>
  request.post<any, managerResponseData>(PREFIX.MANAGER + API.ADD_SKU_URL, data)
//获取SKU数据
export const reqSkuList = (spuId: number | string) =>
  request.get<any, SkuInfoData>(PREFIX.MANAGER + API.SKU_INFO_URL + spuId)
//删除已有的SPU
export const reqRemoveSpu = (spuId: number | string) =>
  request.delete<any, managerResponseData>(
    PREFIX.MANAGER + API.REMOVE_SPU_URL + spuId
  )
