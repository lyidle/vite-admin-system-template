// 定义auth接口返回数据都拥有的ts类型
export interface authResponseData {
  success: boolean
  code: number
  message: string
}
// 定义manager接口返回数据都拥有的ts类型
export interface managerResponseData {
  code: number
  message: string
  ok: boolean
  data: any
}
