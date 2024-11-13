<template>
  <div class="container">
    <Category @emitCategory="renderCategory" :scene="scene" />
    <el-card class="attr-card">
      <div v-show="scene === 0" class="card-content">
        <el-button
          type="primary"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr"
          v-if="UserStore.$state.userInfo.buttons?.includes('btn.Attr.add')"
        >
          <el-icon><i class="i-ep-plus" /></el-icon>
          <span>添加平台属性</span>
        </el-button>
        <el-button
          v-else
          type="primary"
          v-hasButton="'btn.Attr.add:添加平台属性'"
        >
          <el-icon><i class="i-ep-plus" /></el-icon>
          <span>添加平台属性</span>
        </el-button>
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="width">
          </el-table-column>
          <el-table-column label="属性值名称" width="width">
            <template #="{ row }">
              <el-tag
                v-for="tag in row.attrValueList"
                :key="tag.attrId"
                style="margin: 5px"
                >{{ tag.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template #="{ row }">
              <el-button
                type="warning"
                size="small"
                @click="updateAttr(row)"
                v-hasButton="'btn.Attr.update:编辑平台属性'"
              >
                <el-icon><i class="i-ep-edit" /></el-icon>
              </el-button>
              <el-popconfirm
                :title="`你确定要删除${row.attrName}么?`"
                @confirm="deleteAttr(row.id, row.attrName)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    v-hasButton="'btn.Attr.remove:删除平台属性'"
                  >
                    <el-icon><i class="i-ep-delete" /></el-icon>
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1" class="card-content">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          :disabled="attrParams.attrName ? false : true"
          @click="addAttrValue"
        >
          <el-icon><i class="i-ep-plus" /></el-icon>
          <span>添加属性值</span>
        </el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table style="width: 100%" border :data="attrParams.attrValueList">
          <el-table-column
            prop="prop"
            label="序号"
            type="index"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值" width="width">
            <template #="{ row, $index }">
              <el-input
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                v-if="row.isEdit"
                @blur="toShow(row, $index)"
                size="small"
                ref="EditComponent"
              ></el-input>
              <div v-else @click="toEdit(row)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template #="{ $index }">
              <el-button
                type="danger"
                @click="attrParams.attrValueList.splice($index, 1)"
                size="small"
              >
                <el-icon><i class="i-ep-delete" /></el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          type="primary"
          @click="save"
          :disabled="
            // 需要属性名称和当前属性值有内容才能保存
            attrParams.attrValueList.length > 0 &&
            attrParams.attrValueList[
              attrParams.attrValueList.length - 1
            ].valueName.trim() !== ''
              ? false
              : true
          "
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Attr">
// 引入分类相关仓库
import useCategoryStore from "@/store/Category"
const categoryStore = useCategoryStore()
// 引入类型相关
import type {
  AttrList,
  AttrResponseData,
  Attr,
  AttrValue,
} from "@/api/product/attr/type"
import type { managerResponseData } from "@/api/publicType"
// 引入请求接口
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from "@/api/product/attr"
// 引入仓库
import useUserStore from "@/store/User"
const UserStore = useUserStore()
// 储存属性与属性值
const attrList = ref<AttrList>([])
// 场景
const scene = ref(0)
// 收集新增属性的数据
const attrParams = reactive<Attr>({
  attrName: "", //新增的属性的名字
  attrValueList: [],
  categoryId: "", //三级分类的ID
  categoryLevel: 3, //代表的是三级分类
})
const EditComponent = ref()
// 渲染三级列表 表格数据
async function renderCategory() {
  if (categoryStore.c1Id) {
    // 初始化数据
    attrList.value = []
    const result: AttrResponseData = await reqAttr(
      categoryStore.c1Id,
      categoryStore.c2Id,
      categoryStore.c3Id
    )
    if (result.code === 200) attrList.value = result.data
  }
}
// 添加属性值按钮的回调
function addAttrValue() {
  // 点击添加属性值按钮的时候，向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: "",
    isEdit: true,
  })
  nextTick(() => {
    EditComponent.value.focus()
  })
}
// 添加属性
function addAttr() {
  // 每一次点击的时候，先清空一下数据再收集数据
  Object.assign(attrParams, {
    attrName: "", //新增的属性的名字
    attrValueList: [],
    categoryId: categoryStore.c3Id, //三级分类的ID
    categoryLevel: 3, //代表的是三级分类
    id: undefined, //需要置空id防止添加属性时出现修改的情况
  })
  scene.value = 1
  //点击这个按钮的时候手机新增属性的三级分类的ID
  attrParams.categoryId = categoryStore.c3Id
}
// 修改属性
function updateAttr(row: Attr) {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
// 取消按钮
function cancel() {
  scene.value = 0
}
// 删除某一个已有的属性方法回调
async function deleteAttr(attrId: number, attrName: string) {
  const result: managerResponseData = await reqRemoveAttr(attrId)
  if (result?.code === 200) {
    ElMessage.success(`删除${attrName}属性成功~`)
    renderCategory()
  } else {
    ElMessage.error(`删除${attrName}属性失败~`)
  }
}
// 保存按钮
async function save() {
  //发请求
  const result: managerResponseData = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    // 切换场景
    scene.value = 0
    // 提示
    ElMessage.success(attrParams.id ? "修改成功~" : "添加成功~")
    // 重新获取数据
    renderCategory()
  } else {
    ElMessage.error(attrParams.id ? "修改失败~" : "添加失败~")
  }
}
// 属性值表单元素失却焦点的方法
function toShow(row: AttrValue, $index: number) {
  if (row.valueName.trim() === "") {
    // 删除对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    // 提示信息
    ElMessage.error("属性值不能为空~")
    return
  }
  // 查看是否重复
  const result = attrParams.attrValueList.find((item) => {
    if (item !== row) return item.valueName === row.valueName
  })
  // 判断是否重复
  if (result) {
    // 删除对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    // 提示信息
    ElMessage.error("属性值不能重复~")
    return
  }
  row.isEdit = false
}
// div切换为input
function toEdit(row: AttrValue) {
  row.isEdit = true
  nextTick(() => {
    EditComponent.value.focus()
  })
}
</script>

<style scoped>
.container {
  & > *:not(:first-child) {
    margin-top: 10px;
  }
  .card-content {
    > *:not(:first-child) {
      margin-top: 10px;
    }
  }
}
</style>
