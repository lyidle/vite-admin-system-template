import type { Records } from "@/api/product/trademark/type"
export interface paginationType {
  pageNo: number
  limit: number
  total: number
  records: Records
}
