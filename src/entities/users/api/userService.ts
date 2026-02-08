import type { UsersResponse, User, CreateUserDto, UpdateUserDto } from './types';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const userService = {
    /**
     * Get users with optional search
     * @param limit - Number of users to fetch (default: 30)
     * @param search - Optional search query string
     * @returns Promise with users response
     */
    async getUsers(limit: number = 30, search: string = ''): Promise<UsersResponse> {
        try {
            const url = search
                ? `${API_BASE_URL}/users/search?q=${encodeURIComponent(search)}&limit=${limit}`
                : `${API_BASE_URL}/users?limit=${limit}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: UsersResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    /**
     * Add a new user
     * @param userData - User data to create
     * @returns Promise with created user
     */
    async addUser(userData: CreateUserDto): Promise<User> {
        try {
            const response = await fetch(`${API_BASE_URL}/users/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: User = await response.json();
            return data;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    },

    /**
     * Update an existing user
     * @param id - User ID
     * @param userData - Partial user data to update
     * @returns Promise with updated user
     */
    async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'PUT', // Or PATCH, dummyjson supports both usually, request example says PUT/PATCH
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: User = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    /**
     * Delete a user
     * @param id - User ID
     * @returns Promise with deleted user response
     */
    async deleteUser(id: number): Promise<User> {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: User = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
};
