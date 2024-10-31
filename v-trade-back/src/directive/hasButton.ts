import useUserStore from "@/store/User"
// 提示信息函数
function tip(tip: string) {
  ElMessage.info(`没有权限${tip}~`)
}
export default (app: any) => {
  const UserStore = useUserStore()
  // 全局自定义指令实现按钮权限
  app.directive("hasButton", {
    mounted(el: any, options: any) {
      const arr = options.value.split(":")
      const value = UserStore.$state.userInfo.buttons?.includes(arr[0])
      if (!value) {
        // 移除后再添加取消事件的监听
        const clone = el.cloneNode(true)
        // 禁用按钮
        clone.setAttribute("aria-disabled", "true")
        clone.classList.add("is-disabled")
        // 消息函数绑定到自身上，用于解绑
        clone.tip = arr[1]
        // 添加提示
        clone.addEventListener("click", tip.bind(null, clone.tip))
        // 替换节点
        el.parentNode.replaceChild(clone, el)
      }
    },
    beforeUnmount(el: any) {
      el.removeEventListener("click", el.tip)
    },
  })
}
