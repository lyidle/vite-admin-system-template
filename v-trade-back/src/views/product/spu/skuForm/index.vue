<template>
  <el-form label-width="80px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="价格(元)"
        type="number"
        v-model="skuParams.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        placeholder="重量(克)"
        type="number"
        v-model="skuParams.weight"
      ></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        type="textarea"
        placeholder="SKU描述"
        v-model="skuParams.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true" label-width="80px" class="stageAttr">
        <el-form-item
          style="margin: 0 10px 10px 0"
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select
            placeholder="请选择"
            style="width: 90px"
            v-model="item.attrIdAndValueId"
          >
            <el-option
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
              :label="attrValue.valueName"
              :value="`${item.id}:${attrValue.id}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          v-for="item in saleArr"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select
            placeholder="请选择"
            style="width: 90px"
            v-model="item.saleIdAndValueId"
          >
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${item.id}:${saleAttrValue.id}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table style="width: 100%" border :data="imgArr" ref="table">
        <el-table-column type="selection" width="width" align="center">
        </el-table-column>
        <el-table-column prop="prop" label="图片" width="width">
          <template #="{ row }">
            <img :src="encodeImgURl(row.imgUrl)" alt="" style="width: 100px" />
          </template>
        </el-table-column>
        <el-table-column
          prop="imgName"
          label="名称"
          width="width"
        ></el-table-column>
        <el-table-column label="操作" width="width">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="setDefaultImg(row)"
              :plain="row.isDefault"
              >{{ row.isDefault ? "默认" : "设置默认" }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="skuForm">
// 引入请求接口
import { reqAttr } from "@/api/product/attr"
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from "@/api/product/spu"
// 引入类型
import type {
  SpuData,
  SaleAttrResponseData,
  SpuHasImg,
  SaleAttr,
  SpuImg,
} from "@/api/product/spu/type"
import type { SkuData } from "@/api/product/sku/type"
import type { AttrResponseData, AttrList } from "@/api/product/attr/type"
// 引入utils
import { encodeImgURl } from "@/utils/handlerImgUrl"
//平台属性
const attrArr = ref<AttrList>([])
//销售属性
const saleArr = ref<SaleAttr[]>([])
//照片的数据
const imgArr = ref<SpuImg[]>([])
//获取table组件实例
const table = ref<any>()
//收集SKU的参数
let skuParams = reactive<SkuData>({
  // 父组件传递过来的spu数据
  category3Id: "",
  spuId: "",
  tmId: "",
  // v-model收集
  skuName: "",
  price: "",
  weight: "",
  skuDesc: "",

  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: "",
})
// 父组件添加Sku按钮
async function initSkuData(
  c1Id: number | string,
  c2Id: number | string,
  spu: SpuData
) {
  //收集数据
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id as number
  skuParams.tmId = spu.tmId as number
  // 获取平台属性
  const result: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id)
  //获取对应的销售属性
  const result1: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spu.id as number
  )
  //获取照片墙的数据
  let result2: SpuHasImg = await reqSpuImageList(spu.id as number)
  //存储平台属性
  attrArr.value = result.data
  //存储销售属性
  saleArr.value = result1.data
  //存储照片的数据
  imgArr.value = result2.data
}
// 设置默认图片的方法回调
function setDefaultImg(row: SpuImg) {
  // 运用排他实现单选
  imgArr.value.forEach((item) => (item.isDefault = false))
  row.isDefault = true
  // 清除其他选中的
  table.value.clearSelection(row, true)
  // 选中点击的row
  table.value.toggleRowSelection(row, true)
  //收集图片地址
  skuParams.skuDefaultImg = row.imgUrl
}
// 自定义事件
const $emit = defineEmits(["changeScene"])
// 取消按钮
function cancel() {
  $emit("changeScene", { change: 0, flag: "stay", rejectReq: true })
}
// 保存按钮
async function save() {
  //整理参数
  //平台属性
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      const [attrId, valueId] = next.attrIdAndValueId.split(":")
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])
  //销售属性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(":")
        prev.push({ saleAttrId, saleAttrValueId })
      }
      return prev
    },
    []
  )
  //发请求
  const result = await reqAddSku(skuParams)
  //成功
  if (result.code === 200) {
    ElMessage.success("添加SKU成功~")
    $emit("changeScene", { change: 0, flag: "stay", rejectReq: true })
  }
  //失败
  else ElMessage.error("添加SKU失败~")
}
// 对外暴露的数据
defineExpose({ initSkuData })
</script>

<style scoped lang="scss">
.stageAttr {
  // 限制添加SKU的平台属性
  max-width: 550px;
  // 超出省略号
  &::v-deep(.el-form-item__label) {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-right: 10px;
  }
}
</style>
