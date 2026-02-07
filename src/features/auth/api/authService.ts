import type { LoginCredentials, AuthResponse } from './types.ts';

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.username === 'admin' && credentials.password === 'admin') {
                    resolve({
                        user: {
                            name: 'Admin User',
                            role: 'admin',
                        },
                        token: 'mock-jwt-token',
                    });
                } else {
                    reject(new Error("Login yoki parol noto'g'ri"));
                }
            }, 1000);
        });
    },
};
