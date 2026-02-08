<script setup lang="ts">
import { h } from 'vue';
import { NDataTable, NSpace, NButton, NPopconfirm } from 'naive-ui';
import { Edit, Trash } from 'lucide-vue-next';
import type { User } from '@/entities/users/api/types';

const props = defineProps<{
    users: User[];
    loading: boolean;
}>();

const emit = defineEmits<{
    (e: 'edit', user: User): void;
    (e: 'delete', id: number): void;
}>();

const handleEdit = (user: User) => {
    emit('edit', user);
};

const handleDelete = (id: number) => {
    emit('delete', id);
};

const columns = [
    { title: 'ID', key: 'id', width: 60 },
    { title: 'First Name', key: 'firstName' },
    { title: 'Last Name', key: 'lastName' },
    { title: 'Age', key: 'age', width: 60 },
    { title: 'Email', key: 'email' },
    {
        title: 'Actions',
        key: 'actions',
        render(row: User) {
            return h(NSpace, {}, {
                default: () => [
                    h(NButton, {
                        size: 'small',
                        onClick: () => handleEdit(row)
                    }, { icon: () => h(Edit, { size: 16 }) }),
                    h(NPopconfirm, {
                        onPositiveClick: () => handleDelete(row.id),
                        positiveText: 'Ha',
                        negativeText: 'Yo\'q'
                    }, {
                        trigger: () => h(NButton, {
                            size: 'small',
                            type: 'error'
                        }, { icon: () => h(Trash, { size: 16 }) }),
                        default: () => 'Haqiqatan ham o\'chirmoqchimisiz?'
                    })
                ]
            });
        }
    }
];

</script>

<template>
    <NDataTable remote :columns="columns" :data="users" :loading="loading" :row-key="(row) => row.id"
        class="rounded-lg border border-gray-100" />
</template>
