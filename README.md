# 配置

> [!abstract]
>
> 配置了一些常用的插件
>
> 1. `element-plus` 按需引入
> 2. `setup` 快速定义组件的名字
>    * 直接在 `script` 中使用 `name=‘componentName’` 来定义组件的名字
> 3. 按需自动导入 `vue`、`vue-router`、`pinia` 的一些方法
> 4. 支持 `iconify` 如：`ep-user`
>    * 可以直接使用 `element-plus` 的图标
>    * 自动安装 `iconify` 的图标
>    * `iconify` 集成了很多的图标可以直接使用
> 5. 按需自动注册 `components` 下的组件
>    * 按照文件名首字母大写来区分
> 6. 封装 `svgIcon`
>    * 使用 `<icons-svg name="auto"></icons-svg>` 就可以使用放到 `assets\icons\auto.svg` 图标

## vite.config.ts

```ts
// vite.config.ts
import { defineConfig, loadEnv } from "vite"
// node 进行文件相关操作
import { resolve } from "path"
import fs from "fs"
// 引入 打包相关配置
import build from "./config/vite.config/build"
// 引入 插件相关配置
import plugin from "./config/vite.config/vitePlugins"
export default defineConfig(({ mode }) => {
  // 获取到当前环境
  const env = loadEnv(mode, process.cwd())
  return {
    // 静态路径
    publicDir: "public",
    // 打包配置
    build: build,
    // 插件
    plugins: plugin,
    resolve: {
      alias: {
        // @别名
        "@": resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // scss全局变量的配置
          // javascriptEnabled: true,
          additionalData: '@use "@/styles/variable.scss" as *;',
          api: "modern-compiler",
        },
      },
    },
    // 代理跨域
    server: {
      https: {
        key: fs.readFileSync("certs/certkey.pem"),
        cert: fs.readFileSync("certs/fullchain.pem"),
      },
      proxy: {
        // 运行时的反代配置
        [env.VITE_AUTH_API]: {
          target: env.VITE_AUTH_SERVE,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_AUTH_API}`), ""),
        },
        [env.VITE_MANAGER_API]: {
          target: env.VITE_MANAGER_SERVE,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_MANAGER_API}`), ""),
        },
        // 选项写法
        "/UrlImg": {
          target: "http://39.98.123.211",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/UrlImg/, ""),
        },
        // 选项写法
        "/ImgUrl": {
          target: "http://139.198.127.41:9000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ImgUrl/, ""),
        },
      },
    },
  }
})

```

## main

```ts
import { createApp } from "vue"
import App from "@/App.vue"
// 引入路由
import router from "@/router/index"
// 引入全局路由守卫
import "@/router/permission"
import plugin from "../config/vite.config/mainPlugin"
const app = createApp(App)
// 注册路由
app.use(router)
// 注册插件
plugin(app)
app.mount("#app")

```

## config

### vitePlugins.ts

