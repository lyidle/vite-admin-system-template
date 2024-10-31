// seriesType
export interface seriesType {
  data: string[] | number[]
  color: [string, string]
  name?: string
}
// props类型
export interface DataProps {
  series?: seriesType[]
  grid?: Object
  title?: Object
  data?: string[] | number[]
  legend?: Object
}
