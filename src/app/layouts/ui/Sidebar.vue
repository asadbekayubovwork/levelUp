<script setup lang="ts">
import { Box, BarChart3 } from 'lucide-vue-next'
import type { Component } from 'vue'

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
        <nav class="flex-1 p-4 overflow-y-auto bg-white rounded-r-2xl  rounded-tl-2xl gap-1 flex flex-col">
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
    </aside>
</template>
