<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useUserStore } from '@/entities/users';
import { storeToRefs } from 'pinia';
import { useDebounce, useToast } from '@/shared/lib';
import type { User, CreateUserDto } from '@/entities/users/api/types';

const UserHeader = defineAsyncComponent(() => import('@/features/manage-users/ui/UserHeader.vue'));
const UserList = defineAsyncComponent(() => import('@/entities/users/ui/UserList.vue'));
const UserFormModal = defineAsyncComponent(() => import('@/features/manage-users/ui/UserFormModal.vue'));

const store = useUserStore();
const { users, loading, searchQuery, submitting } = storeToRefs(store);

const toast = useToast();
const showModal = ref(false);
const modalMode = ref<'add' | 'edit'>('add');
const selectedUser = ref<User | null>(null);

store.$onAction(({ name, after, onError }) => {
    const successMessages: Record<string, string> = {
        addUser: "Foydalanuvchi muvaffaqiyatli qo'shildi",
        updateUser: "Foydalanuvchi muvaffaqiyatli yangilandi",
        deleteUser: "Foydalanuvchi o'chirildi"
    };

    const errorMessages: Record<string, string> = {
        addUser: "Qo'shishda xatolik yuz berdi",
        updateUser: "Yangilashda xatolik yuz berdi",
        deleteUser: "O'chirishda xatolik yuz berdi"
    };

    after(() => {
        if (successMessages[name]) {
            toast.success('Muvaffaqiyatli', successMessages[name]);
        }

        if (name === 'addUser' || name === 'updateUser') {
            showModal.value = false;
        }
    });

    onError((error) => {
        if (errorMessages[name]) {
            toast.error('Xatolik', errorMessages[name]);
        }
        console.error(error);
    });
});

const handleEdit = (user: User) => {
    modalMode.value = 'edit';
    selectedUser.value = user;
    showModal.value = true;
};

const handleAdd = () => {
    modalMode.value = 'add';
    selectedUser.value = null;
    showModal.value = true;
};


const handleDelete = (id: number) => {
    store.deleteUser(id);
};

const handleFormSubmit = (data: CreateUserDto & { id?: number }) => {
    if (modalMode.value === 'add') {
        store.addUser(data);
    } else {
        if (data.id) {
            const { id, ...rest } = data;
            store.updateUser(id, rest);
        }
    }
};

const onSearch = useDebounce((val: string) => {
    store.searchQuery = val;
    store.pagination.page = 1;
    store.fetchUsers();
}, 500);

const handleSearchInput = (val: string) => {
    searchQuery.value = val;
    onSearch(val);
};

onMounted(() => {
    store.fetchUsers();
});
</script>

<template>
    <div class="px-4 pb-4">
        <UserHeader :searchQuery="searchQuery" @update:searchQuery="handleSearchInput" @add="handleAdd" />

        <UserList :users="users" :loading="loading" @edit="handleEdit" @delete="handleDelete" />

        <UserFormModal v-model:show="showModal" :mode="modalMode" :initialData="selectedUser" :loading="submitting"
            @submit="handleFormSubmit" />
    </div>
</template>

<style scoped>
::v-deep(.n-input__input-el) {
    height: 44px;
}
</style>