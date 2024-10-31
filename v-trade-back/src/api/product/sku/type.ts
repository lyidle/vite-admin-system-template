import type { managerResponseData } from "@/api/publicType"
// 销售属性
export interface AttrArr {
  id?: string | number
  attrId: string | number
  attrName?: string
  valueId: string | number
  valueName?: string
}
// 销售属性值
export interface SaleArr {
  id?: string | number
  saleAttrId: string | number
  saleAttrName?: string
  saleAttrValueId: string | number
  saleAttrValueName?: string
}
// 添加SKU的请求方法携带参数
export interface SkuData {
  // spu展示与sku详情展示
  category3Id?: number | string
  spuId?: number | string
  tmId?: number | string
  skuName?: string
  price?: string | number
  weight?: string | number
  skuDesc?: string
  skuAttrValueList?: AttrArr[]
  skuSaleAttrValueList?: SaleArr[]
  skuDefaultImg?: string

  isSale?: number //控制商品的上架与下架
  id?: number
  // 商品详情展示
  skuImageList?: [
    {
      id?: number | string
      skuId?: number | string
      imgName: string
      imgUrl: string
      spuImgId?: number | string
      isDefault?: number
    }
  ]
}

//获取SKU接口返回的数据ts类型
export interface SkuResponseData extends managerResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

//获取SKU商品详情接口的ts类型
export interface SkuInfoData extends managerResponseData {
  data: SkuData
}
