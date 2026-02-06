import { createI18n } from "vue-i18n"
import { messages, defaultLocale } from "@/shared/config/i18n"

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages,

  globalInjection: true,
})

export { i18n }
