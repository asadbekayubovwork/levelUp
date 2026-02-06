import type { App } from "vue"
import {
  create,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NConfigProvider,
} from "naive-ui"
import type { GlobalThemeOverrides } from "naive-ui"

const themeOverrides: GlobalThemeOverrides = {
  Notification: {
    borderRadius: "16px",
    padding: "16px 20px",
  },
}

const naive = create({
  components: [
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NConfigProvider,
  ],
})

export function setupNaiveUI(app: App) {
  app.use(naive)
}

// Export theme overrides for use in App.vue
export { themeOverrides }
