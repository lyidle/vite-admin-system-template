<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <Top />
      <div class="bottom">
        <div class="left">
          <Tourist class="top" />
          <Gender class="middle" />
          <Age class="bottom" />
        </div>
        <div class="center">
          <echartsMap class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="top" />
          <Annual class="middle" />
          <Reserve class="bottom" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Screen">
// 引入组件
// 顶部
import Top from "@/views/screen/components/top/index.vue"
// 底部 左侧 三个组件
import Tourist from "@/views/screen/components/bottom/left/tourist/index.vue"
import Gender from "@/views/screen/components/bottom/left/gender/index.vue"
import Age from "@/views/screen/components/bottom/left/age/index.vue"
// 底部中间 两个组件
import Line from "@/views/screen/components/bottom/center/line/index.vue"
// 底部右侧 三个组件
import Rank from "@/views/screen/components/bottom/right/rank/index.vue"
import Annual from "@/views/screen/components/bottom/right/annual/index.vue"
import Reserve from "@/views/screen/components/bottom/right/reserve/index.vue"
// 引入自定义工具
import debounce from "@/utils/debounce"
// 获取组件实列
const screen = ref()
//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ws = window.innerWidth / w
  const hs = window.innerHeight / h
  return ws < hs ? { scale: ws, top: "0" } : { scale: hs, top: "50%" }
}
// 设置缩放
function setScale() {
  const { scale, top } = getScale()
  screen.value.style.top = top
  screen.value.style.transform = `scale(${scale}) translateX(-50%) ${
    top === "50%" ? "translateY(-50%)" : ""
  }`
}
// 页面大小改变回调事件
const setResize = debounce(() => {
  setScale()
}, 200)

onMounted(() => {
  setScale()
  window.addEventListener("resize", setResize)
})
onUnmounted(() => {
  window.removeEventListener("resize", setResize)
})
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url("@/views/screen/images/bg.png") no-repeat;
  background-size: cover;
  --header-height: 40px;
  --header-center-height: 74px;
  $vw: 1920px;
  $vh: 1080px;
  // 内容区域距离顶部的位置
  $content-padding-top: 10px;
  // 左右内容区的上边距
  $content-items-top: 30px;
  $margin-bottom: 0 50px;
  & > .screen {
    width: $vw;
    height: $vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    & > .top {
      --color: #29fcff;
      --btn-width: 150px;
      --top-btn-size: 20px;
      --top-center-size: 30px;
      // 内容占比
      --left-flex: 1.2;
      --center-flex: 2;
      --right-flex: 1.2;
    }
    & > .bottom {
      margin: $margin-bottom;
      padding-top: $content-padding-top;
      // 左右两边布局设置
      @mixin between-items-top(
        $url: "@/views/screen/images/dataScreen-main-lb.png",
        $size: 100% 100%
      ) {
        flex: 1;
        height: calc($vh - var(--header-height));
        display: flex;
        flex-direction: column;
        // 定义上中下类名数组
        $items: ".top", ".middle", ".bottom";
        // 遍历简化重复操作
        @each $i in $items {
          #{$items} {
            flex: 1;
            @include bg-size($url, $size);
          }
        }
        // 每一项的上边居
        > *:not(:first-child) {
          margin-top: $content-items-top;
        }
      }
      display: flex;
      & > .left {
        @include between-items-top();
      }
      & > .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .map {
          padding-top: calc(var(--header-center-height) - var(--header-height));
          flex: 2.3;
        }
        .line {
          flex: 1;
          margin: 0 20px;
        }
      }
      & > .right {
        @include between-items-top();
      }
    }
  }
}
</style>
