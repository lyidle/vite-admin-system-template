<template>
  <div ref="charts" class="my-chart"></div>
</template>
<script setup lang="ts" name="Echarts">
import { echart, ECOption } from "@/utils/ECharts"
const $props = defineProps({
  options: {
    type: Object as () => ECOption,
    default: null,
  },
})
const charts = ref<HTMLDivElement>()
const chart = ref()
onMounted(() => {
  initChart()
})

const initChart = () => {
  chart.value = echart.init(charts.value as HTMLDivElement)
  chart.value.setOption({
    ...$props.options,
  })
}

onBeforeUnmount(() => {
  chart.value.dispose()
})
</script>

<style lang="scss" scoped></style>
