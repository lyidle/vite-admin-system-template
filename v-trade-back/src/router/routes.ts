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
        meta: { title: "首页", icon: "home-filled" },
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/screen",
    name: "Screen",
    meta: { title: "数据大屏", icon: "data-line" },
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
    meta: { title: "商品管理", icon: "goods" },
    component: () => import("@/layout/index.vue"),
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        name: "TradeMark",
        meta: { title: "品牌管理", icon: "shopping-cart-full" },
        component: () => import("@/views/product/trademark/index.vue"),
      },
      {
        path: "/product/attr",
        name: "Attr",
        meta: { title: "属性管理", icon: "chrome-filled" },
        component: () => import("@/views/product/attr/index.vue"),
      },
      {
        path: "/product/spu",
        name: "Spu",
        meta: { title: "Spu管理", icon: "calendar" },
        component: () => import("@/views/product/spu/index.vue"),
      },
      {
        path: "/product/sku",
        name: "Sku",
        meta: { title: "Sku管理", icon: "orange" },
        component: () => import("@/views/product/sku/index.vue"),
      },
    ],
  },
  {
    path: "/acl",
    name: "Acl",
    meta: { title: "权限管理", icon: "lock" },
    component: () => import("@/layout/index.vue"),
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        name: "User",
        meta: { title: "用户管理", icon: "user" },
        component: () => import("@/views/acl/user/index.vue"),
      },
      {
        path: "/acl/role",
        name: "Role",
        meta: { title: "角色管理", icon: "user-filled" },
        component: () => import("@/views/acl/role/index.vue"),
      },
      {
        path: "/acl/permission",
        name: "Permission",
        meta: { title: "菜单管理", icon: "monitor" },
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
