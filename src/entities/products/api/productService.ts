import ApiService from '@/shared/api/service';
import type { ProductsResponse, Product, CreateProductDto } from './types';

const ProductService = {
    /**
     * Get all products with optional search
     * @param limit - Number of products to fetch
     * @param search - Optional search query
     */
    async getAll(limit: number = 30, search?: string): Promise<ProductsResponse> {
        const endpoint = search
            ? `/products/search?q=${encodeURIComponent(search)}&limit=${limit}`
            : `/products?limit=${limit}`;

        return ApiService.get<ProductsResponse>(endpoint);
    },

    /**
     * Get product by ID
     * @param id - Product ID
     */
    async getById(id: string | number): Promise<Product> {
        return ApiService.get<Product>(`/products/${id}`);
    },

    /**
     * Create a new product
     * @param data - Product data
     */
    async create(data: CreateProductDto): Promise<Product> {
        return ApiService.post<Product>('/products/add', data);
    },

    /**
     * Update an existing product
     * @param id - Product ID
     * @param data - Updated product data
     */
    async update(id: string | number, data: Partial<CreateProductDto>): Promise<Product> {
        return ApiService.put<Product>(`/products/${id}`, data);
    },

    /**
     * Delete a product
     * @param id - Product ID
     */
    async delete(id: string | number): Promise<Product> {
        return ApiService.delete<Product>(`/products/${id}`);
    },
};

export default ProductService;
