<template>
  <echarts class="scatterPie" :options="options"></echarts>
</template>

<script setup lang="ts" name="ScatterPie">
const options = {
  title: {
    text: "本日总数",
    textStyle: {
      color: "#ccc",
      fontSize: 18,
      fontWeight: "lighter",
    },
    left: "center",
    top: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    right: "right",
    orient: "vertical",
    textStyle: {
      color: "#fff",
      fontSize: 20,
    },
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderWidth: 2,
      },
      label: {
        position: "inside",
        color: "#fff",
        fontSize: 15,
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "军事" },
        { value: 735, name: "直播" },
        { value: 580, name: "娱乐" },
        { value: 484, name: "财经" },
      ],
    },
  ],
  grid: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}
</script>

<style scoped lang="scss">
.scatterPie {
  width: 100%;
  height: 100%;
}
</style>
