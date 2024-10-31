<template>
  <div class="contain">
    <echartsTitle title="热门景区排行" />
    <div class="header">
      <div class="item">排名</div>
      <div class="item">景区</div>
      <div class="item">预约数量</div>
    </div>
    <rankTable />
  </div>
</template>

<script setup lang="ts" name="Rank">
// 引入echarts组件
// 引入类型
// import { PropsDataType } from "@/components/RankTable/type"
// 已经作为默认值了
// const data = reactive<PropsDataType[]>([
//
// ])
</script>

<style scoped lang="scss">
.contain {
  width: 100%;
  height: 100%;
  $title-height: 35px;
  padding: 0 20px;
  // 标题
  ::v-deep(.title) {
    // paddin-left拉回来
    margin-left: -10px;
  }
  & > .header {
    margin-top: $title-height;
    @include bg-size("@/views/screen/images/rankingChart-bg.png");
    @include rank-layout();
    margin-bottom: $screen-rank-items-top;
    .item {
      color: orange;
    }
  }
}
</style>
