<template>
  <div class="container">
    <MySearch
      v-model:keyword="searchKeyword"
      @search="search"
      @reset="ressetSettingStore"
    />
    <el-card>
      <el-button
        type="primary"
        @click="addUser"
        v-hasButton="'btn.User.add:添加用户'"
        >添加用户</el-button
      >
      <el-button
        :type="selectIdArr.length ? 'danger' : 'primary'"
        :plain="!selectIdArr.length"
        @click="deleteSelectedUser"
        :disabled="!selectIdArr.length"
        v-if="UserStore.$state.userInfo.buttons?.includes('btn.User.remove')"
        >批量删除</el-button
      >
      <el-button
        :type="selectIdArr.length ? 'danger' : 'primary'"
        :plain="!selectIdArr.length"
        v-else
        v-hasButton="'btn.User.remove:批量删除用户'"
        >批量删除</el-button
      >
      <!-- 展示用户信息 -->
      <el-table
        style="width: 100%; margin-top: 10px"
        border
        :data="userArr"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" min-width="40" align="center">
        </el-table-column>
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
          prop="username"
          label="用户名字"
          min-width="100"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="用户名称"
          min-width="100"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
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
              @click="setRole(row)"
              v-hasButton="'btn.User.assgin:对用户分配角色'"
            >
              <el-icon><i class="i-ep-user" /></el-icon>
              <span>分配角色</span>
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="updateUser(row)"
              v-hasButton="'btn.User.update:编辑用户'"
            >
              <el-icon><i class="i-ep-edit" /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.username}么?`"
              width="260px"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  v-hasButton="'btn.User.remove:删除用户'"
                >
                  <el-icon><i class="i-ep-delete" /></el-icon>
                  <span>删除</span>
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
        @size-change="getHasUser()"
        @current-change="getHasUser"
        style="margin-top: 10px"
      />
      <!-- 抽屉结构：完成添加新的用户账号|更新已有的账号信息 -->
      <el-drawer
        v-model="drawer"
        :title="drawerTitle"
        style="max-width: 500px"
        size="100%"
        @closed="reset"
      >
        <el-form
          label-width="80px"
          :model="userParams"
          :rules="rules"
          ref="formRef"
        >
          <el-form-item label="用户姓名" prop="username">
            <el-input
              placeholder="请填写用户名字"
              v-model="userParams.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickName">
            <el-input
              placeholder="请填写用户昵称"
              v-model="userParams.nickName"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
            <el-input
              placeholder="请填写用户密码"
              v-model="userParams.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" @click="save">确定</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </template>
      </el-drawer>
      <!-- 抽屉结构：用户某一个已有的账号进行职位分配 -->
      <el-drawer
        v-model="drawer2"
        :title="drawerTitle"
        style="max-width: 500px"
        size="100%"
        @closed="reset"
      >
        <el-form label-width="80px">
          <el-form-item label="用户姓名">
            <el-input disabled :placeholder="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              Check all
            </el-checkbox>
            <el-checkbox-group
              v-model="assignRoles"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="role in allRolesList"
                :key="role.id"
                :value="role"
              >
                <div class="singe-line-elipsis" style="width: 50px">
                  {{ role.roleName }}
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" @click="confirmRole">确定</el-button>
          <el-button @click="drawer2 = false">取消</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="User">
// 引入接口
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from "@/api/acl/user"
// 引入类型
import type {
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  RoleData,
  SetRoleData,
} from "@/api/acl/user/type"
import type { authResponseData } from "@/api/publicType"
// 引入仓库
import useSettingStore from "@/store/Setting"
import useUserStore from "@/store/User"
// 引入hooks
import useReqUserInfo from "@/hooks/usereqUserInfo"
// 使用仓库
const SettingStore = useSettingStore()
const UserStore = useUserStore()
//默认页码
const pageNo = ref<number>(1)
// 一页展示几条数据
const pageSize = ref<number>(5)
//用户总个数
const total = ref<number>(0)
//存储全部用户的数组
const userArr = ref<Records>([])
//定义响应式数据控制抽屉的显示与隐藏
const drawer = ref<boolean>(false)
const drawer2 = ref<boolean>(false)
const drawerTitle = ref<string>("I am the title")
//收集用户信息的响应式数据
const userParams = reactive<User>({
  username: undefined,
  nickName: undefined,
  // 初始值需要是undefined，不然空字符串会携带给服务器修改密码
  password: undefined,
})
// drawer2全选框
// 全选按钮
const checkAll = ref<boolean>(false)
// 用于控制是否显示中间态样式
const isIndeterminate = ref<boolean>(false)
// 选中的元素
const assignRoles = ref<RoleData[]>([])
// 数据源
const allRolesList = ref<RoleData[]>([])
//准备一个数组存储批量删除的用户的ID
const selectIdArr = ref<RoleData[]>([])
//获取form组件实例
const formRef = ref<any>()
//定义响应式数据：收集用户输入进来的关键字
const keyword = ref<string>("")
// 搜索的关键字
const searchKeyword = ref<string>("")
// 校验规则回调函数
function validatorUsername(rule: any, value: any, next: any) {
  if (value.trim().length >= 1) {
    next()
  } else {
    next(new Error("用户名字至少一位~"))
  }
}
function validatorNickName(rule: any, value: any, next: any) {
  if (value.trim().length >= 1) {
    next()
  } else {
    next(new Error("用户昵称至少一位~"))
  }
}
function validatorPassword(rule: any, value: any, next: any) {
  if (value.trim().length >= 6) {
    next()
  } else {
    next(new Error("用户密码至少六位~"))
  }
}
// 校验规则
const rules = {
  username: [
    { required: true, trigger: "change", validator: validatorUsername },
  ],
  nickName: [
    { required: true, trigger: "change", validator: validatorNickName },
  ],
  password: [
    { required: true, trigger: "change", validator: validatorPassword },
  ],
}
//获取全部已有的用户信息
async function getHasUser(pager: number = 1) {
  pageNo.value = pager
  const result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyword.value
  )
  if (result.code === 20000) {
    total.value = result.data.total
    userArr.value = result.data.items
  }
}
// 增加用户
async function addUser() {
  //抽屉显示出来
  drawer.value = true
  drawerTitle.value = "添加用户"
}
// 修改用户
async function updateUser(row: User) {
  //抽屉显示出来
  drawer.value = true
  drawerTitle.value = "编辑用户"
  // 需要等待初始化数据加载后再赋值
  nextTick(() => {
    Object.assign(userParams, {
      id: row.id,
      username: row.username,
      nickName: row.nickName,
    })
  })
}
// 新增和修改用户的保存按钮
async function save() {
  // 表单验证
  await formRef.value.validate()
  const result: authResponseData = await reqAddOrUpdateUser(userParams)
  if (result.code === 20000) {
    useReqUserInfo(() => {
      // 添加回到第一页
      getHasUser(userParams.id ? pageNo.value : 1)
    })
    //关闭抽屉
    drawer.value = false
    ElMessage.success(userParams.id ? "更新成功~" : "添加成功~")
  } else {
    //关闭抽屉
    drawer.value = false
    ElMessage.success(userParams.id ? "更新失败~" : "添加失败~")
  }
}
// 分配角色按钮
async function setRole(row: User) {
  Object.assign(userParams, {
    id: row.id,
    username: row.username,
    nickName: row.nickName,
  })
  const result: AllRoleResponseData = await reqAllRole(userParams.id as string)
  if (result.code === 20000) {
    allRolesList.value = result.data.allRolesList
    assignRoles.value = result.data.assignRoles
    // 得到选中的个数
    const checkedCount = assignRoles.value.length
    // 初始化中间态
    isIndeterminate.value =
      checkedCount > 0 && checkedCount < allRolesList.value.length
    // 抽屉
    drawer2.value = true
    drawerTitle.value = "分配角色"
  }
}
// drawer2全选框切换事件
const handleCheckAllChange = (val: boolean) => {
  // 根据是否全选来判断 是否给选中的元素 赋值 源数据
  assignRoles.value = val ? allRolesList.value : []
  // 全选和全部选没有中间态
  isIndeterminate.value = false
}
// drawer2全选框勾选状态
const handleCheckedCitiesChange = (value: string[]) => {
  // 得到选中的个数
  const checkedCount = value.length

  // 选中的个数和 源数据个数是否相等
  // 给全选框赋值
  checkAll.value = checkedCount === allRolesList.value.length
  /*
    中间态判断
    中间态的范围在
    选中个数大于0 和
    选中个数小于源数据个数
    真 显示中间态 反之不显示
   */
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRolesList.value.length
}
// drawer2分配职务确认按钮
async function confirmRole() {
  let data: SetRoleData = {
    userId: userParams.id as string,
    roleIdList: assignRoles.value.map((item) => item.id as string),
  }
  const result: authResponseData = await reqSetUserRole(data)
  if (result.code === 20000) {
    ElMessage.success("分配职务成功~")
    drawer2.value = false
    getHasUser(pageNo.value)
  } else {
    ElMessage.error("分配职务失败~")
    drawer2.value = false
  }
}
// 删除单个账户
async function deleteUser(userId: number | string) {
  const result: authResponseData = await reqRemoveUser(userId)
  if (result.code === 20000) {
    ElMessage.success("删除成功~")
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage.error("删除失败~")
  }
}
//table复选框勾选的时候会触发的事件
function selectChange(value: RoleData[]) {
  selectIdArr.value = value
}
// 删除多个用户
async function deleteSelectedUser() {
  const idList = selectIdArr.value.map((item) => item.id) as string[]
  const result: authResponseData = await reqSelectUser(idList)
  let page = pageNo.value
  // 要删除的数据大于等于显示的数据则回到上一页
  if (selectIdArr.value.length >= userArr.value.length) page = pageNo.value - 1
  if (result.code === 20000) {
    ElMessage.success("批量删除成功~")
    getHasUser(page)
  } else {
    ElMessage.error("批量删除失败~")
  }
}
//搜索按钮的回调1
function search() {
  keyword.value = searchKeyword.value
  //根据关键字获取相应的用户数据
  getHasUser()
  //清空关键字
  keyword.value = ""
  searchKeyword.value = ""
}
// 重置按钮
function ressetSettingStore() {
  SettingStore.windowRefresh = !SettingStore.windowRefresh
}
// 清空数据
function reset() {
  // 清除表单与信息
  formRef.value?.resetFields()
  // 需要手动置空没有prop的参数 v-if也会导致元素销毁
  userParams.id = undefined
  userParams.password = undefined
}
onBeforeMount(() => {
  getHasUser()
})
</script>

<style scoped lang="scss">
.container {
  & > *:not(:first-child) {
    margin-top: 10px;
  }
}
</style>
