import { RouteLocationNormalizedLoaded, Router } from "vue-router"
import { ComponentCustomProperties } from "vue"

declare module "vue-router" {
  interface RouteMeta {
    layout?: string
    requiresAuth?: boolean
    allowedRoles?: string[]
    title?: {
      name: string
      description: string
    }
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $route: RouteLocationNormalizedLoaded
    $router: Router
  }
}
