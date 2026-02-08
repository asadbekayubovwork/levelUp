<script setup lang="ts">
import { ref, onMounted, watch, defineAsyncComponent } from 'vue';
import { NInput, NButton, NSpin } from 'naive-ui';
import { Upload, Search } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/entities/products/model/products.store';
import type { CreateProductDto } from '@/entities/products/api/types';
import { useDebounce, useInfiniteScroll, useToast } from '@/shared/lib';

const ProductCard = defineAsyncComponent(() => import('@/entities/products/ui/ProductCard.vue'));
const AddProductModal = defineAsyncComponent(() => import('@/features/create-product/ui/AddProductModal.vue'));

const store = useProductStore();
const { products, loading, loadingMore, searchQuery, limit, showModal, submitting } = storeToRefs(store);

const targetRef = ref<HTMLElement | null>(null);
const toast = useToast();

const handleAddProduct = async (productData: CreateProductDto) => {
  try {
    await store.addProduct(productData);
    toast.success('Muvaffaqiyatli!', 'Mahsulot qo\'shildi');
    showModal.value = false;
  } catch (err) {
    toast.error('Xatolik', 'Mahsulot qo\'shishda xatolik yuz berdi!');
    // Error is logged in store
  }
};

const debouncedSearch = useDebounce(() => {
  store.fetchProducts();
}, 500);

const loadMore = useDebounce(() => {
  store.loadMoreProducts();
}, 300);

useInfiniteScroll(targetRef, loadMore);

watch(searchQuery, () => {
  limit.value = 10;
  debouncedSearch();
});

onMounted(() => {
  store.fetchProducts();
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
