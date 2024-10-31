<template>
  <div class="contain">
    <echartsTitle title="实时游客统计" class="title">
      <template #detail>
        可预约总量
        <span>{{ total }}</span>
        人
      </template>
    </echartsTitle>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
      <span>人</span>
    </div>
    <div class="chart"><echartsLiquidfill /></div>
  </div>
</template>

<script setup lang="ts" name="TouristRatio">
const people = ref("215908")
const total = ref("9999999")
</script>

<style scoped lang="scss">
.contain {
  $padding: 10px;
  padding: $padding;
  .title {
    margin-left: -$padding;
  }
  .number {
    display: flex;
    margin-top: 30px;
    span {
      $height: 40px;
      @include bg-size("@/views/screen/images/total.png", 100% 100%);
      color: #fff;
      flex: 1;
      height: $height;
      text-align: center;
      line-height: $height;
      font-size: 30px;
      color: #29fcff;
    }
  }
  .chart {
    width: 100%;
    height: 200px;
    margin-top: 10px;
  }
}
</style>
