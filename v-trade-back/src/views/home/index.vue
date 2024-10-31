<template>
  <div>
    <el-card class="container">
      <div
        :style="`background-image: url(${userStore.$state.userInfo.avatar});`"
        alt=""
        class="avatar"
      />
      <div class="title">
        <h3>
          Hi,{{ getTime() }}好&nbsp;&nbsp;{{
            userStore.$state.userInfo.username
          }}
        </h3>
        <p>{{ stage }}</p>
      </div>
    </el-card>
    <div class="content-bg"></div>
  </div>
</template>

<script setup lang="ts" name="Home">
// 仓库
import useUserStore from "@/store/User"
import { getTime } from "@/utils/time"
const userStore = useUserStore()
const stage = import.meta.env.VITE_APP_TITLE
</script>

<style scoped lang="scss">
.container {
  ::v-deep(.el-card__body) {
    display: flex;
    .avatar {
      width: 100px;
      height: 100px;
      background-size: cover;
      background-position: center center;
      border-radius: 50%;
    }
    .title {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-left: 20px;
      h3 {
        font-size: 30px;
        margin-bottom: 20px;
      }
      p {
        font-size: 20px;
        color: #aaaaaa;
        font-style: italic;
      }
    }
  }
  .content-bg {
    width: 570px;
    height: 349px;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }
}
</style>
