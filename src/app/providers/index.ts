import type { App } from "vue"
import { pinia } from "./pinia"
import { router } from "./router"
import { i18n } from "./i18n"
import { setupNaiveUI } from "./naive-ui"
import { piniaResetPlugin } from "@/shared/plugins/piniaReset"

export function setupProviders(app: App) {
  pinia.use(piniaResetPlugin)
  app.use(pinia)
  app.use(router)
  app.use(i18n)
  setupNaiveUI(app)
}
