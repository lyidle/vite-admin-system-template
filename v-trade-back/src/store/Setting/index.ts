import type SettingState from "@/store/Setting/type"
import { get_local, set_local } from "@/utils/localStorage"
export default defineStore("SettingStore", {
  state(): SettingState {
    return {
      // 窗口刷新
      windowRefresh: false,
      // 暗夜模式
      isDark: JSON.parse(get_local("isDark")) || "false",
      // 自动折叠
      isAutoFold: JSON.parse(get_local("isAutoFold")) || "false", //document.documentElement.offsetWidth < 1000
      // 侧边栏title
      title: import.meta.env.VITE_APP_TITLE || "",
      // 侧边栏logo
      isTitle: JSON.parse(get_local("isTitle")) || "false", //logo组件是否隐藏设置
      AutoFoldWidth: 992, //自动折叠的生效尺寸 小于这个尺寸会折叠
      FloatWidth: 768, //菜单悬浮的尺寸 小于这个尺寸菜单会悬浮 还需要改 variable.scss文件的 $floatWidth 变量值 css的媒体查询不支持变量
    }
  },
  actions: {
    setDark(newV: string) {
      this.isDark = newV
      set_local("isDark", newV)
    },
    setAutoFold(newV: string) {
      this.isAutoFold = newV
      set_local("isAutoFold", newV)
    },
    setTitle(newV: string) {
      this.isTitle = newV
      set_local("isTitle", newV)
    },
  },
})
