import useUserStore from "@/store/User"
import Vrouter from "@/router"
const $route = Vrouter.currentRoute.value
const $router = Vrouter
export default async function useReqUserInfo(fn: Function) {
  const UserStore = useUserStore()
  // 通过获取用户信息来判断是否修改了自身
  try {
    await UserStore.userInfo()
    fn()
    // 添加回到第一页
  } catch (error) {
    // 修改了自身没有权限访问这个页面
    // 退出登录
    await UserStore.userLogout()
    // 跳转到login
    $router.push({
      path: "/login",
      query: {
        redirect: $route.path,
      },
    })
  }
}
