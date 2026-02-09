export interface LoginCredentials {
    username: string;
    password: string;
    expiresInMins?: number;
}

export interface DummyJsonAuthResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse {
    user: {
        id: number;
        name: string;
        username: string;
        email: string;
        role: string;
        image: string;
    };
    token: string;
    refreshToken: string;
}
