<template>
  <div>
    <el-table
      :data="PermissionArr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="gmtCreate" label="修改时间" />
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button
            :type="
              row.level <= 1
                ? 'default'
                : row.level <= 2
                ? 'success'
                : row.level <= 3
                ? 'primary'
                : 'primary'
            "
            :plain="row.level >= 4 ? false : true"
            size="small"
            style="margin: 5px"
            @click="addPermission(row)"
            :disabled="row.level >= 4 ? true : false"
            v-if="
              UserStore.$state.userInfo.buttons?.includes(
                'btn.Permission.remove'
              )
            "
            >{{ row.level >= 3 ? "添加功能" : "添加菜单" }}</el-button
          >
          <el-button
            v-else
            :type="
              row.level <= 1
                ? 'default'
                : row.level <= 2
                ? 'success'
                : row.level <= 3
                ? 'primary'
                : 'primary'
            "
            :plain="row.level >= 4 ? false : true"
            size="small"
            style="margin: 5px"
            v-hasButton="
              `btn.Permission.add:${row.level >= 3 ? '添加功能' : '添加菜单'}`
            "
            >{{ row.level >= 3 ? "添加功能" : "添加菜单" }}</el-button
          >
          <el-button
            :type="
              row.level <= 1
                ? 'default'
                : row.level <= 2
                ? 'success'
                : row.level <= 3
                ? 'primary'
                : 'primary'
            "
            :plain="row.level >= 4 ? false : true"
            size="small"
            style="margin: 5px"
            @click="updatePermission(row)"
            :disabled="row.level == 1 ? true : false"
            v-if="
              UserStore.$state.userInfo.buttons?.includes(
                'btn.Permission.update'
              )
            "
            >编辑</el-button
          >
          <el-button
            v-else
            :type="
              row.level <= 1
                ? 'default'
                : row.level <= 2
                ? 'success'
                : row.level <= 3
                ? 'primary'
                : 'primary'
            "
            :plain="row.level >= 4 ? false : true"
            size="small"
            style="margin: 5px"
            v-hasButton="'btn.Permission.update:编辑菜单'"
            >编辑</el-button
          >
          <el-popconfirm
            :title="`你确定要删除${row.name}么？`"
            width="230"
            @confirm="removeMenu(row.id)"
          >
            <template #reference>
              <el-button
                :type="
                  row.level <= 1
                    ? 'default'
                    : row.level <= 2
                    ? 'success'
                    : row.level <= 3
                    ? 'primary'
                    : 'primary'
                "
                :plain="row.level >= 4 ? false : true"
                size="small"
                style="margin: 5px"
                :disabled="row.level == 1 ? true : false"
                v-if="
                  UserStore.$state.userInfo.buttons?.includes(
                    'btn.Permission.remove'
                  )
                "
              >
                删除
              </el-button>
              <el-button
                v-else
                :type="
                  row.level <= 1
                    ? 'default'
                    : row.level <= 2
                    ? 'success'
                    : row.level <= 3
                    ? 'primary'
                    : 'primary'
                "
                :plain="row.level >= 4 ? false : true"
                size="small"
                style="margin: 5px"
                v-hasButton="'btn.Permission.remove:删除菜单'"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框组件：添加或者更新已有的菜单的数据结构 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500"
      @closed="reset"
    >
      <!--－表单组件：收集新增与已有的菜单的数据-->
      <el-form label-width="80">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入菜单名称"
            v-model="menuData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input
            placeholder="请输入权限数值"
            v-model="menuData.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button>取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Permission">
// 引入接口
import {
  reqAllPermission,
  reqAddOrUpdateMenu,
  reqRemoveMenu,
} from "@/api/acl/menu"
// 引入类型
import {
  MenuResponseData,
  MenuList,
  MenuChildrenData,
  MenuParams,
} from "@/api/acl/menu/type"
import { authResponseData } from "@/api/publicType"
// 引入仓库
import useUserStore from "@/store/User"
const UserStore = useUserStore()
//存储菜单的数据
const PermissionArr = ref<MenuList>([])
//控制对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
const dialogTitle = ref<string>("Tips")
const menuData = reactive<MenuParams>({
  code: undefined,
  level: undefined,
  name: undefined,
  pid: undefined,
})
//获取菜单数据的方法
async function getHasPermission() {
  const result: MenuResponseData = await reqAllPermission()
  if (result.code === 20000) {
    PermissionArr.value = result.data.children
  }
}
//添加菜单按钮的回调
function addPermission(row: MenuChildrenData) {
  dialogVisible.value = true
  dialogTitle.value = row.level >= 3 ? "添加功能" : "添加菜单"
  //收集新增的菜单的level数值
  menuData.level = row.level + 1
  //给谁新增子菜单
  menuData.pid = row.id
}
// 编辑已有的菜单
function updatePermission(row: MenuChildrenData) {
  dialogVisible.value = true
  dialogTitle.value = row.level <= 3 ? "编辑菜单" : "编辑功能"
  // 收集需要的数据
  Object.assign(menuData, {
    id: row.id,
    code: row.code,
    level: row.level,
    name: row.name,
    pid: row.pid,
  })
}
//确定按钮的回调
async function save() {
  const result: authResponseData = await reqAddOrUpdateMenu(menuData)
  if (result.code === 20000) {
    getHasPermission()
    dialogVisible.value = false
    ElMessage.success(menuData.id ? "更新成功~" : "添加成功~")
  } else {
    dialogVisible.value = false
    ElMessage.error(menuData.id ? "更新失败~" : "添加失败~")
  }
}
async function removeMenu(id: number) {
  const result = await reqRemoveMenu(id)
  if (result.code === 20000) {
    getHasPermission()
    ElMessage.success("删除成功~")
  } else {
    dialogVisible.value = false
    ElMessage.error("删除失败~")
  }
}
// 清空数据
function reset() {
  dialogTitle.value = ""
  Object.assign(menuData, {
    id: undefined,
    code: undefined,
    level: undefined,
    name: undefined,
    pid: undefined,
  })
}
//组件挂载完毕之前
onBeforeMount(() => {
  getHasPermission()
})
</script>

<style scoped></style>
