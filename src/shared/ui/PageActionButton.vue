<script setup lang="ts">
import { type Component } from 'vue';
import { NButton } from 'naive-ui';

defineProps<{
    label?: string;
    icon?: Component;
}>();

const emit = defineEmits<{
    (e: 'click'): void;
}>();
</script>

<template>
    <NButton type="success" class="h-11 rounded-xl w-[200px] !border-none" @click="emit('click')">
        <template #icon v-if="icon">
            <component :is="icon" :size="20" color="#fff" />
        </template>
        <slot>{{ label }}</slot>
    </NButton>
</template>
