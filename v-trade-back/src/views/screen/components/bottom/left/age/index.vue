<template>
  <div class="contain">
    <echartsTitle title="年龄比例" />
    <div class="chart">
      <echartsScatterPie />
    </div>
  </div>
</template>

<script setup lang="ts" name="AgeRatio"></script>

<style scoped lang="scss">
.contain {
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
