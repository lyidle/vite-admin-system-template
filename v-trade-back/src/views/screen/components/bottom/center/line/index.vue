<template>
  <div class="contain">
    <echartsTitle title="未来30天游客星趋势图" class="title" />
    <div class="chart">
      <echartsLine :title="data.title" :grid="data.grid" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Line">
import { DataProps } from "@/components/echarts/line/type.ts"
const data = reactive<DataProps>({
  title: {
    text: "(访问量)",
    textStyle: {
      color: "rgb(157, 180, 244)",
      fontSize: 10,
    },
    top: 25,
    left: 10,
  },
  grid: {
    top: 60,
    bottom: 40,
    left: 40,
    right: 40,
  },
})
</script>

<style scoped lang="scss">
.contain {
  @include bg-size("@/views/screen/images/dataScreen-main-cb.png", 100% 100%);
  $title-height: 35px;
  .chart {
    $margin-top: 10px;
    width: 100%;
    height: calc(100% - $title-height - $margin-top);
    margin-top: $margin-top;
  }
}
</style>
