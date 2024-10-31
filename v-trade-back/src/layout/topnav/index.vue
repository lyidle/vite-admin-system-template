<template>
  <div class="topnav-left">
    <!-- 触发父组件的changeIcon事件 改变icon图标 -->
    <el-icon class="el-icon" @click="$emit('changeIcon')" v-if="isShowIcon">
      <ep-fold v-if="fold" />
      <ep-expand v-else />
    </el-icon>
    <BreadCrumb />
  </div>
  <Setting />
</template>

<script setup lang="ts" name="topNav">
import BreadCrumb from "@/layout/topnav/breadcrumb/index.vue"
import Setting from "@/layout/topnav/setting/index.vue"
// 引入 utils
import debounce from "@/utils/debounce"
// 自动折叠的生效尺寸 小于这个尺寸会折叠
const AutoFoldWidth = +import.meta.env.VITE_MENU_FOLD || 992
const isShowIcon = ref<boolean>(true)
const isShow = debounce(() => {
  isShowCallback()
}, 300)
function isShowCallback() {
  if (document.documentElement.offsetWidth < AutoFoldWidth)
    isShowIcon.value = false
  else isShowIcon.value = true
}
defineProps(["fold"])
// 获取父组件的自定义事件
defineEmits(["changeIcon"])
onMounted(() => {
  isShowCallback()
  window.addEventListener("resize", isShow)
})
onUnmounted(() => {
  window.removeEventListener("resize", isShow)
})
</script>

<style lang="scss">
.topnav-left {
  display: flex;
  align-items: center;
  margin-left: 20px;
  .el-icon {
    margin-right: 10px;
    cursor: pointer;
  }
}
.topnav-right {
  display: flex;
  align-items: center;
  .logo {
    width: 24px;
    height: 24px;
  }
  // 右侧间距
  & > * {
    margin: 0 5px !important;
  }
}
</style>
