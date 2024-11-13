<template>
  <div class="container" v-if="data">
    <div class="content" v-for="(item, index) in data" :key="item.id">
      <div class="label item">
        <component
          :is="item.label.src"
          class="rank"
          :style="{ color: item.label.color, 'font-size': item.label.size }"
          v-if="item.label.src"
        ></component>
        <template v-else>
          <component
            :is="OneWave"
            class="rank"
            :style="{ color: item.label.color, 'font-size': item.label.size }"
          ></component>
        </template>
      </div>
      <div class="region item">{{ item.name }}</div>
      <div class="progress item">
        <echartsProgress
          class="main"
          :color="item.progress.color"
          :height="15"
          :num="item.progress.num"
        />
        <span class="label">{{ item.progress.num }}.00w</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Rank">
// 引入类型
import type { PropsDataType } from "@/components/RankTable/type"
import OneWave from "@/components/Icons/Mynaui/OneWaves.vue"
import TwoWave from "@/components/Icons/Mynaui/TwoWaves.vue"
import ThreeWave from "@/components/Icons/Mynaui/ThreeWaves.vue"
import FourWave from "@/components/Icons/Mynaui/FourWaves.vue"
import FiveWave from "@/components/Icons/Mynaui/FourWaves.vue"
defineProps({
  data: {
    type: Object as () => PropsDataType[],
    default: [
      {
        id: 1,
        name: "峨眉山",
        progress: {
          color: "#1683E4",
          num: 8,
        },
        label: {
          src: OneWave,
          // color: "white",
          // size: "50px",
        },
      },
      {
        id: 2,
        name: "稻城业丁",
        progress: {
          color: "#FF8071",
          num: 6,
        },
        label: {
          src: TwoWave,
          // color: "white",
        },
      },
      {
        id: 3,
        name: "九寨沟",
        progress: {
          color: "#53C5E6",
          num: 5,
        },
        label: {
          src: ThreeWave,
          // color: "white",
        },
      },
      {
        id: 4,
        name: "万里长城",
        progress: {
          color: "#FBB341",
          num: 4,
        },
        label: {
          src: FourWave,
          // color: "white",
        },
      },
      {
        id: 5,
        name: "北京故宫",
        progress: {
          color: "#8A80FA",
          num: 3,
        },
        label: {
          src: FiveWave,
          // color: "white",
        },
      },
    ],
  },
})
</script>

<style scoped lang="scss">
.container {
  & > .content {
    @include rank-layout();
    margin-top: $screen-rank-items-top;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item:first-child {
      position: relative;
      img {
        max-width: 35px;
        max-height: 35px;
      }
      & > span {
        position: absolute;
        inset: 0;
        margin: auto;
        margin-top: -5px;
      }
    }
    & > .progress {
      display: flex;
      & > .main {
        flex: 2.5;
      }
      & > .label {
        flex: 1;
      }
    }
    > .label {
      display: flex;
      > .rank {
        font-size: 30px;
        color: #b9d8fc;
      }
    }
  }
}
</style>
