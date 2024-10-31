import type SettingState from "@/store/Setting/type"
import { GET_TOKEN, SET_TOKEN } from "@/utils/token"
export default defineStore("SettingStore", {
  state(): SettingState {
    return {
      // 窗口刷新
      windowRefresh: false,
      // 暗夜模式
      isDark: JSON.parse(GET_TOKEN("isDark")) || "false",
      // 自动折叠
      isAutoFold: JSON.parse(GET_TOKEN("isAutoFold")) || "false", //document.documentElement.offsetWidth < 1000
      // 侧边栏title
      title: import.meta.env.VITE_APP_TITLE || "",
      // 侧边栏logo
      isTitle: JSON.parse(GET_TOKEN("isTitle")) || "false", //logo组件是否隐藏设置
      AutoFoldWidth: 992, //自动折叠的生效尺寸 小于这个尺寸会折叠
      FloatWidth: 768, //菜单悬浮的尺寸 小于这个尺寸菜单会悬浮 还需要改 variable.scss文件的 $floatWidth 变量值 css的媒体查询不支持变量
    }
  },
  actions: {
    setDark(newV: string) {
      this.isDark = newV
      SET_TOKEN("isDark", newV)
    },
    setAutoFold(newV: string) {
      this.isAutoFold = newV
      SET_TOKEN("isAutoFold", newV)
    },
    setTitle(newV: string) {
      this.isTitle = newV
      SET_TOKEN("isTitle", newV)
    },
  },
})
