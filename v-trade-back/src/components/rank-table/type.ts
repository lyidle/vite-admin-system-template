// 定义进度条数据类型
export type progressType = {
  color?: string
  num: number
}
// 定义label数据类型
export type labelType = {
  src: string
  color?: string
  size?: string
}
export interface PropsDataType {
  id: number
  name: string
  progress: progressType
  label: labelType
}
// props中的data选项类型
export type DataProps = PropsDataType[]
// 整个props的类型
export interface PropsType {
  data?: DataProps
}
