<template>
  <div ref="chart" class="liquidfill"></div>
</template>

<script setup lang="ts" name="liquidfill">
import { echart, ECOption } from "@/utils/ECharts"
// echarts水球图插件
import "echarts-liquidfill"
// 获取组件实例
const chart = ref()
// 范围0-1
const $props = defineProps({
  data: {
    type: Number,
    default: 0.5,
  },
})
const myCharts = ref()
onMounted(() => {
  myCharts.value = echart.init(chart.value)
  myCharts.value.setOption(<ECOption>{
    title: {
      subtext: "预约量",
      subtextStyle: {
        color: "#fff",
        fontSize: 20,
      },
      left: "center",
      top: "30%",
    },
    series: [
      {
        type: "liquidFill",
        data: [$props["data"], $props["data"] - 0.1, $props["data"] - 0.2],
        animationEasing: "linear",
        animationEasingUpdate: "linear",
        // 动画
        animationDuration: 500,
        animationDurationUpdate: 500,
        radius: "80%",
        waveLength: "80%",
        amplitude: "8%",
        color: ["rgba(64, 231, 212, 0.7)"],
        backgroundStyle: {
          color: new echart.graphic.RadialGradient(
            0.5,
            0.5,
            0.5, // 渐变圆心（相对于容器的比例坐标），半径（相对于容器的比例）
            [
              { offset: 0, color: "rgba(19,111,116,0)" }, // 渐变开始的颜色和透明度
              { offset: 1, color: "rgba(19,111,116,.7)" }, // 渐变结束的颜色和透明度
            ]
          ),
          borderWidth: 3, // 去除背景边框
          borderRadius: "50%", // 圆形背景
          borderColor: "rgba(19,111,116)",
        },
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: "none",
            borderColor: "#2FC3D8",
            borderWidth: 5,
          },
        },
        emphasis: {
          itemStyle: {
            color: "#47d7eaaf",
          },
        },
        label: {
          show: false,
        },
      },
    ],
  })
})

onBeforeUnmount(() => {
  myCharts.value.dispose()
})
</script>

<style scoped lang="scss">
.liquidfill {
  width: 100%;
  height: 100%;
}
</style>
