<template>
  <echarts :options="options" id="charts"></echarts>
</template>
<script setup name="lineCharts" lang="ts">
const $props = defineProps({
  data1: {
    type: Number,
    default: 60,
  },
  data2: {
    type: Number,
    default: 40,
  },
})
const leftData = ref()
if ($props["data1"]) {
  leftData.value = $props["data1"]
} else {
  leftData.value = 100 - $props["data2"]
}
const options = {
  xAxis: {
    show: false,
    // 最小值与最大值的设置
    min: 0,
    max: 100,
  },
  yAxis: {
    show: false,
    // 横向分布
    type: "category",
  },
  series: [
    {
      type: "bar",
      data: [leftData.value],
      // 柱状图的宽度
      barWidth: 20,
      // 层级
      z: 2,
      itemStyle: {
        borderRadius: 20,
        color: "#0076FF",
      },
    },
    {
      type: "bar",
      data: [100],
      // 柱状图的宽度
      barWidth: 20,
      // 调整间距
      barGap: "-100%",
      // 层级
      z: 1,
      itemStyle: {
        borderRadius: 20,
        color: "#FF5F79",
      },
    },
  ],
  // 动画
  // animationDuration: 0,
  // animationDurationUpdate: 0,
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
}
</script>

<style lang="scss" scoped>
#charts {
  width: 100%;
  height: 100%;
}
</style>
