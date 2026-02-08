import { createRouter, createWebHistory } from "vue-router"
import { routes } from "@/pages"
import { useAuthStore } from "@/features/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})


export { router }
