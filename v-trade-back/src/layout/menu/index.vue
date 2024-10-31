<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 是否展示 -->
    <template v-if="!item.meta?.hidden">
      <!-- 没有children的展示 -->
      <template v-if="!item.children">
        <el-menu-item :index="item.path">
          <!-- 根据meta的icon来生成图标 -->
          <el-icon>
            <!-- <component :is="item.meta?.icon"></component> -->
            <Icon :icon="`ep:${item.meta?.icon}`" />
          </el-icon>
          <!-- 根据meta的title生成标题 -->
          <template #title>
            <span>{{ item.meta?.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由但是只有一个子路由 -->
      <template v-if="item.children && item.children.length === 1">
        <el-menu-item :index="item.children[0].path">
          <!-- 根据meta的icon来生成图标 -->
          <el-icon>
            <!-- <component :is="item.children[0].meta.icon"></component> -->
            <Icon :icon="`ep:${item.children[0].meta.icon}`" />
          </el-icon>
          <template #title>
            <!-- 根据meta的title生成标题 -->
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
    <!-- 有子路由且个数大于一个 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <!-- 根据meta的icon来生成图标 -->
        <el-icon>
          <!-- <component :is="item.meta.icon"></component> -->
          <Icon :icon="`ep:${item.meta.icon}`" />
        </el-icon>
        <!-- 根据meta的title生成标题 -->
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 递归生成子项item -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="Menu">
import { Icon } from "@iconify/vue"
defineProps(["menuList"])
</script>

<style scoped></style>
