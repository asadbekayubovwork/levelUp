import type { ProductsResponse, Product, CreateProductDto } from './types';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const productService = {
    /**
     * Get products with optional search
     * @param limit - Number of products to fetch (default: 30)
     * @param search - Optional search query string
     * @returns Promise with products response
     */
    async getProducts(limit: number = 30, search?: string): Promise<ProductsResponse> {
        try {
            const url = search
                ? `${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}`
                : `${API_BASE_URL}/products?limit=${limit}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ProductsResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    /**
     * Add a new product
     * @param productData - Product data to create
     * @returns Promise with created product
     */
    async addProduct(productData: CreateProductDto): Promise<Product> {
        try {
            const response = await fetch(`${API_BASE_URL}/products/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: Product = await response.json();
            return data;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    },

};
