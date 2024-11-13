<template>
  <div class="container">
    <Category :scene @emitCategory="renderSpu" />
    <el-card>
      <div class="card-content" v-show="scene === 0">
        <el-button
          type="primary"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
          v-if="UserStore.$state.userInfo.buttons?.includes('btn.Spu.add')"
        >
          <el-icon><i class="i-ep-plus" /></el-icon>
          <span>添加SPU</span>
        </el-button>
        <el-button v-else type="primary" v-hasButton="'btn.Spu.add:添加SPU'">
          <el-icon><i class="i-ep-plus" /></el-icon>
          <span>添加SPU</span>
        </el-button>
        <el-table border style="width: 100%" :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="index" label="操作" width="width">
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                title="添加SKU"
                @click="addSku(row)"
                v-hasButton="'btn.Spu.addsku:添加SKU'"
                style="margin: 5px"
              >
                <el-icon><i class="i-ep-plus" /></el-icon>
              </el-button>
              <el-button
                type="success"
                size="small"
                title="修改SKU"
                @click="updateSpu(row)"
                v-hasButton="'btn.Spu.update:修改SKU'"
                style="margin: 5px"
              >
                <el-icon><i class="i-ep-edit" /></el-icon>
              </el-button>
              <el-button
                type="info"
                size="small"
                title="查看SKU"
                @click="findSku(row)"
                v-hasButton="'btn.Spu.skus:查看SKU'"
                style="margin: 5px"
              >
                <el-icon><i class="i-ep-view" /></el-icon>
              </el-button>
              <el-popconfirm
                :title="`你确定要删除${row.spuName}么?`"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    title="删除SKU"
                    v-hasButton="'btn.Spu.delete:删除SKU'"
                    style="margin: 5px"
                  >
                    <el-icon><i class="i-ep-delete" /></el-icon>
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 10]"
          size="small"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="renderSpu"
          @size-change="handleSizeChange"
        />
      </div>
      <!-- 添加SPU|修改SPU子组件 -->
      <spuForm ref="Spu" v-show="scene === 1" @changeScene="changeScene" />
      <!-- 添加SKU的子组件 -->
      <skuForm ref="Sku" v-show="scene === 2" @changeScene="changeScene" />
      <!-- dialog对话框：展示已有的sku数据 -->
      <el-dialog title="SKU列表" v-model="show" style="width: 80%">
        <el-table :data="skuArr" style="width: 100%">
          <el-table-column prop="skuName" label="SKU名字" width="width">
          </el-table-column>
          <el-table-column prop="price" label="SKU价格" width="width">
          </el-table-column>
          <el-table-column prop="weight" label="SKU重量" width="width">
          </el-table-column>
          <el-table-column label="SKU图片" width="width">
            <template #="{ row }">
              <img
                :src="encodeImgURl(row.skuDefaultImg)"
                alt=""
                style="width: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Spu">
// 引入子组件
import spuForm from "@/views/product/spu/spuForm/index.vue"
import skuForm from "@/views/product/spu/skuForm/index.vue"
// 仓库
import useCategoryStore from "@/store/Category"
import useUserStore from "@/store/User"
const UserStore = useUserStore()
// 接口
import { reqHasSpu, reqSkuList, reqRemoveSpu } from "@/api/product/spu"
// 类型
import type {
  HasSpuResponseData,
  Records,
  SpuData,
  SkuInfoData,
} from "@/api/product/spu/type"
import type { SkuData } from "@/api/product/sku/type"
import type { managerResponseData } from "@/api/publicType"
// 引入utils
import { encodeImgURl } from "@/utils/handlerImgUrl"
// 场景
const scene = ref<number>(0) //0：显示已有SPU 1:添加或者修改已有SPU 2:添加SKU的结构
// 仓库
const categoryStore = useCategoryStore()
//分页器默认页码
const pageNo = ref<number>(1)
// 每一页展示几条数据
const pageSize = ref<number>(3)
// 存储已有的SPU的数据
const records = ref<Records>([])
// 总条数
const total = ref<number>(0)
// 获取子组件实例SpuForm
const Spu = ref<any>()
// 获取子组件实例SkuForm
const Sku = ref<any>()
//存储全部的SKU数据
const skuArr = ref<SkuData[]>([])
const show = ref<boolean>(false)
// 获取数据
async function renderSpu(pager: number = 1, rejectReq?: boolean) {
  pageNo.value = pager
  // 不发起网络请求
  if (rejectReq) return
  if (categoryStore.c3Id) {
    const result: HasSpuResponseData = await reqHasSpu(
      pageNo.value,
      pageSize.value,
      categoryStore.c3Id
    )
    if (result.code === 200) {
      records.value = result.data.records
      total.value = result.data.total
    }
  }
}
// 分页器下拉框
function handleSizeChange() {
  renderSpu()
}
// 子组件切换场景
function changeScene(params: {
  change: number
  flag: "stay" | "reset"
  rejectReq: boolean
}) {
  const { change, flag, rejectReq } = params
  scene.value = change
  if (flag === "stay") renderSpu(pageNo.value, rejectReq)
  else renderSpu(1, rejectReq)
}
// 添加新的SPU按钮
function addSpu() {
  scene.value = 1
  Spu.value.initAddSpu(categoryStore.c3Id)
}
// 修改已有的SPU的按钮的回调
function updateSpu(row: SpuData) {
  scene.value = 1
  // 调用子组件的方法初始化数据
  Spu.value.initHasSpuData(row)
}
// 添加SKU按钮的回调
function addSku(row: SpuData) {
  scene.value = 2
  Sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
// 查看SKU列表的数据
async function findSku(row: SpuData) {
  const result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code === 200) {
    skuArr.value = result.data
    show.value = true
  }
}
// 删除已有的SPU按钮的回调
async function deleteSpu(row: SpuData) {
  const result: managerResponseData = await reqRemoveSpu(row.id as number)
  if (result.code === 200) {
    ElMessage.success("删除成功~")
    await renderSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else ElMessage.error("删除失败~")
}
</script>

<style scoped>
.container {
  > *:not(:first-child) {
    margin-top: 10px;
  }
  .card-content {
    > *:not(:first-child) {
      margin-top: 10px;
    }
  }
}
</style>
