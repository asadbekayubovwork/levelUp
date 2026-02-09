import ApiService from '@/shared/api/service';
import type { UsersResponse, User, CreateUserDto, UpdateUserDto } from './types';

const UserService = {
    /**
     * Get all users with optional search
     * @param limit - Number of users to fetch
     * @param search - Optional search query
     */
    async getAll(limit: number = 30, search: string = ''): Promise<UsersResponse> {
        const endpoint = search
            ? `/users/search?q=${encodeURIComponent(search)}&limit=${limit}`
            : `/users?limit=${limit}`;

        return ApiService.get<UsersResponse>(endpoint);
    },

    /**
     * Get user by ID
     * @param id - User ID
     */
    async getById(id: string | number): Promise<User> {
        return ApiService.get<User>(`/users/${id}`);
    },

    /**
     * Create a new user
     * @param data - User data
     */
    async create(data: CreateUserDto): Promise<User> {
        return ApiService.post<User>('/users/add', data);
    },

    /**
     * Update an existing user
     * @param id - User ID
     * @param data - Updated user data
     */
    async update(id: string | number, data: UpdateUserDto): Promise<User> {
        return ApiService.put<User>(`/users/${id}`, data);
    },

    /**
     * Delete a user
     * @param id - User ID
     */
    async delete(id: string | number): Promise<User> {
        return ApiService.delete<User>(`/users/${id}`);
    },
};

export default UserService;
