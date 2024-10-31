<template>
  <div class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts" name="MainContet"></script>
<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active {
  transition: 0.3s all;
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.main-content {
  width: 100%;
  height: 100%;
  background: $base-main-bg;
}
</style>
