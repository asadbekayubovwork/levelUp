<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { NModal, NForm, NFormItem, NInput, NInputNumber, NButton, type FormInst, type FormRules } from 'naive-ui';
import { Save } from 'lucide-vue-next';
import type { User, CreateUserDto } from '@/entities/users/api/types';

const props = defineProps<{
    show: boolean;
    mode: 'add' | 'edit';
    initialData?: User | null;
    loading: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void;
    (e: 'submit', data: CreateUserDto & { id?: number }): void;
}>();

const formRef = ref<FormInst | null>(null);

const defaultForm: CreateUserDto & { id?: number } = {
    firstName: '',
    lastName: '',
    maidenName: '',
    age: 18,
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birthDate: '',
    image: '',
    bloodGroup: '',
    height: 0,
    weight: 0,
    eyeColor: '',
    hair: { color: '', type: '' },
    ip: '',
    address: {
        address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: 0, lng: 0 }, country: ''
    },
    macAddress: '',
    university: '',
    bank: { cardExpire: '', cardNumber: '', cardType: '', currency: '', iban: '' },
    company: { department: '', name: '', title: '', address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: 0, lng: 0 }, country: '' } },
    ein: '',
    ssn: '',
    userAgent: '',
    crypto: { coin: '', wallet: '', network: '' }
};

const formModel = reactive<CreateUserDto & { id?: number }>({ ...defaultForm });

const formRules: FormRules = {
    firstName: [
        { required: true, message: 'Ism kiritish majburiy', trigger: ['blur', 'input'] },
        { min: 3, message: 'Ism kamida 3 ta belgidan iborat bo\'lishi kerak', trigger: ['blur', 'input'] }
    ],
    lastName: [
        { required: true, message: 'Familiya kiritish majburiy', trigger: ['blur', 'input'] },
        { min: 3, message: 'Familiya kamida 3 ta belgidan iborat bo\'lishi kerak', trigger: ['blur', 'input'] }
    ],
    age: [
        { required: true, type: 'number', message: 'Yosh kiritish majburiy', trigger: ['blur', 'change'] },
        { type: 'number', min: 1, max: 120, message: 'Yosh 1 dan 120 gacha bo\'lishi kerak', trigger: ['blur', 'change'] }
    ],
    email: [
        { required: true, message: 'Email kiritish majburiy', trigger: ['blur', 'input'] },
        { type: 'email', message: 'Noto\'g\'ri email formati', trigger: ['blur', 'input'] }
    ]
};

watch(() => props.show, (newVal) => {
    if (newVal) {
        if (props.mode === 'add') {
            Object.assign(formModel, JSON.parse(JSON.stringify(defaultForm)));
            formModel.id = undefined;
        } else if (props.mode === 'edit' && props.initialData) {
            Object.assign(formModel, JSON.parse(JSON.stringify(props.initialData)));
        }
        setTimeout(() => formRef.value?.restoreValidation(), 0);
    }
});

const handleSave = async () => {
    try {
        await formRef.value?.validate();
        emit('submit', { ...formModel });
    } catch (e) {
        console.log('Validation failed');
    }
};

const handleClose = () => {
    emit('update:show', false);
};
</script>

<template>
    <NModal :show="show" @update:show="(val) => emit('update:show', val)" preset="card"
        :title="mode === 'add' ? 'Foydalanuvchi qo\'shish' : 'Tahrirlash'" class="w-[600px]">
        <NForm ref="formRef" :model="formModel" :rules="formRules">
            <div class="grid grid-cols-2 gap-4">
                <NFormItem label="First Name" path="firstName">
                    <NInput v-model:value="formModel.firstName" placeholder="First Name" />
                </NFormItem>
                <NFormItem label="Last Name" path="lastName">
                    <NInput v-model:value="formModel.lastName" placeholder="Last Name" />
                </NFormItem>
                <NFormItem label="Age" path="age">
                    <NInputNumber v-model:value="formModel.age" placeholder="Age" class="w-full" />
                </NFormItem>
                <NFormItem label="Email" path="email">
                    <NInput v-model:value="formModel.email" placeholder="Email" />
                </NFormItem>
            </div>
        </NForm>
        <template #footer>
            <div class="flex justify-end gap-2">
                <NButton @click="handleClose">Bekor qilish</NButton>
                <NButton type="primary" :loading="loading" @click="handleSave">
                    <template #icon>
                        <Save :size="18" />
                    </template>
                    Saqlash
                </NButton>
            </div>
        </template>
    </NModal>
</template>
