import type { managerResponseData } from "@/api/publicType"
// 分类ts类型
export interface Category {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
//相应的分类接口返回数据的类型
export interface CategoryResponseData extends managerResponseData {
  data: Category[]
}

//属性值对象的ts类型
export interface AttrValue {
  attrId?: number
  id?: number
  valueName: string
  isEdit?: boolean
}
//存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]

//属性对象
export interface Attr {
  attrName: string
  attrValueList: AttrValueList
  categoryId: number | string
  categoryLevel: number
  id?: number
  attrIdAndValueId?: number | string
}
// 存储每一个属性对象的数组ts类型
export type AttrList = Attr[]
// 属性接口返回的数据ts类型
export interface AttrResponseData extends managerResponseData {
  data: AttrList
}
