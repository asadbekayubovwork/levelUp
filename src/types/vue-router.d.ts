import { RouteLocationNormalizedLoaded, Router } from "vue-router"
import { ComponentCustomProperties } from "vue"

declare module "vue-router" {
  interface RouteMeta {
    layout?: string
    requiresAuth?: boolean
    allowedRoles?: string[] // Array of role shortNames that can access this route
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $route: RouteLocationNormalizedLoaded
    $router: Router
  }
}
