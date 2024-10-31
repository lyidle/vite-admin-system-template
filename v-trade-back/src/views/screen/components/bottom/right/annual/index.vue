<template>
  <div class="contain">
    <echartsTitle title="年度游客量对比" />
    <echartsLine
      :series="data.series"
      :grid="data.grid"
      :title="data.title"
      :data="data.data"
      :legend="data.legend"
    />
  </div>
</template>

<script setup lang="ts" name="Annual">
import { DataProps } from "@/components/echarts/line/type.ts"
const data = reactive<DataProps>({
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  series: [
    {
      name: "2021",
      data: [
        237, 1771, 2722, 2184, 648, 168, 1523, 1174, 1209, 1212, 316, 2254,
      ],
      color: ["rgb(195, 151, 81)", "rgba(195, 151, 81,0)"], // 0% 处的颜色
    },
    {
      name: "2022",
      data: [2148, 1219, 846, 244, 2485, 1588, 1431, 120, 131, 2877, 573, 1967],
      color: ["rgb(255, 93, 171)", "rgba(255, 93, 171,0)"], // 0% 处的颜色
    },
    {
      name: "2023",
      data: [
        150, 2999, 1791, 2165, 1235, 2105, 2573, 1653, 2660, 1373, 339, 194,
      ],
      color: ["rgb(14, 107, 228)", "rgba(14, 107, 228,0)"], // 0% 处的颜色
    },
  ],
  grid: {
    top: 80,
    bottom: 25,
    left: 25,
    right: 20,
  },
  title: {
    text: "(游客量)",
    textStyle: {
      color: "rgb(157, 180, 244)",
      fontSize: 10,
    },
    top: 45,
    left: 0,
  },
  legend: {
    top: 50,
    icon: "roundRect",
    textStyle: {
      color: "white",
    },
  },
})
</script>

<style scoped></style>
