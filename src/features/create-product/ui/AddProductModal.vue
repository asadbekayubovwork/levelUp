<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { NModal, NForm, NFormItem, NInput, NButton, type FormInst, type FormRules } from 'naive-ui';
import type { CreateProductDto } from '@/shared/types/product';

interface Props {
    show: boolean;
    submitting?: boolean;
}

interface Emits {
    (e: 'update:show', value: boolean): void;
    (e: 'submit', data: CreateProductDto): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formRef = ref<FormInst | null>(null);

const formData = reactive<CreateProductDto>({
    title: '',
    description: '',
    category: '',
    price: 0,
    discountPercentage: 0,
    stock: 0,
    brand: '',
});

const formRules: FormRules = {
    title: [
        {
            required: true,
            message: 'Mahsulot nomi majburiy',
            trigger: ['blur', 'input']
        },
        {
            min: 3,
            message: 'Mahsulot nomi kamida 3 ta belgidan iborat bo\'lishi kerak',
            trigger: ['blur', 'input']
        }
    ],
    description: [
        {
            required: true,
            message: 'Tavsif majburiy',
            trigger: ['blur', 'input']
        },
        {
            min: 10,
            message: 'Tavsif kamida 10 ta belgidan iborat bo\'lishi kerak',
            trigger: ['blur', 'input']
        }
    ],
    category: [
        {
            required: true,
            message: 'Kategoriya majburiy',
            trigger: ['blur', 'input']
        }
    ],
    brand: [
        {
            required: true,
            message: 'Brend majburiy',
            trigger: ['blur', 'input']
        }
    ],
};

const resetForm = () => {
    formData.title = '';
    formData.description = '';
    formData.category = '';
    formData.price = 0;
    formData.discountPercentage = 0;
    formData.stock = 0;
    formData.brand = '';
    formRef.value?.restoreValidation();
};

const handleSubmit = async () => {
    try {
        await formRef.value?.validate();
        emit('submit', { ...formData });
        resetForm();
    } catch (error) {
        console.log(error);
    }
};

const handleClose = () => {
    emit('update:show', false);
    resetForm();
};

watch(() => props.show, (newVal) => {
    if (!newVal) {
        resetForm();
    }
});
</script>

<template>
    <NModal :show="show" preset="card" title="Yangi mahsulot qo'shish" class="!w-[600px]" :bordered="false"
        @update:show="emit('update:show', $event)">
        <NForm ref="formRef" :model="formData" :rules="formRules" label-placement="top" label-width="auto">
            <NFormItem label="Mahsulot nomi" path="title">
                <NInput v-model:value="formData.title" placeholder="Mahsulot nomini kiriting" />
            </NFormItem>

            <NFormItem label="Tavsif" path="description">
                <NInput v-model:value="formData.description" type="textarea" placeholder="Mahsulot tavsifini kiriting"
                    :rows="3" />
            </NFormItem>

            <div class="grid grid-cols-2 gap-4">
                <NFormItem label="Kategoriya" path="category">
                    <NInput v-model:value="formData.category" placeholder="Kategoriya" />
                </NFormItem>

                <NFormItem label="Brend" path="brand">
                    <NInput v-model:value="formData.brand" placeholder="Brend" />
                </NFormItem>
            </div>
        </NForm>

        <template #footer>
            <div class="flex justify-end gap-3">
                <NButton @click="handleClose">Bekor qilish</NButton>
                <NButton type="primary" :loading="submitting" @click="handleSubmit">
                    Qo'shish
                </NButton>
            </div>
        </template>
    </NModal>
</template>
