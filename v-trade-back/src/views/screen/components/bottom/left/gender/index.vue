<template>
  <div class="contain">
    <echartsTitle title="男女比例" />
    <div class="content">
      <div class="gender">
        <div class="male">
          <span>男士</span>
          <img src="@/views/screen/images/man.png" alt="" />
        </div>
        <div class="female">
          <span>女士</span>
          <img src="@/views/screen/images/woman.png" alt="" />
        </div>
      </div>
      <div class="ratio">
        <p>男士58%</p>
        <p>女士42%</p>
      </div>
      <div class="chart">
        <echartsVersus />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="GenderRatio"></script>

<style scoped lang="scss">
.contain {
  .content {
    display: flex;
    flex-direction: column;
    @mixin center {
      display: flex;
      width: 60%;
      justify-content: space-between;
      margin: auto;
    }
    .gender {
      @include center();
      margin-top: 50px;
      .male,
      .female {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        span {
          position: absolute;
          top: 1px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
        }
      }
      .male {
        width: 115px;
        height: 115px;
        margin-right: 20px;
        @include bg-size("@/views/screen/images/man-bg.png", 100% 100%);
      }
      .female {
        width: 115px;
        height: 115px;
        @include bg-size("@/views/screen/images/woman-bg.png", 100% 100%);
      }
    }
    .ratio {
      @include center();
      color: #fff;
      margin-top: 10px;
    }
    .chart {
      width: 60%;
      height: 40px;
      margin: auto;
      margin-top: 10px;
    }
  }
}
</style>
