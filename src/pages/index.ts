import type { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [

  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "AuthLayout",
      requiresAuth: false,
    },
    component: () => import("./PLogin.vue"),
  },
  {
    path: "/",
    name: "Dashboard",
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
    },
    component: () => import("./PDashboard.vue"),
  },
  {
    path: "/statistics",
    name: "Statistics",
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
    },
    component: () => import("./PStatistics.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      layout: "AuthLayout",
      requiresAuth: false,
    },
    component: () => import("./PNotFound.vue"),
  },
]

export { routes }
