<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useToast } from "@/shared/lib"
import { Loader, Eye, EyeOff } from "lucide-vue-next"
const router = useRouter()
const toast = useToast()

const login = ref("")
const password = ref("")
const showPassword = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  if (!login.value || !password.value) {
    toast.warning("Tekshirish xatosi", "Iltimos, login va parolni kiriting")
    return
  }

  try {
    if (login.value === "admin" && password.value === "admin") {
      toast.success("Tizimga muvaffaqiyatli kirdingiz", "Xush kelibsiz!")
      router.push("/")
    } else {
      toast.error("Xatolik", "Login yoki parol noto'g'ri")
    }
  } catch (err: any) {
    const errorMessage = err.message || "Kirish amalga oshmadi"
    toast.error("Xatolik", errorMessage)
  }
}

</script>

<template>
  <div class="flex min-h-screen w-full">
    <!-- Left Side -->
    <div class="hidden w-[60%] flex-col justify-center left-side px-16 text-white lg:flex relative overflow-hidden">
      <div class="relative z-10 max-w-xl">
        <h1 class="mb-4 text-5xl font-bold">GoFinance</h1>
        <p class="mb-8 text-xl font-light">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo temporibus ipsum quisquam similique ipsa in
          vero, quam libero architecto pariatur.
        </p>
      </div>
    </div>

    <!-- Right Side -->
    <div class="flex w-full flex-col justify-center bg-white px-8 lg:w-[40%] lg:px-24">
      <div class="mx-auto w-full max-w-md">
        <h2 class="mb-2 text-3xl font-bold text-gray-900">Xush kelibsiz</h2>
        <p class="mb-8 text-gray-500">
          Tizimga kirish uchun ma'lumotlaringizni kiriting
        </p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="relative">
            <input v-model="login" type="text" placeholder="Foydalanuvchi nomi" required
              class="w-full rounded-full border border-gray-200 py-3 pl-12 pr-4 text-gray-700 placeholder-gray-400 transition-colors duration-300 focus:border-blue-500 focus:outline-none" />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </span>
          </div>

          <div class="relative">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Parol"
              class="w-full rounded-full border border-gray-200 py-3 pl-12 pr-12 text-gray-700 placeholder-gray-400 transition-colors duration-300 focus:border-blue-500 focus:outline-none" />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none">
              <Eye v-if="!showPassword" :size="20" />
              <EyeOff v-else :size="20" />
            </button>
          </div>

          <button type="submit" :disabled="isLoading"
            class="w-full rounded-full bg-[#1a73e8] py-3 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            Kirish
            <Loader v-if="isLoading" :size="20" class="animate-spin" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-side {
  background:
    url("@/shared/assets/images/login-pattern.png"),
    linear-gradient(#0575e6 0%, #02298a 85%, #021b79 100%);
  background-position: left bottom;
  background-repeat: no-repeat;
}
</style>
