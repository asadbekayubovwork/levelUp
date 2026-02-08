<script setup lang="ts">
import { Box, BarChart3, LogOut, Users } from 'lucide-vue-next'
import type { Component } from 'vue'
import { useRouter } from 'vue-router'
import { useDialog } from 'naive-ui'

import { useAuthStore } from '@/features/auth/model/auth.store'
import { useProductStore } from '@/entities/products/model/products.store'
import { useUserStore } from '@/entities/users'

const router = useRouter()
const dialog = useDialog()

const authStore = useAuthStore()
const productStore = useProductStore()
const userStore = useUserStore()

const logout = () => {
    dialog.warning({
        title: 'Chiqish',
        content: 'Haqiqatdan ham tizimdan chiqmoqchimisiz?',
        positiveText: 'Ha',
        negativeText: "Yo'q",
        onPositiveClick: () => {
            authStore.logout()

            productStore.$reset()
            userStore.$reset()

            router.push('/login')
        }
    })
}

interface NavItem {
    path: string
    label: string
    icon: Component
}

const navItems: NavItem[] = [
    {
        path: '/',
        label: 'Mahsulotlar',
        icon: Box
    },
    {
        path: '/users',
        label: 'Foydalanuvchilar',
        icon: Users
    },
    {
        path: '/statistics',
        label: 'Statistika',
        icon: BarChart3
    },
]
</script>

<template>
    <aside :class="[
        'fixed inset-y-0 left-0 z-50 w-[300px] transform  transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col gap-3',
    ]">
        <div class="flex h-[100px] items-center justify-center bg-white rounded-r-2xl rounded-bl-2xl">
            <router-link to="/">
                <img src="@/shared/assets/svg/logo.svg" alt="Logo" />
            </router-link>
        </div>
        <div class="flex flex-col flex-1 gap-1 overflow-y-auto bg-white rounded-r-2xl p-4 rounded-tl-2xl">
            <nav class="flex-1  gap-1 flex flex-col">
                <router-link v-for="item in navItems" :key="item.path" :to="item.path"
                    class=" flex items-center rounded-lg px-4 py-3 transition-colors duration-200" :class="[
                        $route.path === item.path
                            ? 'bg-[#EDEFF2] text-[#1F1F21]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    ]">
                    <component :is="item.icon" :size="24" class="mr-3" />
                    {{ item.label }}
                </router-link>
            </nav>

            <button @click="logout"
                class="flex items-center rounded-lg px-4 py-3 transition-colors duration-200 border hover:bg-gray-50">
                <component :is="LogOut" :size="24" class="mr-3" />
                Chiqish
            </button>
        </div>
    </aside>
</template>