<template>
  <el-card>
    <el-form inline class="elForm" @submit.prevent="$emit('search')">
      <el-form-item label="用户名：" style="margin-right: 10px">
        <el-input placeholder="请输入要搜索用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="keyword ? false : true"
          @click="$emit('search')"
          >搜索</el-button
        >
        <el-button type="primary" plain @click="$emit('reset')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts" name="Search">
const keyword = defineModel("keyword")
const $emit = defineEmits(["search", "reset"])
</script>

<style scoped lang="scss">
.elForm {
  & > * {
    margin-bottom: 0;
  }
}
</style>
