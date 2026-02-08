import { defineStore } from 'pinia';
import { ref, shallowRef, computed } from 'vue';
import { userService } from '@/entities/users/api/userService';
import type { User, CreateUserDto, UpdateUserDto, UserSummary } from '@/entities/users/api/types';

export const useUserStore = defineStore('user', () => {
    const users = shallowRef<User[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const searchQuery = ref('');
    const pagination = ref({
        page: 1,
        pageSize: 10,
        total: 0,
    });
    const submitting = ref(false);

    const userSummaries = computed<UserSummary[]>(() =>
        users.value.map(({ id, firstName, lastName, email, age, image, company }) => ({
            id, firstName, lastName, email, age, image, company
        }))
    );

    const fetchUsers = async () => {
        loading.value = true;
        error.value = null;

        try {
            const limit = pagination.value.pageSize;
            const query = searchQuery.value.trim();

            const response = await userService.getUsers(limit, query);

            users.value = response.users;
            pagination.value.total = response.total;
        } catch (err) {
            error.value = 'Failed to fetch users';
            console.error('Error fetching users:', err);
        } finally {
            loading.value = false;
        }
    };

    const addUser = async (userData: CreateUserDto) => {
        submitting.value = true;
        try {
            const newUser = await userService.addUser(userData);
            users.value = [newUser, ...users.value];
            pagination.value.total += 1;
            return newUser;
        } catch (err) {
            console.error('Error adding user:', err);
            throw err;
        } finally {
            submitting.value = false;
        }
    };

    const updateUser = async (id: number, userData: UpdateUserDto) => {
        submitting.value = true;
        try {
            await userService.updateUser(id, userData);
        } catch (err) {
            console.error('Error updating user:', err);
            throw err;
        } finally {
            submitting.value = false;
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await userService.deleteUser(id);
            users.value = users.value.filter(u => u.id !== id);
            pagination.value.total -= 1;
            return true;
        } catch (err) {
            console.error('Error deleting user:', err);
            throw err;
        }
    };

    return {
        users,
        userSummaries,
        loading,
        error,
        searchQuery,
        pagination,
        submitting,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
    };
});
