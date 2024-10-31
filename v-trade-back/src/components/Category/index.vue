<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene === 0 ? false : true"
        >
          <el-option
            v-for="c1 in categoryStore.c1Data"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          @change="handler1"
          :disabled="scene === 0 ? false : true"
        >
          <el-option
            v-for="c2 in categoryStore.c2Data"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          @change="handler2"
          :disabled="scene === 0 ? false : true"
        >
          <el-option
            v-for="c3 in categoryStore.c3Data"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts" name="Category">
// 引入分类相关仓库
import useCategoryStore from "@/store/Category"
const categoryStore = useCategoryStore()
// 通知仓库获取一级分类的方法
function getC1() {
  categoryStore.getC1()
}
// 此方法即为一级分类下拉菜单的change事件（选中值的时候会触发，保证一级分类ID有了）
function handler() {
  //通知仓库获取二级分类的数据
  categoryStore.getC2()
}
function handler1() {
  //通知仓库获取三级分类的数据
  categoryStore.getC3()
}
// 触发父组件的回调
const $emit = defineEmits(["emitCategory"])
// 接收参数
defineProps(["scene"])
function handler2() {
  // 发起请求展示数据
  $emit("emitCategory")
}
onMounted(() => {
  getC1()
})
// 路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped>
/* el-select 宽度 */
.el-form--inline {
  .el-form-item {
    .el-input,
    .el-cascader,
    .el-select,
    .el-autocomplete {
      width: 100px;
    }
  }
}
</style>
