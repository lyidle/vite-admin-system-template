<template>
  <div ref="charts" class="charts"></div>
</template>

<script setup lang="ts" name="ScatterPie">
import { echart, ECOption } from "@/utils/ECharts"
const charts = ref()
function Pie() {
  let dataArr = []
  for (var i = 0; i < 150; i++) {
    if (i % 3 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 10,
        itemStyle: {
          color: "#fff",
          borderWidth: 0,
          borderColor: "rgba(0,0,0,0)",
        },
      })
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 25,
        itemStyle: {
          color: "rgba(0,0,0,0)",
          borderWidth: 0,
          borderColor: "rgba(0,0,0,0)",
        },
      })
    }
  }
  return dataArr
}
const myCharts = ref()
onMounted(() => {
  myCharts.value = echart.init(charts.value)
  const option: ECOption = {
    backgroundColor: "#031845",
    tooltip: {
      trigger: "item",
      formatter: "{b} : {d}% <br/> {c}",
    },
    legend: {
      orient: "vertical",
      icon: "circle",
      top: 25,
      left: 30,
      textStyle: {
        color: "#fff",
      },
      data: ["test1", "test2", "test3", "test4"],
    },
    series: [
      // 从外到里
      {
        type: "pie",
        radius: ["77%", "80%"],
        center: ["60%", "40%"],
        color: [
          "blue",
          "transparent",
          "blue",
          "transparent",
          "blue",
          "transparent",
        ],
        data: [
          {
            value: 17,
            name: "11",
          },
          {
            value: 17,
            name: "22",
          },
          {
            value: 17,
            name: "33",
          },
          {
            value: 17,
            name: "44",
          },
          {
            value: 17,
            name: "55",
          },
          {
            value: 17,
            name: "66",
          },
        ],

        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
      },
      {
        type: "pie",
        radius: ["50%", "70%"],
        center: ["60%", "40%"],
        color: [
          "#0E7CE2",
          "#FF8352",
          "#E271DE",
          "#F8456B",
          "#00FFFF",
          "#4AEAB0",
        ],
        itemStyle: {
          borderColor: "#031845",
          borderWidth: 10,
        },
        data: [
          {
            value: 335,
            name: "test1",
          },
          {
            value: 310,
            name: "test2",
          },
          {
            value: 234,
            name: "test3",
          },
          {
            value: 235,
            name: "test4",
          },
        ],
        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
      },
      {
        type: "pie",
        zlevel: 0,
        silent: true,
        radius: ["43%", "45%"],
        center: ["60%", "40%"],
        z: 10,
        startAngle: 90,
        label: {
          show: false,
        },
        color: ["red", "blue", "red", "blue"],

        labelLine: {
          show: false,
        },

        data: [
          {
            name: "r1",
            value: 25,
            itemStyle: {
              color: new echart.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(51,149,191,0.5)",
                },
                {
                  offset: 1,
                  color: "rgba(51,149,191,0)",
                },
              ]),
            },
          },
          {
            name: "r2",
            value: 25,
            itemStyle: {
              color: new echart.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(0,0,0,0)",
                },
                {
                  offset: 1,
                  color: "rgba(51,149,191,0.5)",
                },
              ]),
            },
          },
          {
            name: "r3",
            value: 25,
            itemStyle: {
              color: new echart.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(51,149,191,0)",
                },
                {
                  offset: 1,
                  color: "rgba(51,149,191,0.5)",
                },
              ]),
            },
          },
          {
            name: "r4",
            value: 25,
            itemStyle: {
              color: new echart.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(51,149,191,0.5)",
                },
                {
                  offset: 1,
                  color: "rgba(0,0,0,0)",
                },
              ]),
            },
          },
        ],
      },
      {
        type: "pie",
        zlevel: 0,
        silent: true,
        radius: ["33%", "35%"],
        center: ["60%", "40%"],
        z: 10,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: Pie(),
      },
      {
        type: "pie",
        radius: [0, "16%"],
        center: ["60%", "40%"],
        startAngle: 90,
        data: [
          {
            value: 25,
            name: "1",
            itemStyle: {
              color: "transparent",
              borderWidth: 4,
              borderColor: "#ffffff",
            },
          },

          {
            value: 75,
            name: "2",
            itemStyle: {
              color: "transparent",
            },
          },
        ],
        selectedOffset: 10,

        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
      },
      {
        type: "pie",
        radius: ["12%", "14%"],
        center: ["60%", "40%"],
        color: ["#ffffff", "red"],
        startAngle: 105,
        data: [
          {
            value: 30,
            name: "",
            itemStyle: {
              color: "transparent",
            },
          },
          {
            value: 5,
            name: "",
            itemStyle: {
              color: "transparent",
            },
          },
          {
            value: 65,
            name: "ddd",
            itemStyle: {
              color: "#ffffff",
            },
          },
        ],
        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
      },
    ],
  }
  myCharts.value.setOption(option)
})
onBeforeUnmount(() => {
  myCharts.value.dispose()
})
</script>

<style scoped lang="scss">
.charts {
  width: 100%;
  height: 100%;
}
</style>
