# 配置

> [!abstract]
>
> 配置了一些常用的插件
>
> 1. `element-plus` 按需引入
> 2. `setup` 快速定义组件的名字
>    * 直接在 `script` 中使用 `name=‘componentName’` 来定义组件的名字
> 3. 按需自动导入 `vue`、`vue-router`、`pinia` 的一些方法
> 4. 使用 `iconify` 与 `unocss` 实现使用 `class` 使用图标：`class="i-ep-user"`
>    * 可以直接使用 `element-plus` 的图标
>    * `iconify` 集成了很多的图标可以直接使用
> 5. 按需自动注册 `components` 下的组件
>    * 按照文件名首字母大写来区分
> 6. ~~封装 `svgIcon`~~
>    * ~~使用 `<icons-svg name="auto"></icons-svg>` 就可以使用放到 `assets\icons\auto.svg` 图标~~

# 按需引入

## echarts按需引入

> [!example]  定义类型

```ts
import * as echarts from "echarts/core"
import {
  BarChart,
  LineChart,
  MapChart,
  LinesChart,
  PieChart,
} from "echarts/charts"
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendComponent,
} from "echarts/components"
import { LabelLayout, UniversalTransition } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from "echarts/charts"
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from "echarts/components"
import type { ComposeOption } from "echarts/core"

// echarts水球图插件
// import "echarts-liquidfill"

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  LinesChart,
])

// const option: ECOption = {
//   // ...
// }
export const echart = echarts

```

> [!example]  使用

```ts
<template>
  <div ref="charts" class="my-chart"></div>
</template>
<script setup lang="ts" name="Echarts">
import { echart, ECOption } from "@/utils/ECharts"
const $props = defineProps({
  options: {
    type: Object as () => ECOption,
    default: null,
  },
})
const charts = ref<HTMLDivElement>()
const chart = ref()
onMounted(() => {
  initChart()
})

const initChart = () => {
  chart.value = echart.init(charts.value as HTMLDivElement)
  chart.value.setOption({
    ...$props.options,
  })
}

onBeforeUnmount(() => {
  chart.value.dispose()
})
</script>

<style lang="scss" scoped></style>

```

> [!tip]  在需要的地方传递值 `options` 就行了
>
> 遇到报错的，根据提示加上类型声明

# 封装

## 请求

### axios封装

```ts
import axios from "axios"
import { GET_TOKEN } from "@/utils/token"
// 第一步：利用axios对象的create方法，去创建axios实例（其他的配置：基础路径、超时的时间）
const request = axios.create({
  timeout: 5000,
})
// 第二步：req实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  //config配置对象，headers属性请求头，经常给服务器端携带公共参数
  const token = GET_TOKEN("TOKEN") || undefined
  // 存在token 就携带token发起信息
  if (token) {
    config.headers.token = token
  }
  //返回配置对象
  return config
})
request.interceptors.response.use(
  (response) => {
    // 简化数据 直接得到data
    // 还可以判断一下返回码是否正确，不正确进一步的阻止，并提示等
    return response.data
  },
  (error) => {
    // 错误信息
    let message = ""
    // 状态码
    const status = error.status
    // 根据状态码返回信息
    switch (status) {
      case 401:
        message = "TOKEN过期"
        break
      case 403:
        message = "没有权限访问"
        break
      case 404:
        message = "请求地址错误"
        break

      case 500:
        message = "服务器出现问题"
        break
      default:
        message = "网络出现问题"
        break
    }
    // 错误提示信息
    ElMessage({
      type: "error",
      message,
    })
    return Promise.reject(new Error(error.message || "Error"))
  }
)
// 对外暴露
export default request

```

## 常用方法

### 防抖

```ts
//防抖实现
export default function debounce(fn: Function, delay: number) {
  let timer: any = null
  return function (this: any) {
    const _this = this
    const args = arguments
    // 有就去除
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, delay)
    return undefined
  }
}

```

### 节流

```ts
//节流实现
export default function throttle(fn: Function, delay: number) {
  let timer: any = null
  return function (this: any) {
    const _this = this
    const args = arguments
    // 没有就进入
    if (!timer) {
      fn.apply(_this, args)
      timer = setTimeout(() => {
        timer = null //超过时间间隔把状态位timer设为有效
      }, delay)
      return undefined
    }
  }
}

```

