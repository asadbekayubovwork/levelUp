import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authService } from '../api/authService';
import type { LoginCredentials, AuthResponse } from '../api/types';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<AuthResponse['user'] | null>(null);
    const token = ref<string | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const login = async (credentials: LoginCredentials) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await authService.login(credentials);
            user.value = response.user;
            token.value = response.token;
            Cookies.set('access_token', response.token);
            return response;
        } catch (err: any) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const logout = () => {
        user.value = null;
        token.value = null;
        Cookies.remove('access_token');
    };

    return {
        user,
        token,
        loading,
        error,
        login,
        logout
    };
});
