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
      title: {
        name: "Mahsulotlar",
        description: "Barcha mahsulotlarni ko'rish va boshqarish"
      }
    },
    component: () => import("./PDashboard.vue"),
  },
  {
    path: "/statistics",
    name: "Statistics",
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      title: {
        name: "Statistika",
        description: "Mahsulotlar narxlari statistikani ko'rish"
      }
    },
    component: () => import("./PStatistics.vue"),
  },
  {
    path: "/users",
    name: "Users",
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      title: {
        name: "Foydalanuvchilar",
        description: "Barcha foydalanuvchilarni ko'rish va boshqarish"
      }
    },
    component: () => import("./PUsers.vue"),
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
