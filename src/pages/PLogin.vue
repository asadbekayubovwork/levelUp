<script setup lang="ts">
import { LoginBanner, LoginForm } from '@/features/auth';
import { useHead } from '@vueuse/head';


useHead({
  title: 'GoFinance',
})

</script>

<template>
  <div class="flex min-h-screen w-full">
    <LoginBanner />

    <div class="flex w-full flex-col justify-center bg-white px-8 lg:w-[40%] lg:px-24">
      <LoginForm />
    </div>
  </div>
</template>
