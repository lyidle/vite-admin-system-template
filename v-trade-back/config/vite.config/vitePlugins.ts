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
