import { apiClient } from "./client";
import type { ApiClientConfig } from "./types";

/**
 * Generic API Service wrapper
 * Provides a clean interface for making HTTP requests
 */
const ApiService = {
    /**
     * GET request
     * @param url - API endpoint
     * @param config - Optional request configuration
     */
    get<T>(url: string, config?: Omit<ApiClientConfig, "data">) {
        return apiClient.get<T>(url, config);
    },

    /**
     * POST request
     * @param url - API endpoint
     * @param data - Request payload
     * @param config - Optional request configuration
     */
    post<T>(url: string, data?: any, config?: ApiClientConfig) {
        return apiClient.post<T>(url, data, config);
    },

    /**
     * PUT request
     * @param url - API endpoint
     * @param data - Request payload
     * @param config - Optional request configuration
     */
    put<T>(url: string, data?: any, config?: ApiClientConfig) {
        return apiClient.put<T>(url, data, config);
    },

    /**
     * PATCH request
     * @param url - API endpoint
     * @param data - Request payload
     * @param config - Optional request configuration
     */
    patch<T>(url: string, data?: any, config?: ApiClientConfig) {
        return apiClient.patch<T>(url, data, config);
    },

    /**
     * DELETE request
     * @param url - API endpoint
     * @param config - Optional request configuration
     */
    delete<T>(url: string, config?: ApiClientConfig) {
        return apiClient.delete<T>(url, config);
    },
};

export default ApiService;
