<template>
  <div class="title">
    <div class="left" v-if="title">
      <p class="title">{{ title }}</p>
      <p class="underline"></p>
    </div>
    <p class="right"><slot name="detail"></slot></p>
  </div>
</template>

<script setup lang="ts" name="ScreenTitle">
defineProps(["title"])
</script>

<style scoped lang="scss">
.title {
  $padding: 10px;
  $height: 35px;
  display: flex;
  justify-content: space-between;
  height: $height;
  .left {
    height: $height;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .title {
      color: #47d7eaaf;
      color: #fff;
      font-size: 20px;
    }
    .underline {
      width: 68px;
      height: 7px;
      @include bg-size("@/views/screen/images/dataScreen-title.png", 100% 100%);
    }
  }
  .right {
    color: #fff;
    margin-top: 20px;
    ::v-deep(span) {
      color: orange;
      margin: 0 10px;
    }
  }
}
</style>
