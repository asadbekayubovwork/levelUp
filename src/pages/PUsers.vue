<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/entities/users';
import { storeToRefs } from 'pinia';
import { useDebounce, useToast } from '@/shared/lib';
import type { User, CreateUserDto } from '@/entities/users/api/types';
import UserHeader from '@/components/users/UserHeader.vue';
import UserList from '@/components/users/UserList.vue';
import UserFormModal from '@/components/users/UserFormModal.vue';

const store = useUserStore();
const { users, loading, searchQuery, submitting } = storeToRefs(store);

const toast = useToast();

const showModal = ref(false);
const modalMode = ref<'add' | 'edit'>('add');
const selectedUser = ref<User | null>(null);

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

const handleDelete = async (id: number) => {
    try {
        await store.deleteUser(id);
        toast.success('Muvaffaqiyatli', 'Foydalanuvchi o\'chirildi');
    } catch (e) {
        toast.error('Xatolik', 'O\'chirishda xatolik yuz berdi');
    }
};

const handleFormSubmit = async (data: CreateUserDto & { id?: number }) => {
    try {
        if (modalMode.value === 'add') {
            await store.addUser(data);
            toast.success('Muvaffaqiyatli', 'Foydalanuvchi qo\'shildi');
        } else {
            if (data.id) {
                const { id, ...rest } = data;
                await store.updateUser(id, rest);
                toast.success('Muvaffaqiyatli', 'Foydalanuvchi yangilandi');
            }
        }
        showModal.value = false;
    } catch (e) {
        if (e instanceof Error) {
            toast.error('Xatolik', 'Saqlashda xatolik yuz berdi');
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
