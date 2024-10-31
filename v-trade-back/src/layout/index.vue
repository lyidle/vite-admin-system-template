<template>
  <div class="container">
    <!-- 菜单项 -->
    <div
      class="slider"
      :class="{ 'menu-fold': fold }"
      @click.capture="MenuExpand"
    >
      <Logo />
      <!-- 滚动组件 -->
      <el-scrollbar class="slider-menu-nav">
        <!-- 菜单组件 -->
        <el-menu
          router
          :default-active="$route.path"
          :collapse="fold ? true : false"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <!-- 动态路由菜单 -->
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="content-area"
      :class="{ 'menu-fold': fold }"
      @click.capture="MenuFold"
    >
      <!-- 顶部导航 -->
      <div class="topNav">
        <topNav :fold="fold" @changeIcon="fold = !fold" />
      </div>
      <!-- 内容展示区 -->
      <div class="content"><Main /></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
// 引入左侧菜单logo子组件
import Logo from "@/layout/logo/index.vue"
// 引入菜单组件
import Menu from "@/layout/menu/index.vue"
// 引入内容组件
import Main from "@/layout/main/index.vue"
// 引入导航组件
import topNav from "@/layout/topnav/index.vue"
// 获取用户相关的小仓库
import useUserStore from "@/store/User"
// 引入节流
import debounce from "@/utils/debounce"
// 引入用户仓库
import useSettingStore from "@/store/Setting"
// 使用仓库
const settingStore = useSettingStore()
const userStore = useUserStore()
// 菜单的折叠
const fold = ref(false)
const isAutoFold = ref<boolean>(JSON.parse(settingStore.isAutoFold))
// 自动折叠的生效尺寸 小于这个尺寸会折叠
const AutoFoldWidth = settingStore.AutoFoldWidth
// 菜单悬浮的尺寸 小于这个尺寸菜单会悬浮
const FloatWidth = settingStore.FloatWidth
// 懒得弄了
watch(
  () => settingStore.isAutoFold,
  (newV) => {
    if (JSON.parse(newV)) {
      // 需要初始化
      resizeAutoFoldCallback()
    }
    isAutoFoldCallback(JSON.parse(newV))
  }
)
// 用于判断是否折叠的回调
function isAutoFoldCallback(newV: boolean) {
  if (newV) {
    MountedMenuAutoFold()
  } else {
    // 清除之前的事件
    UnMountedMenuAutoFold()
  }
}
// resize事件的回调，方便设置和取消事件 用于加防抖
const resizeAutoFold = debounce(() => {
  resizeAutoFoldCallback()
}, 300)
// 自动折叠的详细代码
function resizeAutoFoldCallback() {
  // 根据屏幕大小来决定menu的状态 防抖300毫秒
  if (document.documentElement.offsetWidth < AutoFoldWidth) fold.value = true
  else fold.value = false
}
// 自动变化menu的代码
function MountedMenuAutoFold() {
  window.addEventListener("resize", resizeAutoFold)
}
// 卸载resize事件
function UnMountedMenuAutoFold() {
  window.removeEventListener("resize", resizeAutoFold)
}
// 小屏menu展开事件
function MenuExpand() {
  if (document.documentElement.offsetWidth > FloatWidth) return
  fold.value = false
}
// 小屏menu收起事件
function MenuFold() {
  if (document.documentElement.offsetWidth > FloatWidth) return
  fold.value = true
}

// 挂载之前
onBeforeMount(() => {
  // 初始化
  resizeAutoFoldCallback()
  // 挂载自动折叠事件
  isAutoFoldCallback(isAutoFold.value)
})
// 卸载之前
onBeforeUnmount(() => {
  // 卸载自动折叠事件
  UnMountedMenuAutoFold()
})
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  // 菜单
  .slider {
    width: $base-menu-expand-width;
    height: 100vh;
    background: $base-menu-bg;
    transition: $base-menu-toggle-during;
    white-space: nowrap;
    overflow: hidden;
    .slider-menu-nav {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
        // // el菜单样式
        // 折叠状态下 背景不生效
        // --el-menu-bg-color: #304156;
        // --el-menu-hover-bg-color: #1f2f43;
        // --el-menu-text-color: #fff;
        // --el-menu-active-color: #409eff;
      }
    }
    @media screen and (max-width: $floatWidth) {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
    }
    // 菜单收起状态
    &.menu-fold {
      width: $base-menu-fold-width;
    }
  }
  .content-area {
    flex: 1;
    overflow: hidden;
    transition: $base-menu-toggle-during;
    @media screen and (max-width: $floatWidth) {
      flex: none;
      position: fixed;
      right: 0;
      width: calc(100vw - $base-menu-fold-width);
    }
    // 顶部导航
    .topNav {
      width: 100%;
      height: $base-menu-height;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: $base-topnav-bg;
      box-shadow: 0 0 5px #393939;
      overflow: hidden;
    }
    // 内容区
    .content {
      width: 100%;
      height: calc(100vh - $base-menu-height);
      background: $base-content-bg;
      padding: $base-content-pd;
      overflow: auto;
    }
  }
}
</style>
