export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    user: {
        name: string;
        role: string;
    };
    token: string;
}
