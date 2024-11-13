<template>
  <div>
    <el-card>
      <el-table style="width: 100%" border :data="skuArr">
        <el-table-column
          type="index"
          label="序号"
          min-width="80px"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="skuName"
          min-width="150px"
          label="名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="skuDesc" min-width="150px" label="描述">
        </el-table-column>
        <el-table-column min-width="150px" label="默认图片">
          <template #="{ row }">
            <img
              :src="encodeImgURl(row.skuDefaultImg)"
              alt=""
              style="width: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="weight" min-width="150px" label="重量(g)">
        </el-table-column>
        <el-table-column prop="price" min-width="150px" label="价格(元)">
        </el-table-column>
        <el-table-column min-width="220px" label="操作" fixed="right">
          <template #="{ row }">
            <el-button
              :type="row.isSale == 1 ? 'info' : 'success'"
              size="small"
              @click="updateSale(row)"
              v-hasButton="'btn.Sku.updown:修改商品状态'"
            >
              <el-icon>
                <template v-if="row.isSale == 1">
                  <i class="i-ep-bottom" />
                </template>
                <template v-else>
                  <i class="i-ep-top" />
                </template>
              </el-icon>
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="openElmessage"
              v-hasButton="'btn.Sku.update:修改商品'"
            >
              <el-icon><i class="i-ep-edit" /></el-icon>
            </el-button>
            <el-button
              type="info"
              size="small"
              @click="findSku(row)"
              v-hasButton="'btn.Sku.detail:查看详情'"
            >
              <el-icon><i class="i-ep-info-filled" /></el-icon>
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.skuName}么？`"
              @confirm="removeSku(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  v-hasButton="'btn.Sku.remove:删除商品'"
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
        :page-sizes="[3, 5, 10]"
        v-model:page-size="pageSize"
        :background="true"
        size="small"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        style="margin-top: 10px"
        @current-change="getHasSku"
        @size-change="sizeChange"
      >
      </el-pagination>
      <!-- 抽屉组件展示商品详情 -->
      <el-drawer
        v-model="drawer"
        title="查看商品详情"
        style="min-width: 500px; max-width: 45%"
        size="40%"
      >
        <el-row :gutter="10" style="margin: 0; margin-top: -40px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              type="success"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin-right: 10px"
              >{{ item.valueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              type="warning"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              style="margin-right: 10px"
              >{{ item.saleAttrValueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="encodeImgURl(item.imgUrl)"
                  alt=""
                  style="height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Sku">
// 引入接口
import {
  reqSkuList,
  reqSaleSku,
  reqCancelsale,
  reqSkuInfo,
  reqRemoveSku,
} from "@/api/product/sku"
// 引入类型
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from "@/api/product/sku/type"
import type { managerResponseData } from "@/api/publicType"
// 引入utils
import { encodeImgURl } from "@/utils/handlerImgUrl"
//分页器当前页码
const pageNo = ref<number>(1)
//每一页展示几条数据
const pageSize = ref<number>(3)
// 总数
const total = ref<number>(0)
// 数据
const skuArr = ref<SkuData[]>([])
// 控制抽屉显示与隐藏的字段
const drawer = ref<boolean>(false)
const skuInfo = ref<SkuData>({})
// 渲染数据
async function getHasSku(pager: number = 1) {
  pageNo.value = pager
  const result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}
// 分页器的下拉框
function sizeChange() {
  getHasSku(pageNo.value)
}
//商品的上架与下架的操作
async function updateSale(row: SkuData) {
  //如果当前商品的isSale==1，说明当前商品是上架的额状态->更新为下架
  //否则else情况与上面情况相反
  if (row.isSale == 1) {
    //下架操作
    const result = await reqCancelsale(row.id as number)
    if (result.code === 200) {
      ElMessage.success("下架成功~")
      row.isSale = 0
    } else ElMessage.success("下架失败~")
  } else {
    //上架操作
    const result = await reqSaleSku(row.id as number)
    if (result.code === 200) {
      //提示信息
      ElMessage({ type: "success", message: "上架成功~" })
      //发请求获取当前更新完毕的全部已有的SKU
      row.isSale = 1
    } else ElMessage.success("上架失败~")
  }
}
//查看商品详情按钮的回调
async function findSku(row: SkuData) {
  //抽屉展示出来
  drawer.value = true
  const result: SkuInfoData = await reqSkuInfo(row.id as number)
  if (result.code === 200) {
    skuInfo.value = result.data
  }
}
async function removeSku(skuId: number) {
  const result: managerResponseData = await reqRemoveSku(skuId)
  if (result.code === 200) {
    ElMessage.success("删除成功~")
    //获取已有全部商品
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage.error("系统数据不能删除~")
  }
}
const openElmessage = () => ElMessage.success("程序员在努力的更新中……")
onBeforeMount(() => {
  getHasSku()
})
</script>

<style scoped>
.el-carousel__item h3 {
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
::v-deep(.el-carousel__indicator) button {
  background-color: red;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>
