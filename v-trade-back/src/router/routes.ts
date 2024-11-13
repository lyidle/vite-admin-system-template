// @unocss-include
const icons = [
  "i-ep-home-filled",
  "i-ep-data-line",
  "i-ep-goods",
  "i-ep-shopping-cart-full",
  "i-ep-chrome-filled",
  "i-ep-calendar",
  "i-ep-orange",
  "i-ep-lock",
  "i-ep-user",
  "i-ep-user-filled",
  "i-ep-monitor",
] as const
// 常量路由
export const constantRoute = [
  {
    path: "/login",
    meta: { title: "登录页", hidden: true },
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        meta: { title: "首页", icon: icons[0] },
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/screen",
    name: "Screen",
    meta: { title: "数据大屏", icon: icons[1] },
    component: () => import("@/views/screen/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    meta: { hidden: true, title: "404" },
    component: () => import("@/views/404/index.vue"),
  },
]
// 异步路由 需要权限判断的
export const asyncRoute = [
  {
    path: "/product",
    name: "Product",
    meta: { title: "商品管理", icon: icons[2] },
    component: () => import("@/layout/index.vue"),
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        name: "TradeMark",
        meta: { title: "品牌管理", icon: icons[3] },
        component: () => import("@/views/product/trademark/index.vue"),
      },
      {
        path: "/product/attr",
        name: "Attr",
        meta: { title: "属性管理", icon: icons[4] },
        component: () => import("@/views/product/attr/index.vue"),
      },
      {
        path: "/product/spu",
        name: "Spu",
        meta: { title: "Spu管理", icon: icons[5] },
        component: () => import("@/views/product/spu/index.vue"),
      },
      {
        path: "/product/sku",
        name: "Sku",
        meta: { title: "Sku管理", icon: icons[6] },
        component: () => import("@/views/product/sku/index.vue"),
      },
    ],
  },
  {
    path: "/acl",
    name: "Acl",
    meta: { title: "权限管理", icon: icons[7] },
    component: () => import("@/layout/index.vue"),
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        name: "User",
        meta: { title: "用户管理", icon: icons[8] },
        component: () => import("@/views/acl/user/index.vue"),
      },
      {
        path: "/acl/role",
        name: "Role",
        meta: { title: "角色管理", icon: icons[9] },
        component: () => import("@/views/acl/role/index.vue"),
      },
      {
        path: "/acl/permission",
        name: "Permission",
        meta: { title: "菜单管理", icon: icons[10] },
        component: () => import("@/views/acl/permission/index.vue"),
      },
    ],
  },
]
// 任意路由
export const anyRoute = [
  {
    path: "/:pathMatch(.*)*",
    meta: { hidden: true },
    redirect: "/404",
  },
]
