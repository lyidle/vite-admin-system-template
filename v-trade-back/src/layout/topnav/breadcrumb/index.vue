<template>
  <el-breadcrumb :separator-icon="EpArrowRight">
    <!-- 动态展示路由 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="vertical-align: middle">
        <Icon :icon="`ep:${item.meta?.icon}`" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup name="BreadCrumb">
import { Icon } from "@iconify/vue"
import EpArrowRight from "@/components/Icons/Ep/ArrowRight.vue"
</script>
<style scoped lang="scss"></style>
