// 引入分类接口方法
import { reqC1, reqC2, reqC3 } from "@/api/product/attr"
// 引入数据类型
import type { CategoryResponseData } from "@/api/product/attr/type"
import type { CategoryState } from "@/store/Category/type"
export default defineStore("Category", {
  state(): CategoryState {
    return {
      c1Data: [],
      c1Id: "",
      c2Data: [],
      c2Id: "",
      c3Data: [],
      c3Id: "",
    }
  },
  actions: {
    async getC1() {
      const result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Data = result.data
      }
    },
    async getC2() {
      // 清除c2,c3数据
      this.c2Data = []
      this.c2Id = ""
      this.c3Data = []
      this.c3Id = ""
      const result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code === 200) {
        this.c2Data = result.data
      }
    },
    async getC3() {
      // 清除c3数据
      this.c3Data = []
      this.c3Id = ""
      const result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code === 200) {
        this.c3Data = result.data
      }
    },
  },
  getters: {},
})
