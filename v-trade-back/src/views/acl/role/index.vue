<template>
  <div>
    <MySearch
      v-model:keyword="searchKeyword"
      @search="search"
      @reset="ressetButten"
    />
    <el-card style="margin-top: 10px">
      <el-button
        type="primary"
        @click="addRole"
        v-hasButton="'btn.Role.add:添加职位'"
      >
        <el-icon><i class="i-ep-plus" /></el-icon>
        <span>添加职位</span>
      </el-button>
      <el-table style="width: 100%; margin-top: 10px" border :data="allRole">
        <el-table-column type="index" label="#" min-width="40" align="center">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          min-width="100"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="职务名字"
          min-width="100"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="创建时间"
          min-width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="gmtModified"
          label="更新时间"
          min-width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column width="300" label="操作" align="center" fixed="right">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="assignRole(row)"
              v-hasButton="'btn.Role.assgin:对职位分配权限'"
            >
              <el-icon><i class="i-ep-user" /></el-icon>
              <span>分配权限</span>
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="updateRole(row)"
              v-hasButton="'btn.Role.update:编辑职位'"
            >
              <el-icon><i class="i-ep-edit" /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.roleName}么?`"
              width="260px"
              @confirm="removeRole(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  v-hasButton="'btn.Role.remove:删除职位'"
                >
                  <el-icon><i class="i-ep-delete" /></el-icon>
                  <span>编辑</span>
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
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="getHasRole()"
        @current-change="getHasRole"
        style="margin-top: 10px"
      />
      <!--添加职位与更新已有职位的结构：对话框-->
      <el-dialog
        v-model="dialogFormVisible"
        :title="dialogTitle"
        width="500"
        @closed="resetDialogue"
      >
        <el-form label-width="80px" :model="RoleParams" :rules ref="refForm">
          <el-form-item label="职位名称" prop="roleName">
            <el-input
              placeholder="请你输入职位名称"
              v-model.trim="RoleParams.roleName"
            ></el-input
          ></el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" @click="save">确定</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </template>
      </el-dialog>
      <!-- 抽屉组件：分配职位的菜单权限与按钮的权限 -->
      <el-drawer
        v-model="drawer"
        title="分配菜单与按钮权限"
        size="100%"
        style="max-width: 400px"
        @closed="RoleParams.id = undefined"
      >
        <el-tree
          style="max-width: 600px"
          :data="menuArr"
          ref="tree"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectArr"
          :props="defaultProps"
        />
        <template #footer>
          <el-button type="primary" @click="handlerSave">确认</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Role">
// 引入接口
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermission,
  reqRemoveRole,
} from "@/api/acl/role"
// 引入类型
import type {
  RoleResponseData,
  RoleItemData,
  SetPermissionData,
} from "@/api/acl/role/type"
import type { MenuResponseData, MenuList } from "@/api/acl/menu/type"
import { authResponseData } from "@/api/publicType"
// 引入仓库
import useSettingStore from "@/store/Setting"
// 引入hooks
import useReqUserInfo from "@/hooks/usereqUserInfo"
const settingStore = useSettingStore()
//当前页码
const pageNo = ref<number>(1)
//一页展示几条数据
const pageSize = ref<number>(3)
// 查询职位关键字
const keyword = ref<string>("")
// 搜索职位关键字
const searchKeyword = ref<string>("")
//存储全部已有的职位
const allRole = ref<RoleItemData[]>([])
//职位总个数
const total = ref<number>(0)
// 添加与编辑的对话框显示与隐藏
const dialogFormVisible = ref<boolean>(false)
const dialogTitle = ref<string>("Shipping address")
//收集新增岗位数据
const RoleParams = reactive<RoleItemData>({
  roleName: "",
})
// 添加职位与修改职位对话框实例
const refForm = ref()
//控制抽屉显示与隐藏
const drawer = ref<boolean>(false)
//准备一个数组：数组用于存储勾选的节点的ID
const selectArr = ref<number[] | string[]>([])
// 自定义校验规则的回调
function validatorRoleName(rule: any, value: any, next: any) {
  if (value.length >= 2) {
    next()
  } else {
    next(new Error("职位名称至少两位"))
  }
}
//职位校验规则
const rules = {
  roleName: [
    { required: true, trigger: "change", validator: validatorRoleName },
  ],
}
//定义数组存储用户权限的数据
const menuArr = ref<MenuList>([])
// 分配权限树状图 配置
const defaultProps = {
  children: "children",
  label: "name",
}
//获取tree组件实例
const tree = ref<any>()
// 获取数据渲染页面
async function getHasRole(pager: number = 1) {
  pageNo.value = pager
  const result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value
  )
  if (result.code === 20000) {
    total.value = result.data.total
    allRole.value = result.data.items
  }
}
// 搜索按钮的回调
function search() {
  keyword.value = searchKeyword.value
  getHasRole()
  keyword.value = ""
  searchKeyword.value = ""
}
// 重置按钮回到
function ressetButten() {
  settingStore.windowRefresh = !settingStore.windowRefresh
}
//添加职位按钮的回调
function addRole() {
  dialogTitle.value = "添加职位"
  dialogFormVisible.value = true
}
//编辑职位按钮的回调
function updateRole(row: RoleItemData) {
  dialogTitle.value = "编辑职位"
  dialogFormVisible.value = true
  nextTick(() => {
    Object.assign(RoleParams, {
      id: row.id,
      roleName: row.roleName,
    })
  })
}
// 分配权限按钮
async function assignRole(row: RoleItemData) {
  drawer.value = true
  Object.assign(RoleParams, {
    id: row.id,
  })
  //根据职位获取权限的数据
  const result: MenuResponseData = await reqAllMenuList(RoleParams.id as string)
  if (result.code === 20000) {
    menuArr.value = result.data.children
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
// 确认按钮
async function save() {
  await refForm.value.validate()
  const result: authResponseData = await reqAddOrUpdateRole(RoleParams)
  if (result.code === 20000) {
    dialogFormVisible.value = false
    ElMessage.success(RoleParams.id ? "更新成功~" : "添加成功~")
    getHasRole(pageNo.value)
  } else {
    dialogFormVisible.value = false
    ElMessage.success(RoleParams.id ? "更新失败~" : "添加失败~")
  }
}
// 对话框关闭
function resetDialogue() {
  // 没有分配prop校验的需要手动重置
  RoleParams.id = undefined
  refForm.value.resetFields()
}
// 过滤出默认选中的职位
function filterSelectArr(data: MenuList, initData: number[]) {
  data.forEach((item: any) => {
    // 除开第一层的选中情况
    if (item.select && item.level !== 1) {
      initData.push(item.id)
    }
    // 如果有children就递归
    if (item.children) {
      filterSelectArr(item.children, initData)
    }
  })
  return initData
}
// 权限分配保存按钮
async function handlerSave() {
  // 整理参数
  const data: SetPermissionData = {
    permissionIdList: tree.value.getCheckedKeys(),
    roleId: RoleParams.id as string,
  }
  const result: MenuResponseData = await reqSetPermission(data)
  if (result.code === 20000) {
    drawer.value = false
    ElMessage.success("分配权限成功~")
    useReqUserInfo(() => {
      // 销毁与重载整个App
      settingStore.windowRefresh = !settingStore.windowRefresh
    })
  } else {
    ElMessage.error("分配权限失败~")
    getHasRole(pageNo.value)
  }
  // 不管成功与否都要置空id
  // drawer中的closed中置空
  // RoleParams.id = undefined
}
// 删除职位
async function removeRole(roleId: number) {
  const result = await reqRemoveRole(roleId)
  if (result.code === 20000) {
    ElMessage.success("删除成功~")
    // 非法判断就一页
    if (pageNo.value === 1) {
      getHasRole(1)
      return
    }
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage.error("删除失败~")
  }
}
onBeforeMount(() => {
  //获取职位请求
  getHasRole()
})
</script>

<style scoped lang="scss"></style>
