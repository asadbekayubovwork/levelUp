<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <RouterView v-slot="{ Component }">
            <Transition mode="out-in" name="layout">
              <div :key="String(detectLayout)">
                <component :is="detectLayout">
                  <Transition mode="out-in" name="page">
                    <Component :is="Component" />
                  </Transition>
                </component>
              </div>
            </Transition>
          </RouterView>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import { computed } from "vue"
import { useRoute } from "vue-router"
import {
  NNotificationProvider,
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
} from "naive-ui"
import { themeOverrides } from "./providers/naive-ui"

import { DashboardLayout, AuthLayout } from "./layouts"

const layouts = {
  DashboardLayout,
  AuthLayout,
}

const route = useRoute()

const detectLayout = computed(() => {
  const metaLayout = route.meta.layout as keyof typeof layouts
  return layouts[metaLayout]
})
</script>
