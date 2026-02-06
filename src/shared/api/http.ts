import { HttpError, type ApiClientConfig } from "./types"

const API_BASE_URL =
  import.meta.env.VITE_BASE_API_URL

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: any) => void
}> = []

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })

  failedQueue = []
}

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken")

  if (!refreshToken) {
    return null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error("Failed to refresh token")
    }

    const data = await response.json()

    if (data.success && data.data.accessToken) {
      // Store new tokens
      localStorage.setItem("authToken", data.data.accessToken)
      if (data.data.refreshToken) {
        localStorage.setItem("refreshToken", data.data.refreshToken)
      }
      return data.data.accessToken
    }

    return null
  } catch (error) {
    // Clear tokens and redirect to login
    localStorage.removeItem("authToken")
    localStorage.removeItem("refreshToken")
    window.location.href = "/login"
    return null
  }
}

/**
 * The core, private fetcher function.
 * It's not meant to be used directly by features.
 */
export async function http<T>(
  url: string,
  config: ApiClientConfig = {}
): Promise<T> {
  // 1. Get base URL and auth token
  const token = localStorage.getItem("authToken")

  // 2. Create headers
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    // Spread any headers from the config
    ...config.headers,
  })

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  // 3. Handle query parameters
  let fullUrl = `${API_BASE_URL}${url}`
  if (config.params) {
    const queryParams = new URLSearchParams(config.params)
    fullUrl += `?${queryParams.toString()}`
  }

  // 4. Make the request using native fetch
  const response = await fetch(fullUrl, {
    ...config,
    headers,
    // Use `data` property for the body, like Axios
    body: config.data ? JSON.stringify(config.data) : null,
  })

  // 5. Handle 401 Unauthorized - Token refresh logic
  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true

      try {
        const newToken = await refreshAccessToken()

        if (newToken) {
          processQueue()
          isRefreshing = false

          // Retry the original request with new token
          headers.set("Authorization", `Bearer ${newToken}`)
          const retryResponse = await fetch(fullUrl, {
            ...config,
            headers,
            body: config.data ? JSON.stringify(config.data) : null,
          })

          if (!retryResponse.ok && retryResponse.status !== 401) {
            const errorData = await retryResponse.json().catch(() => null)
            throw new HttpError(retryResponse, errorData)
          }

          if (retryResponse.status === 204 || retryResponse.status === 205) {
            return null as T
          }

          return retryResponse.json()
        } else {
          processQueue(new Error("Token refresh failed"))
          isRefreshing = false
          const errorData = await response.json().catch(() => null)
          throw new HttpError(response, errorData)
        }
      } catch (error) {
        processQueue(error)
        isRefreshing = false
        throw error
      }
    } else {
      // If already refreshing, queue this request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then(() => {
        // Retry with new token
        const newToken = localStorage.getItem("authToken")
        if (newToken) {
          headers.set("Authorization", `Bearer ${newToken}`)
        }
        return fetch(fullUrl, {
          ...config,
          headers,
          body: config.data ? JSON.stringify(config.data) : null,
        }).then(async (retryResponse) => {
          if (!retryResponse.ok) {
            const errorData = await retryResponse.json().catch(() => null)
            throw new HttpError(retryResponse, errorData)
          }
          if (retryResponse.status === 204 || retryResponse.status === 205) {
            return null as T
          }
          return retryResponse.json()
        })
      })
    }
  }

  // 6. Handle other errors
  if (!response.ok) {
    // If the response is not OK, throw our custom error
    // TanStack Query will catch this and put it in the `error` state
    const errorData = await response.json().catch(() => null)
    throw new HttpError(response, errorData)
  }

  // If the response is OK but has no content (e.g., DELETE request)
  if (response.status === 204 || response.status === 205) {
    return null as T
  }

  // Otherwise, parse the JSON and return it
  return response.json()
}
