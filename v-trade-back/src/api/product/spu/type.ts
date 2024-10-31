import type { managerResponseData } from "@/api/publicType"
import type { SkuData } from "@/api/product/sku/type"
//SPU数据的ts类型
export interface SpuData {
  category3Id: number | string
  id?: number | string
  spuName: string
  tmId: number | string | null
  description: string
  spuImageList: null | SpuImg[]
  spuSaleAttrList: null | SaleAttr[]
}

//数组：元素都是已有SPU数据类型
export type Records = SpuData[]

// 定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends managerResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

//品牌数据的TS类型
export interface Trademark {
  id: number
  logoUrl: string
  tmName: string
}
//品牌接白返回的数据ts类型
export interface AllTradeMark extends managerResponseData {
  data: Trademark[]
}

//商品图片的ts类型
export interface SpuImg {
  id?: number
  imgName?: string
  name?: string
  imgUrl?: string
  url?: string
  spuId?: number
  // el-plus照片墙
  response?: any
  isDefault?: boolean
}
//已有的SPU的照片墙数据的类型
export interface SpuHasImg extends managerResponseData {
  data: SpuImg[]
}
//已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}

//存储已有的销售属性值数组类型
export type spuSaleAttrValueList = SaleAttrValue[]
//销售属性对象ts类型
export interface SaleAttr {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
  saleIdAndValueId?: string | number
}
//SPU有的销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends managerResponseData {
  data: SaleAttr[]
}
//已有的全部SPU的返回数据ts类型
export interface HasSaleAttr {
  id: number
  name: string
}
// 全部的销售属性的返回类型
export interface HasSaleAttrResponseData extends managerResponseData {
  data: HasSaleAttr[]
}

//获取SKU数据接口的ts类型
export interface SkuInfoData extends managerResponseData {
  data: SkuData[]
}
