// 引入用户相关仓库
import useUserStore from "@/store/User"
// 进度条
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { GET_TOKEN } from "@/utils/token"
import router from "@/router"
NProgress.configure({
  easing: "ease", // 动画方式，和css动画属性一样（默认：ease）
  speed: 500, // 递增进度条的速度，单位ms（默认： 200）
  showSpinner: false, // 是否显示加载ico
  trickle: true, //是否自动递增
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比，0-1（默认：0.08）
  parent: "body", //指定此选项以更改父容器（默认：body）
})
// 过滤出菜单的路由路径
function filterAuthRoute(menuRoutes: any) {
  return menuRoutes.reduce((pre: any, cur: any) => {
    if (cur.path) pre.push(cur.path)
    if (cur.children) {
      pre.push(...filterAuthRoute(cur.children))
    }
    return pre
  }, [])
}
router.beforeEach(async (to: any, from: any, next: any) => {
  // 获取用户信息
  const userStore = useUserStore()
  // 有title就有 没有则置空
  let title = to.meta.title || "‎"
  // VITE_APP_TITLE_SHOW为 true
  // 且VITE_APP_TITLE有值拼接标题
  if (title) {
    if (
      JSON.parse(import.meta.env.VITE_APP_TITLE_SHOW.trim()) &&
      import.meta.env.VITE_APP_TITLE.trim()
    ) {
      title = to.meta.title
        ? import.meta.env.VITE_APP_TITLE + "-" + to.meta.title
        : import.meta.env.VITE_APP_TITLE
    }
    // 异步路由会导致开始时没有会重定向到404,所以需要判断一下
    if (to.meta.title !== "404") document.title = title
  }
  NProgress.start()
  // 判断token存在与否
  if (GET_TOKEN("TOKEN")) {
    // 有token
    // 禁止去login
    if (to.path === "/login") {
      return next("/")
    }
    // 判断有无用户信息
    if (JSON.stringify(userStore.$state.userInfo) !== "{}") {
      // 有放行
      // 不需要操作 因为一开始都要通过token获取信息 然后展示menu菜单
      // 有用户信息后也只能点菜单的地方
      return next()
    } else {
      // 没有 获取信息 放行
      try {
        await userStore.userInfo()
        // 开启过滤的情况
        // #region
        // 通过地址栏访问 通过token获取信息 一开始没有信息
        // 刷新时异步路由重定向到404,这是因为开始的时候异步路由没有加载完
        // 使用函数递归出 userStore中的 menuRoutes 的所有path
        const result: any = filterAuthRoute(
          JSON.parse(JSON.stringify(userStore.$state.menuRoutes))
        )
        // 判断是否通过白名单
        const flag =
          to.name == "404" && result.includes(to.redirectedFrom?.path)
        // 通过白名单
        if (flag) {
          // 设置标题
          document.title = to.redirectedFrom.meta.title
          // 重定向
          return next({
            path: to.redirectedFrom.path,
            query: to.redirectedFrom.query,
            replace: true,
          })
        }
        // else if (!flag) {
        //   // 没通过白名单 不需要操作的化 直接到404页面
        // }
        // #endregion
        document.title = title
        return next()
      } catch (error) {
        // token 过期 退出登录
        await userStore.userLogout()
        return next({ path: "/login", query: { redirect: to.path } })
      }
    }
  } else {
    // 没token
    // 去的首页放行
    if (to.path === "/login") {
      return next()
    } else {
      // 否则加query
      return next({
        path: "/login",
        query: { redirect: to.path },
      })
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
