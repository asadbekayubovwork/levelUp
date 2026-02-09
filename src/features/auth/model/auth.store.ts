import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import AuthService from '../api/authService';
import type { LoginCredentials, AuthResponse } from '../api/types';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';


export const useAuthStore = defineStore('auth', () => {
    const userCookie = Cookies.get('user');
    const user = ref<AuthResponse['user'] | null>(userCookie ? JSON.parse(userCookie) : null);
    const token = ref<string | null>(Cookies.get('access_token') || null);

    const loading = ref(false);
    const error = ref<string | null>(null);
    const router = useRouter();


    const isAuthenticated = computed(() => !!user.value && !!token.value)

    const login = async (credentials: LoginCredentials) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await AuthService.login(credentials);
            user.value = response.user;
            token.value = response.token;

            Cookies.set('access_token', response.token, { expires: 7 });
            Cookies.set('refresh_token', response.refreshToken, { expires: 7 });
            Cookies.set('user', JSON.stringify(response.user), { expires: 7 });

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
        Cookies.remove('refresh_token');
        Cookies.remove('user');
        router.push('/login');
    };

    return {
        user,
        token,
        loading,
        error,
        isAuthenticated,
        login,
        logout
    };
});
