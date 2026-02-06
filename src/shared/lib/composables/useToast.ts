import { useNotification } from "naive-ui"

/**
 * Composable for showing toast notifications
 * Uses Naive UI's notification system
 */
export function useToast() {
  const notification = useNotification()

  return {
    /**
     * Show success notification
     */
    success: (
      title: string,
      content?: string,
      duration: number = 3000
    ): void => {
      notification.success({
        title,
        content,
        duration,
      })
    },

    /**
     * Show error notification
     */
    error: (title: string, content?: string, duration: number = 4000): void => {
      notification.error({
        title,
        content,
        duration,
      })
    },

    /**
     * Show warning notification
     */
    warning: (
      title: string,
      content?: string,
      duration: number = 3000
    ): void => {
      notification.warning({
        title,
        content,
        duration,
      })
    },

    /**
     * Show info notification
     */
    info: (title: string, content?: string, duration: number = 3000): void => {
      notification.info({
        title,
        content,
        duration,
      })
    },

    /**
     * Get the raw notification API
     */
    notification,
  }
}
