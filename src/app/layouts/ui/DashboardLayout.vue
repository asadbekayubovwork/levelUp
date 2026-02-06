<script setup lang="ts">
import Header from './Header.vue';
import Sidebar from './Sidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-[#EDEFF2] gap-3">

    <Sidebar />

    <div class="flex flex-1 flex-col overflow-hidden gap-3">
      <Header />

      <main class="flex-1 overflow-y-auto overflow-x-hidden bg-white  rounded-l-2xl">
        <slot />
      </main>
    </div>
  </div>
</template>