## 时间

### 简单的早中晚判断

```ts
export function getTime() {
  let message = ""
  const hour = new Date().getHours()
  if (hour <= 9) message = "早上"
  else if (hour < 12) message = "上午"
  else if (hour === 12) message = "中午"
  else if (hour <= 18) message = "下午"
  else message = "晚上"
  return message
}

```

### moment中文化

```ts
import moment from "moment"
moment.locale("zh-cn", {
  months:
    "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
      "_"
    ),
  monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
  weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
  weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
  weekdaysMin: "日_一_二_三_四_五_六".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY/MM/DD",
    LL: "YYYY年M月D日",
    LLL: "YYYY年M月D日Ah点mm分",
    LLLL: "YYYY年M月D日ddddAh点mm分",
    l: "YYYY/M/D",
    ll: "YYYY年M月D日",
    lll: "YYYY年M月D日 HH:mm",
    llll: "YYYY年M月D日dddd HH:mm",
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour: any, meridiem: any) {
    if (hour === 12) {
      hour = 0
    }
    if (meridiem === "凌晨" || meridiem === "早上" || meridiem === "上午") {
      return hour
    } else if (meridiem === "下午" || meridiem === "晚上") {
      return hour + 12
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12
    }
  },
  meridiem: function (hour, minute, isLower) {
    var hm = hour * 100 + minute
    if (hm < 600) {
      return "凌晨"
    } else if (hm < 900) {
      return "早上"
    } else if (hm < 1130) {
      return "上午"
    } else if (hm < 1230) {
      return "中午"
    } else if (hm < 1800) {
      return "下午"
    } else {
      return "晚上"
    }
  },
  calendar: {
    sameDay: "[今天]LT",
    nextDay: "[明天]LT",
    nextWeek: function (this: any, now: any) {
      if (now.week() !== this.week()) {
        return "[下]dddLT"
      } else {
        return "[本]dddLT"
      }
    },
    lastDay: "[昨天]LT",
    lastWeek: function (this: any, now: any) {
      if (this.week() !== now.week()) {
        return "[上]dddLT"
      } else {
        return "[本]dddLT"
      }
    },
    sameElse: "L",
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  // @ts-ignore
  ordinal: function (number, period) {
    switch (period) {
      case "d":
      case "D":
      case "DDD":
        return number + "日"
      case "M":
        return number + "月"
      case "w":
      case "W":
        return number + "周"
      default:
        return number
    }
  },
  relativeTime: {
    future: "%s后",
    past: "%s前",
    s: "几秒",
    ss: "%d 秒",
    m: "1 分钟",
    mm: "%d 分钟",
    h: "1 小时",
    hh: "%d 小时",
    d: "1 天",
    dd: "%d 天",
    w: "1 周",
    ww: "%d 周",
    M: "1 个月",
    MM: "%d 个月",
    y: "1 年",
    yy: "%d 年",
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
})
export default moment

```

> [!quote]
>
> [时间格式](https://momentjs.cn/)
>
> [参考](https://blog.csdn.net/weixin_43272781/article/details/105413617)

## 本地存储

### localStorage

```ts
export const set_local = (tokenName: string, token: string) => {
  localStorage.setItem(tokenName, token)
}
export const get_local = (tokenName: string) => {
  return localStorage.getItem(tokenName) as string
}
export const remove_local = (tokenName: string) => {
  localStorage.removeItem(tokenName)
}
```

## 组件库

### element-plus

#### beforeUpload

```ts
import type { UploadProps } from "element-plus"
export default function useElUpload() {
  // 上传图片之前触发的钩子函数
  const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
    if (
      rawFile.type === "image/png" ||
      rawFile.type === "image/jpeg" ||
      rawFile.type === "image/gif"
    ) {
      if (rawFile.size / 1024 / 1024 < 4) {
        return true
      } else {
        ElMessage.error("上传文件大小需要小于4M~")
        return false
      }
    } else {
      ElMessage.error("上传文件格式需要是PNG|JPG|GIF~")
      return false
    }
  }
  return {
    beforeUpload,
  }
}

```

