import ApiService from '@/shared/api/service';
import type { LoginCredentials, AuthResponse, DummyJsonAuthResponse } from './types';

const AuthService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await ApiService.post<DummyJsonAuthResponse>(
                '/auth/login',
                {
                    username: credentials.username,
                    password: credentials.password,
                    expiresInMins: credentials.expiresInMins || 30,
                }
            );

            const authResponse: AuthResponse = {
                user: {
                    id: response.id,
                    name: `${response.firstName} ${response.lastName}`,
                    username: response.username,
                    email: response.email,
                    role: 'user',
                    image: response.image,
                },
                token: response.accessToken,
                refreshToken: response.refreshToken,
            };

            return authResponse;
        } catch (error) {
            console.error('Login error:', error);
            throw new Error("Login yoki parol noto'g'ri");
        }
    },
};

export default AuthService;
