<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <el-form-item></el-form-item>
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              placeholder=""
              :prefix-icon="EpUser"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder=""
              type="password"
              :prefix-icon="EpLock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              :disabled="loading"
              type="primary"
              class="login-submit"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="account">
      <div>username: admin</div>
      <div style="user-select: none; height: 100%; width: 10px"></div>
      <div>password: 111111</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
// 引入用户相关仓库
import useUserStore from "@/store/User"
import { getTime } from "@/utils/time"
// 引入icon
import EpUser from "@/components/Icons/Ep/User.vue"
import EpLock from "@/components/Icons/Ep/Lock.vue"
// 表单信息
let loginForms = ref()
const $router = useRouter()
const $route = useRoute()
// 用户仓库
const userStore = useUserStore()
let loading = ref(false)
// 收集账号与密码的数据
const loginForm = reactive({ username: "tes123", password: "321654" })
// 表单校验规则
const rules = {
  username: [
    {
      required: true,
      min: 5,
      message: "账号长度至少五位",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      message: "密码长度至少六位",
      trigger: "change",
    },
  ],
}
// 登录按钮回调
async function login() {
  try {
    // 保证全部表单相校验通过再发请求
    await loginForms.value.validate()
  } catch (error) {
    return
  }
  // 按钮开始加载
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    await userStore.userInfo()
    $router.push(`${$route.query.redirect || "/"}`)
    ElNotification({
      type: "success",
      message: "欢迎回来",
      title: `Hi,${getTime()}好~`,
    })
    loading.value = false
  } catch (error) {
    try {
      // 通过jp转换返回的错误信息来判断是否是json
      // 不是就是null等类型无法jp的类型 输出预定义信息
      Boolean(JSON.parse((error as Error).message))
      ElNotification({
        type: "error",
        message: `请输入正确的信息~`,
      })
    } catch (_) {
      // 是字符串类型就直接打印
      ElNotification({
        type: "error",
        message: (error as Error).message,
      })
    }
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("@/views/login/images/background.png") no-repeat;
  background-size: cover;
  .login-form {
    position: relative;
    width: 80%;
    height: 50vh;
    top: 30vh;
    background-image: linear-gradient(
      rgba(135, 207, 235, 0.911),
      rgba(135, 207, 235, 0.697)
    );
    padding: 0 50px;
    border-radius: 10px;
    h1 {
      font-size: 40px;
      color: white;
      margin-top: 30px;
      margin-bottom: 5px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin-bottom: 20px;
    }
    .login-submit {
      width: 100%;
    }
  }
  .account {
    position: fixed;
    display: flex;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    background-color: rgba(135, 207, 235, 0.649);
    padding: 10px;
    border-radius: 8px;
  }
}
</style>
