<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="SpuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select style="width: 200px" v-model="SpuParams.tmId as string">
        <el-option
          :value="item.id"
          :label="item.tmName"
          v-for="item in AllTradeMarkList"
          :key="item.id"
        ></el-option>
        <el-option value="" label="小米"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="SpuParams.description"
      ></el-input>
    </el-form-item>
    <!-- SPU图标与图示 -->
    <el-form-item label="SPU图标">
      <!-- 
      file-list:展示已有的图片
      -->
      <el-upload
        v-model:file-list="imgList"
        :action="API.fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
      >
        <el-icon><ep-Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible" style="overflow: hidden">
        <img
          w-full
          :src="encodeImgURl(dialogImageUrl)"
          alt="Preview Image"
          style="width: 100%"
        />
      </el-dialog>
    </el-form-item>
    <!-- SPU销售属性与数据展示 -->
    <el-form-item label="SPU销售属性">
      <el-select
        style="width: 200px"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        "
        v-model="saleAttrIdAndValueName"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        style="margin-left: 15px"
        :disabled="saleAttrIdAndValueName ? false : true"
        @click="addSaleAttr"
      >
        <el-icon><ep-plus /></el-icon>
        <span>添加属性值</span>
      </el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="width: 100%; margin-top: 15px" :data="saleAttr">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="saleAttrName" label="销售属性名字">
        </el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row }">
            <el-tag
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="tag.id"
              closable
              style="margin: 5px"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              placeholder="请输入属性值"
              size="small"
              v-if="row.flag"
              v-model="row.saleAttrValue"
              ref="EditComponent"
              @blur="toLook(row)"
            >
            </el-input>
            <el-button
              type="primary"
              size="small"
              style="margin: 5px"
              v-else
              @click="toEdit(row)"
            >
              <el-icon><ep-plus /></el-icon>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作">
          <template #="{ $index }">
            <el-button
              type="danger"
              size="small"
              style="margin: 5px"
              @click="saleAttr.splice($index, 1)"
            >
              <el-icon><ep-Delete /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="saleAttr.length ? false : true"
        type="primary"
        @click="save"
        >保存</el-button
      >
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="spuForm">
// 导入接口
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllsaleAttr,
  reqAddOrUpdateSpu,
} from "@/api/product/spu"
import { API } from "@/api/publicApi"
// 导入类型
import type {
  SpuData,
  AllTradeMark,
  Trademark,
  SpuHasImg,
  SpuImg,
  SaleAttrResponseData,
  SaleAttr,
  SaleAttrValue,
  HasSaleAttrResponseData,
  HasSaleAttr,
} from "@/api/product/spu/type"
// 引入hooks
import useElUpload from "@/hooks/useElUpload"
// 引入utils
import { encodeImgURl, decodeImgUrl } from "@/utils/handlerImgUrl"
const $emit = defineEmits(["changeScene"])
// 取消按钮
function cancel() {
  $emit("changeScene", { change: 0, flag: "stay", rejectReq: true })
  reset()
}
// 全部品牌的数据
const AllTradeMarkList = ref<Trademark[]>([])
// SPU对应商品图片
const imgList = ref<SpuImg[]>([])
//已有的SPU销售属性
const saleAttr = ref<SaleAttr[]>([])
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
// 存储已有的SPU对象
const SpuParams = ref<SpuData>({
  category3Id: "", //三级Id
  spuName: "", //Spu名字
  description: "", //Spu描述
  tmId: "", //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})
// 控制对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
//存储预览图片地址
const dialogImageUrl = ref<string>("")
//将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref<string>("")
// 父组件修改按钮初始化数据
async function initHasSpuData(spu: SpuData) {
  // 存储已有的SPU对象
  SpuParams.value = spu
  // 获取全部品牌的数据
  const result: AllTradeMark = await reqAllTradeMark()
  //获取某一个品牌旗下全部售卖商品的图片
  const result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  //获取已有的SPU销售属性的数据
  const result2: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spu.id as number
  )
  //获取整个项目全部SPU的销售属性
  const result3: HasSaleAttrResponseData = await reqAllsaleAttr()
  //存储全部品牌的数据
  AllTradeMarkList.value = result.data
  // 存储SPU对应商品图片
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: encodeImgURl(item.imgUrl as string),
    }
  })
  //存储已有的SPU的销售属性
  saleAttr.value = result2.data
  // 存储全部销售属性
  allSaleAttr.value = result3.data
}
// 照片墙点击预览按钮的时候触发的钩子
function handlePictureCardPreview(file: any) {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
//照片墙删除文件钩子
function handleRemove() {}
// 照片墙上传成功之前的钩子约束文件的大小与类型
const { beforeUpload } = useElUpload()

//计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  // 过滤没有的属性
  return allSaleAttr.value.filter((item) => {
    // 没找到的话返回
    return saleAttr.value.every((item1) => item1.saleAttrName !== item.name)
  })
})
// 添加SPU销售属性
function addSaleAttr() {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(":")
  const newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  // 追加到数组中进行展示
  saleAttr.value.push(newSaleAttr)
  // 清空收集到的数据
  saleAttrIdAndValueName.value = ""
}
const EditComponent = ref()
// 属性值按钮的点击事件
function toEdit(row: SaleAttr) {
  row.flag = true
  row.saleAttrValue = ""
  nextTick(() => {
    EditComponent.value.focus()
  })
}
// 属性值按钮的失去焦点事件
function toLook(row: SaleAttr) {
  // /整理收集的属性的ID与属性值的名字
  const { baseSaleAttrId, saleAttrValue } = row
  //整理成服务器需要的属性值形式
  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  // 非法判断 属性值不能为空
  if (newSaleAttrValue.saleAttrValueName.trim() === "") {
    ElMessage.error("属性值不能为空~")
    return
  }
  //判断属性值是否在数组当中存在
  const repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (repeat) {
    ElMessage.error("属性值不能重复~")
    return
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  // 切换为查看模式
  row.flag = false
}
// 保存按钮的回调
async function save() {
  //整理参数
  //1：照片墙的数据
  SpuParams.value.spuImageList = imgList.value.map((item: SpuImg) => {
    return {
      imgName: item.name,
      imgUrl: decodeImgUrl((item.response && item.response.data) || item.url),
    }
  })
  //2：整理销售属性的数据
  SpuParams.value.spuSaleAttrList = saleAttr.value
  //发请求：添加SPU|更新已有的SPU
  const result = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code === 200) {
    //成功
    ElMessage.success(SpuParams.value.id ? "更新成功~" : "添加成功")
    $emit("changeScene", {
      change: 0,
      flag: SpuParams.value.id ? "stay" : "reset",
    })
    reset()
  }
  //失败
  else ElMessage.error(SpuParams.value.id ? "更新失败~" : "添加失败")
}
// 父组件添加按钮
async function initAddSpu(c3Id: number | string) {
  reset()
  //存储三级分类的ID
  SpuParams.value.category3Id = c3Id
  // 获取全部品牌的数据
  const result: AllTradeMark = await reqAllTradeMark()
  //获取整个项目全部SPU的销售属性
  const result1: HasSaleAttrResponseData = await reqAllsaleAttr()
  // 存储数据
  AllTradeMarkList.value = result.data
  allSaleAttr.value = result1.data
}
// 清除数据
function reset() {
  // 清除数据
  SpuParams.value = {
    category3Id: "", //三级Id
    spuName: "", //Spu名字
    description: "", //Spu描述
    tmId: "", //品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
    id: "",
  }
  // 清除照片墙
  imgList.value = []
  // 清除销售属性
  saleAttr.value = []
  // 清除还未选择的销售属性的ID与属性值的名字
  saleAttrIdAndValueName.value = ""
}
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped></style>
