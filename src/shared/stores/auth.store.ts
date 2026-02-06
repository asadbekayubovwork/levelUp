import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { authService } from "@/shared/api"
import type { User, LoginRequest, RegisterRequest } from "@/shared/api"

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)
  const userFullName = computed(() => user.value?.fullName || "")
  const userName = computed(() => user.value?.firstName || "")
  const userLastName = computed(() => user.value?.lastName || "")
  const userRoom = computed(() => user.value?.roomName || "")
  const userRoomId = computed(() => user.value?.roomId || null)
  const userRole = computed(() => user.value?.role || null)

  // Actions
  const login = async (credentials: LoginRequest) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.login(credentials)

      if (response.success && response.data) {
        // Store tokens
        accessToken.value = response.data.accessToken
        refreshToken.value = response.data.refreshToken
        user.value = response.data.user

        // Persist tokens to localStorage
        authService.storeTokens(
          response.data.accessToken,
          response.data.refreshToken
        )

        // Fetch fresh user data from /users/me
        try {
          await fetchUserData()
        } catch (err) {
          console.error("Failed to fetch user data after login:", err)
          // Continue even if fetching user data fails, as we have basic user info from login
        }

        return response
      } else {
        throw new Error(response.message || "Login failed")
      }
    } catch (err: any) {
      error.value = err.message || "An error occurred during login"
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData: RegisterRequest) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.register(userData)

      if (response.success && response.data) {
        // Store tokens
        accessToken.value = response.data.accessToken
        refreshToken.value = response.data.refreshToken
        user.value = response.data.user

        // Persist tokens to localStorage
        authService.storeTokens(
          response.data.accessToken,
          response.data.refreshToken
        )

        return response
      } else {
        throw new Error(response.message || "Registration failed")
      }
    } catch (err: any) {
      error.value = err.message || "An error occurred during registration"
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const refreshAccessToken = async () => {
    if (!refreshToken.value) {
      throw new Error("No refresh token available")
    }

    try {
      const response = await authService.refreshToken({
        refreshToken: refreshToken.value,
      })

      if (response.success && response.data) {
        accessToken.value = response.data.accessToken
        refreshToken.value = response.data.refreshToken
        user.value = response.data.user

        authService.storeTokens(
          response.data.accessToken,
          response.data.refreshToken
        )

        return response
      } else {
        throw new Error(response.message || "Token refresh failed")
      }
    } catch (err) {
      // If refresh fails, logout the user
      logout()
      throw err
    }
  }

  const logout = () => {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    error.value = null
    authService.clearTokens()
  }

  const fetchUserData = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.getUserMe()

      if (response.success && response.data) {
        user.value = response.data
        return response
      } else {
        throw new Error(response.message || "Failed to fetch user data")
      }
    } catch (err: any) {
      error.value = err.message || "An error occurred while fetching user data"
      // If fetching user data fails, logout
      logout()
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const initializeAuth = async () => {
    const storedToken = authService.getAccessToken()
    const storedRefreshToken = authService.getRefreshToken()

    if (storedToken && storedRefreshToken) {
      accessToken.value = storedToken
      refreshToken.value = storedRefreshToken

      // Fetch user data to restore user state on page refresh
      try {
        await fetchUserData()
      } catch (err) {
        // If fetching user data fails, clear tokens
        console.error("Failed to restore user session:", err)
      }
    }
  }

  return {
    // State
    user,
    accessToken,
    refreshToken,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    userFullName,
    userRole,
    userRoom,
    userRoomId,
    userName,
    userLastName,
    // Actions
    login,
    register,
    refreshAccessToken,
    logout,
    fetchUserData,
    initializeAuth,
  }
})
