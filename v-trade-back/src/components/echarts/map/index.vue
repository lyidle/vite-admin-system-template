<template>
  <div class="map" ref="map"></div>
</template>

<script setup lang="ts" name="Map">
import { echart, ECOption } from "@/utils/ECharts"
import chinaData from "@/components/eCharts/map/chinaData/index.json"
//获取DOM元素
const map = ref()
// 注册地图
echart.registerMap("china", chinaData as any)
// 航线起始与结束位置
const coordsData = ref<[[number, number], [number, number]][]>([
  [
    [106.713478, 26.578343], // 贵州省
    [104.065735, 30.659462], // 四川
  ],
  [
    [112.549248, 37.857014], // 山西省
    [104.065735, 30.659462], // 四川
  ],
  [
    [117.000923, 36.675807], // 山东省
    [104.065735, 30.659462], // 四川
  ],
  [
    [87.617733, 43.792818], // 山东省
    [104.065735, 30.659462], // 四川
  ],
])
// 使用函数生成路线图
function getCoords(params: [[number, number], [number, number]][]) {
  return params.reduce(
    (pre: object[], cur: [[number, number], [number, number]]) => {
      const coords = cur.map((item) => {
        return [item[0], item[1]]
      })
      pre.push({
        coords,
        // 航线样式
        lineStyle: {
          color: "white",
          width: 2,
          // 线末端样式
          cap: "round",
          // 线弯曲度
          curveness: 0.2,
        },
      })
      return pre
    },
    []
  )
}
const myCharts = ref()
onMounted(() => {
  myCharts.value = echart.init(map.value)
  myCharts.value.setOption(<ECOption>{
    geo: {
      map: "china",
      roam: true,
      zoom: 1.2, // 缩放比列
      layoutSize: "100%",
      layoutCenter: ["50%", "65%"], // 地图中心点位置
      // 文字显示
      label: {
        show: true,
        fontSize: 18,
        color: "#fff",
      },
      //每块地图的颜色
      itemStyle: {
        color: "#2D70BF",
      },
      // 悬浮样式
      emphasis: {
        itemStyle: {
          color: "#74a8e4",
        },
        label: {
          fontSize: 25,
          color: "#fff",
        },
      },
    },
    series: [
      {
        type: "lines", //航线的系列
        data: getCoords(coordsData.value),
        //开启动画特效
        effect: {
          show: true,
          period: 3,
          color: "skyblue",
          // 形状样式
          symbol: "circle",
          symbolSize: 18,
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
.map {
  color: #74a8e4;
  width: 100%;
  height: 100%;
}
</style>
