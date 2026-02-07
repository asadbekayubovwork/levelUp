<script setup lang="ts">
import { ref, shallowRef, onMounted, watch, defineAsyncComponent } from 'vue';
import { NInput, NButton, NSpin } from 'naive-ui';
import { Upload, Search } from 'lucide-vue-next';
import { productService } from '@/entities/products/api/productService';
import type { Product, CreateProductDto } from '@/entities/products/api/types';
import { useDebounce, useInfiniteScroll, useToast } from '@/shared/lib';
const ProductCard = defineAsyncComponent(() => import('@/components/ProductCard.vue'));
const AddProductModal = defineAsyncComponent(() => import('@/components/AddProductModal.vue'));

const products = shallowRef<Product[]>([]);
const loading = ref(false);
const loadingMore = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref('');
const targetRef = ref<HTMLElement | null>(null);
const limit = ref(10);
const showModal = ref(false);
const submitting = ref(false);
const toast = useToast();

const fetchProducts = async (isLoadMore = false) => {
  if (isLoadMore) {
    loadingMore.value = true;
  } else {
    loading.value = true;
  }
  error.value = null;

  try {
    const query = searchQuery.value.trim();
    const response = await productService.getProducts(limit.value, query);

    products.value = response.products;
  } catch (err) {
    error.value = 'Mahsulotlarni yuklashda xatolik yuz berdi';
    console.error('Error fetching products:', err);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const handleAddProduct = async (productData: CreateProductDto) => {
  submitting.value = true;

  try {
    await productService.addProduct(productData);
    toast.success('Muvaffaqiyatli!', 'Mahsulot qo\'shildi');
    showModal.value = false;
  } catch (err) {
    toast.error('Xatolik', 'Mahsulot qo\'shishda xatolik yuz berdi!');
    console.error('Error adding product:', err);
  } finally {
    submitting.value = false;
  }
};

const debouncedSearch = useDebounce(fetchProducts, 500);

const loadMore = useDebounce(() => {
  if (products.value.length < limit.value) return;
  if (!loading.value && !loadingMore.value) {
    limit.value += 10;
    fetchProducts(true);
  }
}, 300);

useInfiniteScroll(targetRef, loadMore);

watch(searchQuery, () => {
  limit.value = 10;
  debouncedSearch();
});

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="px-4 pb-4">
    <div class="flex flex-col justify-between sticky top-0 z-10 !bg-white py-4">
      <div class="flex justify-between mb-2">
        <NInput v-model:value="searchQuery" placeholder="Mahsulotlarni qidirish..." v-focus-input
          class="h-11 rounded-xl !w-80 bg-[#EDEFF2]" clearable>
          <template #prefix>
            <Search :size="20" color="#A8AEB5" />
          </template>
        </NInput>
        <NButton v-custom-tooltip="'Mahsulot qoshish tugmasi'" type="success"
          class="h-11 rounded-xl w-[200px] !border-none" @click="showModal = true">
          <template #icon>
            <Upload :size="20" color="#fff" />
          </template>
          Mahsuloq qo'shish
        </NButton>
      </div>
      <h2 class="text-2xl font-medium">Mahsulotlar <span>({{ products.length }})</span></h2>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <NSpin size="large" />
    </div>

    <div v-else-if="products.length === 0" class="flex justify-center items-center py-20">
      <p class="text-gray-600 text-xl">No products found.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <div ref="targetRef" class="h-10 flex justify-center items-center mt-6">
      <NSpin v-if="loadingMore" size="medium">
        <template #description>
          <span class="text-gray-600">Yana yuklanmoqda...</span>
        </template>
      </NSpin>
    </div>

    <AddProductModal v-model:show="showModal" :submitting="submitting" @submit="handleAddProduct" />
  </div>
</template>

<style scoped>
::v-deep(.n-input__input-el) {
  height: 44px;
}
</style>
