<template>
  <echarts :options="options" id="charts"></echarts>
</template>

<script setup name="progressChart" lang="ts">
const $props = defineProps({
  color: {
    type: String,
    default: "#B09AD5",
  },
  labelColor: {
    type: String,
    default: "white",
  },
  borderColor: {
    type: String,
    default: "#9dbee4a5",
  },
  height: {
    type: Number,
    default: "20",
  },
  num: {
    type: Number,
    default: "6",
  },
})
const options = {
  xAxis: {
    show: false,
    // 最小值与最大值的设置
    min: 0,
    max: 10,
  },
  yAxis: {
    show: false,
    // 横向分布
    type: "category",
  },
  series: [
    {
      type: "bar",
      data: [$props["num"]],
      // 主背景色
      color: $props["color"],
      // 柱状图的宽度
      barWidth: $props["height"],
      showBackground: true,
      // 背景色
      backgroundStyle: {
        color: "#101752",
        borderColor: $props["borderColor"],
        borderWidth: 2,
        borderRadius: 50,
      },
      itemStyle: {
        borderRadius: 50,
      },
      // 分隔符
      label: {
        show: true,
        formatter: "{c}0%",
        color: $props["labelColor"],
        position: "insideLeft",
        offset: [10, 0],
        fontSize: 13,
      },
    },
  ],
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
  color: #9dbee4a5;
  width: 100%;
  height: 100%;
}
</style>
