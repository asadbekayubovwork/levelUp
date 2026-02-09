<script setup lang="ts">
import { NInput } from 'naive-ui';
import PageActionButton from '@/shared/ui/PageActionButton.vue';
import { Search, Plus } from 'lucide-vue-next';

defineProps<{
    searchQuery: string;
}>();

const emit = defineEmits<{
    (e: 'update:searchQuery', value: string): void;
    (e: 'add'): void;
}>();

const handleUpdateValue = (value: string) => {
    emit('update:searchQuery', value);
};
</script>

<template>
    <div class="flex flex-col justify-between sticky top-0 z-10 !bg-white py-4">
        <div class="flex justify-between mb-2">
            <NInput :value="searchQuery" @update:value="handleUpdateValue" placeholder="Foydalanuvchilarni qidirish..."
                v-focus-input class="h-11 rounded-xl !w-80 bg-[#EDEFF2]" clearable>
                <template #prefix>
                    <Search :size="20" color="#A8AEB5" />
                </template>
            </NInput>
            <PageActionButton :icon="Plus" label="Foydalanuvchi qo'shish" @click="emit('add')" />
        </div>
    </div>
</template>
