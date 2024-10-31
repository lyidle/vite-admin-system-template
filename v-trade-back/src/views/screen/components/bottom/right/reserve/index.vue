<template>
  <div class="contain">
    <echartsTitle title="预约渠道数据统计" />
    <echartsScatterPieQuote class="chart" />
  </div>
</template>

<script setup lang="ts" name="Reserve"></script>

<style scoped lang="scss">
.chart {
  $title-height: 35px;
  margin-top: $title-height;
  height: calc(100% - $title-height * 2);
}
</style>
