<template>
  <div>
    <el-card>
      <div class="container">
        <!-- 按钮 -->
        <el-button
          type="primary"
          @click="addTrademark"
          v-hasButton="'btn.Trademark.add:添加品牌'"
        >
          <el-icon><ep-plus /></el-icon>
          <span style="margin-left: 5px">添加品牌</span>
        </el-button>
        <!-- 表格 -->
        <el-table style="width: 100%" border :data="pagination.records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="tmName" label="品牌名称" width="width">
          </el-table-column>
          <el-table-column label="品牌LOGO" width="width">
            <template #="{ row }">
              <img :src="row.logoUrl" alt="" style="width: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="品牌仓库" width="width">
            <template #="{ row }">
              <el-button
                type="warning"
                size="small"
                @click="updateTrademark(row)"
                v-hasButton="'btn.Trademark.update:修改品牌'"
              >
                <el-icon><ep-Edit /></el-icon>
              </el-button>
              <el-popconfirm
                :title="`你确认要删除${row.tmName}么?`"
                @confirm="removeTradeMark(row.id)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    v-hasButton="'btn.Trademark.remove:删除品牌'"
                  >
                    <el-icon><ep-Delete /></el-icon
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 
      page-size 下拉菜单
      page-sizes 下拉菜单值
      -->
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pagination.pageNo"
          v-model:page-size="pagination.limit"
          :page-sizes="[3, 5, 10]"
          layout="prev, pager, next,jumper,->,sizes,total"
          :total="pagination.total"
          background
          size="small"
          @current-change="getHasTrademark"
          @size-change="sizeChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      v-model="dialog.dialogFormVisible"
      :title="dialog.title"
      width="80%"
    >
      <el-form
        label-width="80"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :action="API.fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><ep-Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="TradeMark">
// 请求接口
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from "@/api/product/trademark"
import { API } from "@/api/publicApi"
// 引入ts类型文件
import type { paginationType } from "@/views/product/trademark/type"
import type {
  TradeMarkResponseData,
  TradeMark,
} from "@/api/product/trademark/type"
import type { UploadProps, FormRules } from "element-plus"
import type { managerResponseData } from "@/api/publicType"
// 引入hooks
import useElUpload from "@/hooks/useElUpload"
// 引入utils
import { encodeImgURl } from "@/utils/handlerImgUrl/index.js"
// 分页器
const pagination = reactive<paginationType>({
  // 当前页
  pageNo: 1,
  // 每页显示个数
  limit: 3,
  // 存储已有品牌总个数
  total: 0,
  records: [],
})
// 添加和修改品牌的弹窗
const dialog = reactive({
  title: "",
  // 是否可见
  dialogFormVisible: false,
})
//定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  logoUrl: "",
  tmName: "",
})
// 品牌自定义校验规则方法
function validatorTmName(rule: any, value: any, next: any) {
  if (value.trim().length >= 2) next()
  else next(new Error("品牌名称需要大于等于两位~"))
}
// 品牌LOGO图片的自定义校验规则
function validatorLogoUrl(rule: any, value: any, next: any) {
  // 图片上传成功
  if (value) next()
  else next(new Error("LOGO图片务必上传"))
}
// 获取el-form组件实例
let formRef = ref()
// 表单校验规则对象
const rules = reactive<FormRules<TradeMark>>({
  tmName: [{ required: true, trigger: "blur", validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
})
// 获取已有全部的品牌数据
async function getHasTrademark(pager: number = 1) {
  pagination.pageNo = pager
  const result: TradeMarkResponseData = await reqHasTrademark(
    pagination.pageNo,
    pagination.limit
  )
  if (result.code === 200) {
    pagination.total = result.data.total
    pagination.records = result.data.records.map((item) => {
      return {
        id: item.id,
        // 给返回的图片添加前缀使用反代来解决https后没有图片的问题
        logoUrl: encodeImgURl(item.logoUrl) as string,
        tmName: item.tmName,
      }
    })
  }
}
// 当前显示个数发生变化时的回调
function sizeChange() {
  getHasTrademark()
}
// 添加品牌按钮的回调
function addTrademark() {
  // 清空数据
  reset()
  dialog.title = "添加品牌"
  dialog.dialogFormVisible = true
}
// 修改已有品牌的按钮的回调
// row即为当前已有的品牌
function updateTrademark(row: TradeMark) {
  reset()
  dialog.title = "修改品牌"
  dialog.dialogFormVisible = true
  // 展示已有品牌的数据
  trademarkParams.id = row.id
  trademarkParams.tmName = row.tmName
  trademarkParams.logoUrl = row.logoUrl
}
// 对话框底部取消按钮
function cancel() {
  reset()
  dialog.dialogFormVisible = false
}
// 对话框底部确认按钮
async function confirm() {
  // 在发请求之前，要对于整个表单进行校验
  await formRef.value.validate()
  const result: managerResponseData = await reqAddOrUpdateTrademark(
    trademarkParams
  )
  // 添加品牌成功
  if (result.code === 200) {
    // 关闭对话框
    dialog.dialogFormVisible = false
    // 弹出提示信息
    ElMessage.success(trademarkParams.id ? "修改品牌成功" : "添加品牌成功")
    // 再次发请求获取已有全部的品牌数据
    // 修改留在当前页否则在第一页
    getHasTrademark(trademarkParams.id ? pagination.pageNo : 1)
  } else {
    // 添加品牌失败
    // 关闭对话框
    dialog.dialogFormVisible = false
    // 弹出提示信息
    ElMessage.error(trademarkParams.id ? "修改品牌失败" : "添加品牌失败")
  }
  reset()
}
// 上传图片之前触发的钩子函数
const { beforeUpload } = useElUpload()
// 图片上传成功钩子
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  // 收集上传图片的地址，添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data
  formRef.value?.clearValidate("logoUrl")
}
// 气泡确认框确定按钮的回调
async function removeTradeMark(id: number) {
  const result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElMessage.success("删除品牌成功~")
    // 再次获取已有的品牌数据
    getHasTrademark(
      pagination.records.length > 1 ? pagination.pageNo : pagination.pageNo - 1
    )
  } else ElMessage.error("删除品牌失败")
}
// 清空数据
function reset() {
  trademarkParams.id = undefined
  trademarkParams.logoUrl = ""
  trademarkParams.tmName = ""
  // 清空校验信息
  nextTick(() => {
    formRef.value?.clearValidate()
  })
}
onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped lang="scss">
.container {
  & > *:not(:first-child) {
    margin-top: 10px;
  }
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
