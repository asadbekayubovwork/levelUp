<script setup lang="ts">
import { NCard, NRate } from 'naive-ui';
import type { Product } from '@/shared/types/product';

interface Props {
    product: Product;
}

defineProps<Props>();
</script>

<template>
    <NCard class="product-card hover:shadow-xl transition-shadow duration-300 cursor-pointer" hoverable>
        <div class="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
            <img :src="product.thumbnail" :alt="product.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>

        <div class="space-y-3">
            <h3 class="text-lg font-semibold line-clamp-2 min-h-[3.5rem]">
                {{ product.title }}
            </h3>

            <p class="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                {{ product.description }}
            </p>

            <div class="flex gap-2 flex-wrap">
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {{ product.category }}
                </span>
                <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {{ product.brand }}
                </span>
            </div>

            <div class="flex items-center gap-2">
                <NRate :value="product.rating" readonly size="small" />
                <span class="text-sm text-gray-600">({{ product.rating.toFixed(1) }})</span>
            </div>

            <div class="flex items-center justify-between pt-3 border-t">
                <div>
                    <p class="text-2xl font-bold text-green-600">
                        ${{ product.price.toFixed(2) }}
                    </p>
                    <p v-if="product.discountPercentage > 0" class="text-xs text-red-500">
                        -{{ product.discountPercentage.toFixed(0) }}% chegirma
                    </p>
                </div>
                <div class="text-right">
                    <p class="text-sm font-medium" :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
                        {{ product.stock > 0 ? 'Mavjud' : 'Tugagan' }}
                    </p>
                    <p class="text-xs text-gray-500">{{ product.stock }} dona</p>
                </div>
            </div>
        </div>
    </NCard>
</template>

<style scoped>
.product-card {
    border-radius: 12px;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
