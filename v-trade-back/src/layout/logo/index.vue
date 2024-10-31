<template>
  <div class="logo" :class="{ isHidden: isTitle }">
    <img :src="logo" alt="" />
    <p>{{ SettingStore.title }}</p>
  </div>
</template>

<script setup lang="ts" name="Logo">
const logo = import.meta.env.VITE_LOGO
import useSettingStore from "@/store/Setting"
const SettingStore = useSettingStore()
const isTitle = ref<boolean>(!JSON.parse(SettingStore.isTitle))
watch(
  () => SettingStore.isTitle,
  () => {
    isTitle.value = !JSON.parse(SettingStore.isTitle)
  }
)
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  margin: 10px;
  transition: $base-menu-title-during;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-menu-logo-font-size;
    margin-left: 10px;
  }
  &.isHidden {
    height: 0;
    overflow: hidden;
  }
}
</style>
