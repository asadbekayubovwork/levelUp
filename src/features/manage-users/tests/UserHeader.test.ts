import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import UserHeader from '../ui/UserHeader.vue';

describe('UserHeader.vue', () => {
    it('searchQuery prop inputda ko‘rinadi', () => {
        render(UserHeader, {
            props: {
                searchQuery: 'Asadbek',
            },
        });

        const input = screen.getByPlaceholderText(
            'Foydalanuvchilarni qidirish...'
        ) as HTMLInputElement;

        expect(input.value).toBe('Asadbek');
    });

    it('input o‘zgarganda update:searchQuery emit bo‘ladi', async () => {
        const { emitted } = render(UserHeader, {
            props: {
                searchQuery: '',
            },
        });

        const input = screen.getByPlaceholderText(
            'Foydalanuvchilarni qidirish...'
        );

        await fireEvent.update(input, 'Powder');

        expect(emitted()['update:searchQuery']).toBeTruthy();
        expect(emitted()['update:searchQuery'][0]).toEqual(['Powder']);
    });

    it('"Foydalanuvchi qo‘shish" tugmasi bosilganda add emit bo‘ladi', async () => {
        const { emitted } = render(UserHeader, {
            props: {
                searchQuery: '',
            },
        });

        const button = screen.getByText("Foydalanuvchi qo'shish");

        await fireEvent.click(button);

        expect(emitted().add).toBeTruthy();
        expect(emitted().add.length).toBe(1);
    });
});
