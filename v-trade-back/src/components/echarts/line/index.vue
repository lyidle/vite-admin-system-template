<template>
  <echarts class="charts" :options="option"></echarts>
</template>

<script setup lang="ts" name="Line">
// 引入类型
import { seriesType } from "@/components/echarts/line/type.ts"
const $props = defineProps({
  title: {
    type: Object,
  },
  series: {
    type: Object as () => seriesType[],
    default: [
      {
        data: [30, 90, 40, 70, 30, 80, 30],
        color: ["rgb(195, 151, 81)", "rgba(188, 161, 117, 0)"], // 0% 处的颜色
      },
    ],
  },
  grid: {
    type: Object,
  },
  data: {
    type: Object as () => string[] | number[],
    default: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  legend: {
    type: Object,
  },
})
// 处理series
function setSeries() {
  return $props.series.reduce((pre: any, cur: any) => {
    if (cur.data && cur.color) {
      pre.push({
        name: cur.name,
        type: "line",
        data: cur.data,
        smooth: true,
        // 去掉小圆点
        symbol: "none",
        // 填充的颜色
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: cur.color[0], // 0% 处的颜色
              },
              {
                offset: 1,
                color: cur.color[1], // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        lineStyle: {
          type: "solid",
          color: "white",
          width: 1,
        },
      })
    }
    return pre
  }, [])
}

const option = {
  title: $props.title,
  legend: $props.legend,
  xAxis: {
    type: "category",
    // 两侧不留白
    boundaryGap: false,
    // 分割线
    splitLine: { show: false },
    data: $props.data,
    axisLine: {
      lineStyle: {
        color: "rgb(157, 180, 244)",
      },
    },
  },
  yAxis: {
    splitLine: { show: false },
    // 轴线设置
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgb(157, 180, 244)",
      },
    },
    // 刻度
    axisTick: { show: true },
  },
  series: setSeries(),
  grid: $props.grid,
}
</script>

<style scoped lang="scss">
.charts {
  color: rgb(157, 180, 244);
  width: 100%;
  height: 100%;
}
</style>
