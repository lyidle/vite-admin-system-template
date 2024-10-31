<template>
  <div style="width: 100%; height: 100%">
    <svg
      :style="{
        width,
        height,
        'max-width': $props['maxWidth'],
        'max-height': $props['maxHeight'],
        'min-height': $props['minHeight'],
        'min-width': $props['minWidth'],
      }"
    >
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts" name="SvgIcon">
const $props = defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  //svg矢量图的名字
  name: String,
  //svg图标的颜色
  color: {
    type: String,
    default: "",
  },
  //svg宽度
  width: {
    type: String,
    default: "16px",
  },
  //svg高度
  height: {
    type: String,
    default: "16px",
  },
  maxWidth: {
    type: String,
  },
  maxHeight: {
    type: String,
  },
  minWidth: {
    type: String,
  },
  minHeight: {
    type: String,
  },
})
</script>
<style scoped></style>
