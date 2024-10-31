import type { Category } from "@/api/product/attr/type"
export interface CategoryState {
  c1Id: string | number
  c1Data: Category[]
  c2Id: string | number
  c2Data: Category[]
  c3Id: string | number
  c3Data: Category[]
}
