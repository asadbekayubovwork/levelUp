import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import ProductService from '@/entities/products/api/productService';
import type { Product, CreateProductDto } from '@/entities/products/api/types';

export const useProductStore = defineStore('product', () => {
    // State
    const products = shallowRef<Product[]>([]);
    const loading = ref(false);
    const loadingMore = ref(false);
    const error = ref<string | null>(null);
    const searchQuery = ref('');
    const limit = ref(10);
    const showModal = ref(false);
    const submitting = ref(false);

    // Actions
    const fetchProducts = async (isLoadMore = false) => {
        if (isLoadMore) {
            loadingMore.value = true;
        } else {
            loading.value = true;
        }
        error.value = null;

        try {
            const query = searchQuery.value.trim();
            const response = await ProductService.getAll(limit.value, query);

            products.value = response.products;
        } catch (err) {
            error.value = 'Mahsulotlarni yuklashda xatolik yuz berdi';
            console.error('Error fetching products:', err);
        } finally {
            loading.value = false;
            loadingMore.value = false;
        }
    };

    const loadMoreProducts = () => {
        if (products.value.length < limit.value) return;
        if (!loading.value && !loadingMore.value) {
            limit.value += 10;
            fetchProducts(true);
        }
    };

    const addProduct = async (productData: CreateProductDto) => {
        submitting.value = true;
        try {
            await ProductService.create(productData);
            return true;
        } catch (err) {
            console.error('Error adding product:', err);
            throw err;
        } finally {
            submitting.value = false;
        }
    };

    return {
        products,
        loading,
        loadingMore,
        error,
        searchQuery,
        limit,
        showModal,
        submitting,
        fetchProducts,
        loadMoreProducts,
        addProduct,
    };
});