```ts
import vue from "@vitejs/plugin-vue"
// setup 扩展，用来定义组件名
import VueSetupExtend from "vite-plugin-vue-setup-extend"
// svg图标
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
// 打包分析
import { visualizer } from "rollup-plugin-visualizer"
// 自动导入
import AutoImport from "unplugin-auto-import/vite"
// 自动导入组件
import Components from "unplugin-vue-components/vite"
// 按需引入element-plus
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// element-plus样式
import ElementPlus from "unplugin-element-plus/vite"
// icon
// 自动导入icon
import Icons from "unplugin-icons/vite"
// icons解析器
import IconsResolver from "unplugin-icons/resolver"
//分析Vite插件的运行情况
import Inspect from "vite-plugin-inspect"

// 模拟数据
// mockjs -S vite-plugin-mock -D
// import { viteMockServe } from "vite-plugin-mock"

// node 进行文件相关操作
import { resolve } from "path"
export default [
  vue(),
  // svg图标
  createSvgIconsPlugin({
    // 指定要缓存的图标文件夹
    iconDirs: [resolve(process.cwd(), "src/assets/icons")],
    // 图标使用格式
    symbolId: "icon-[dir]-[name]",
  }),
  // 模拟数据
  // viteMockServe({
  //   mockPath: "/mock", // mock文件夹路径
  //   enable: command === "serve",
  // }),
  // setup name
  VueSetupExtend(),
  // 打包体积分析
  visualizer({
    // 是否自动打开
    open: false,
    filename: "visualizer.html", //分析图生成的文件名
  }),
  AutoImport({
    // 自动导入的插件
    imports: [
      // vue相关的 如ref onMounted等
      "vue",
      // 路由 如 useRoute useRouter等
      "vue-router",
      // 仓库 如 createPinia等
      "pinia",
    ],
    // 生成  auto-imports.d.ts文件
    dts: true,
    resolvers: [
      // 按需引入element-plus
      ElementPlusResolver(),
      // 自动导入图标
      IconsResolver({
        // 前缀默认是i,false就是禁用
        prefix: false,
        // ep element-plus的缩写 用于使用那些图标
        enabledCollections: ["ep"],
      }),
    ],
  }),
  // 按需引入element-plus样式
  ElementPlus({}),
  Components({
    //imports指定组件所在目录，默认为src/components
    dirs: ["src/components", "src/views", "src/layout"],
    // 生成 components.d.ts文件
    dts: true,
    resolvers: [
      // element-plus解析器
      ElementPlusResolver(),
      // 自动注册图标组件
      IconsResolver({
        prefix: false, // 默认为i,设置为false则不显示前缀
        enabledCollections: ["ep"],
        // alias: {
        //   'icon': "ep", //配置别名
        // },
      }),
    ],
    // 开启命名空间 以components下的文件为前缀
    directoryAsNamespace: true,
  }),
  // 自动安装图标
  Icons({
    autoInstall: true, // 是否自动安装对应的图标库，默认为true
    scale: 1, // 图标缩放，默认为1
    defaultStyle: "", // 图标style
    defaultClass: "", // 图标class
    compiler: "vue3", // 编译方式，可选值：'vue2', 'vue3', 'jsx'
    jsx: "react", // jsx风格：'react' or 'preact'
  }),
  // 分析组件
  Inspect(),
]

```

### build.ts

```ts
export default {
  rollupOptions: {
    // 打包时排除的目录
    external: new RegExp("/mock/*"),
    // 输出
    output: {
      // 入口文件名
      entryFileNames: "static/js/[name]-[hash].js",
      // 块文件名
      chunkFileNames: "static/js/[name]-[hash].js",
      // 手动分块
      manualChunks: {
        echarts: ["echarts"],
      },
      // 资源文件名
      assetFileNames: (assetInfo: any) => {
        // css
        if (assetInfo.name.endsWith(".css")) {
          return "static/css/[name].[hash][extname]"
        }
        // 图片
        if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
          return "static/images/[name].[hash][extname]"
        }
        // 字体
        if (/\.(ttf|woff|woff2|eot)$/.test(assetInfo.name)) {
          return "static/fonts/[name].[hash][extname]"
        }
        // 其他
        return "static/other/[name].[hash][extname]"
      },
    },
  },
}

```

### mainPlugin.ts

```ts
// svg 图标
import "virtual:svg-icons-register"
// element-plus
// import ElementPlus from "element-plus"
// element-plus样式
// import "element-plus/dist/index.css"
// import zhCn from "element-plus/es/locale/lang/zh-cn"
// element-plus切换暗夜模式
import "element-plus/theme-chalk/dark/css-vars.css"
// 引入自定义插件
// import globalComponents from "@/components"
// 引入全局样式
import "@/styles/index.scss"
// 引入仓库
import pinia from "@/store"
// 引入自定义指令
import isHasBUtton from "@/directive/hasButton"

export default function plugin(app: any) {
  // 安装仓库
  app.use(pinia)
  // // element-plus
  // app.use(ElementPlus, {
  //   locale: zhCn,
  // })
  // 自定义插件
  // app.use(globalComponents)
  // 自定义指令
  isHasBUtton(app)
}

```

# 按需引入(额外的)

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

## element-plus

> [!tip]  参照配置中的插件使用

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

