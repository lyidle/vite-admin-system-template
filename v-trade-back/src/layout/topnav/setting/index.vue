<template>
  <div class="topnav-right">
    <el-button size="small" circle @click="updateRefresh"
      ><el-icon><ep-Refresh /></el-icon
    ></el-button>
    <el-button size="small" circle @click="FullScreen"
      ><el-icon><ep-FullScreen /></el-icon
    ></el-button>
    <el-popover
      placement="bottom"
      title="主题设置"
      :width="300"
      trigger="hover"
    >
      <el-form>
        <el-form-item label="自动折叠Menu" style="margin: 0">
          <el-switch
            v-model="isAutoFold"
            size="small"
            :active-icon="AutoSvg"
            :inactive-icon="AutoSvg"
            inline-prompt
            @change="settingStore.setAutoFold(JSON.stringify(isAutoFold))"
          />
        </el-form-item>
        <el-form-item label="暗黑模式" style="margin: 0">
          <el-switch
            v-model="dark"
            size="small"
            :active-icon="EpMoonNight"
            :inactive-icon="EpSunny"
            inline-prompt
            @change="changeDark"
          />
        </el-form-item>
        <el-form-item label="侧边栏Title" style="margin: 0">
          <el-switch
            v-model="isTitle"
            size="small"
            :active-icon="EpMoonNight"
            :inactive-icon="EpSunny"
            inline-prompt
            @change="settingStore.setTitle(JSON.stringify(isTitle))"
          />
        </el-form-item>
      </el-form>

      <template #reference>
        <el-button size="small" circle><ep-Setting /></el-button>
      </template>
    </el-popover>
    <!-- 用户头像 -->
    <img :src="userStore.$state.userInfo.avatar" class="logo" />
    <!-- 下拉菜单 -->
    <el-dropdown style="cursor: pointer">
      <span class="el-dropdown-link">
        <!-- 用户名 -->
        {{ userStore.$state.userInfo.username }}
        <el-icon class="el-icon--right">
          <ep-arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="Setting">
// 引入按钮相关仓库 可以不使用pinia 使用mitt 也行 懒得安装了
// 引入用户仓库
import useSettingStore from "@/store/Setting"
import useUserStore from "@/store/User"
// 引入自动折叠菜单的 switch 图标
import AutoSvg from "@/components/Icons/svg/Auto/index.vue"
// 引入图标
import EpMoonNight from "@/components/Icons/Ep/MoonNight.vue"
import EpSunny from "@/components/Icons/Ep/Sunny.vue"
// 使用路由
const $router = useRouter()
const $route = useRoute()
// 使用仓库
const userStore = useUserStore()
const settingStore = useSettingStore()
// 用于控制暗夜模式
const dark = ref<boolean>(JSON.parse(settingStore.isDark))
// 用于控制是否折叠菜单
const isAutoFold = ref<boolean>(JSON.parse(settingStore.isAutoFold))
// 用于控制是否显示侧边栏的title
const isTitle = ref<boolean>(JSON.parse(settingStore.isTitle))
// 需要执行一次是否是暗色
changeDark()
// 窗口刷新按钮
function updateRefresh() {
  settingStore.windowRefresh = !settingStore.windowRefresh
}
// 全屏按钮相关事件 F11后再调用api会失效
// F11劫持
function FullScreen() {
  let full = document.fullscreenElement
  if (!full) {
    // 文档根节点的方法requestFullscreen，实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
// 全屏事件回调
const F11Proxy = (e: KeyboardEvent) => {
  if (e.key === "F11") {
    e.preventDefault()
    FullScreen()
  }
}
// 退出登录
async function logout() {
  try {
    await userStore.userLogout()
    $router.push({
      path: "/login",
      query: {
        redirect: $route.path,
      },
    })
  } catch (error: any) {
    ElMessage({
      type: "error",
      message: "退出失败~",
    })
  }
}
//switch开关的chang事件进行暗黑模式的切换
function changeDark() {
  const html = document.documentElement
  if (dark.value) {
    html.classList.add("dark")
  } else if (html.classList.contains("dark")) {
    html.classList.remove("dark")
  }
  settingStore.setDark(JSON.stringify(dark.value))
}
onMounted(() => {
  // 主题切换
  changeDark()
  // F11全屏
  window.addEventListener("keydown", F11Proxy)
})
onUnmounted(() => {
  // F11全屏
  window.removeEventListener("keydown", F11Proxy)
})
</script>

<style scoped lang="scss"></style>
