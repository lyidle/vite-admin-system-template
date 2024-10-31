<template>
  <div class="top">
    <div class="left">
      <a class="l-btn" @click="$router.push('/')">首页</a>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <div class="r-btn">统计报告</div>
      <div class="time">当前时间:&nbsp;{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Top">
import moment from "@/utils/zh-moment"
// 存储当前时间
const time = ref(moment().format("LLL:ss"))
const timer = ref()
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format("LLL:ss")
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top {
  // 去掉a链接按钮的下划线
  [class*="btn"] {
    text-decoration: none;
    cursor: pointer;
  }
  width: 100%;
  height: var(--header-height);
  display: flex;
  .left {
    flex: var(--left-flex);
    @include bg-size(
      "@/views/screen/images/dataScreen-header-left-bg.png",
      cover
    );
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    .l-btn {
      width: var(--btn-width);
      height: 100%;
      @include bg-size(
        "@/views/screen/images/dataScreen-header-btn-bg-l.png",
        100% 100%
      );
      text-align: center;
      line-height: var(--header-height);
      color: var(--color);
      font-size: var(--top-btn-size);
    }
  }
  .center {
    flex: var(--center-flex);
    .title {
      width: 100%;
      height: var(--header-center-height);
      @include bg-size(
        "@/views/screen/images/dataScreen-header-center-bg.png",
        100% 100%
      );
      text-align: center;
      line-height: calc(var(--header-center-height) - 10px);
      color: var(--color);
      font-size: var(--top-center-size);
    }
  }
  .right {
    flex: var(--right-flex);
    @include bg-size(
      "@/views/screen/images/dataScreen-header-left-bg.png",
      100% 100%
    );
    display: flex;
    justify-content: space-between;
    align-items: center;
    .r-btn {
      width: var(--btn-width);
      height: 100%;
      @include bg-size(
        "@/views/screen/images/dataScreen-header-btn-bg-r.png",
        100% 100%
      );
      text-align: center;
      line-height: var(--header-height);
      color: var(--color);
      font-size: var(--top-btn-size);
    }
    .time {
      color: var(--color);
      padding-right: 10px;
    }
  }
}
</style>
