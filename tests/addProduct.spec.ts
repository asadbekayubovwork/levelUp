import { test, expect } from "@playwright/test";

test.describe('Mahsulot qo\'shish testlari', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/login');
        await page.locator('#login-email').fill('admin');
        await page.locator('#login-password').fill('admin');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('http://localhost:3000/');
    });

    test('Mahsulot qo\'shish tugmasi ko\'rinishi kerak', async ({ page }) => {
        const addButton = page.getByRole('button', { name: /mahsuloq qo'shish/i });
        await expect(addButton).toBeVisible();
    });

    test('Mahsulot qo\'shish modali ochilishi kerak', async ({ page }) => {
        const addButton = page.getByRole('button', { name: /mahsuloq qo'shish/i });
        await addButton.click();
        await expect(page.getByText('Yangi mahsulot qo\'shish')).toBeVisible();
    });

    test('To\'liq ma\'lumot bilan mahsulot qo\'shish', async ({ page }) => {
        const addButton = page.getByRole('button', { name: /mahsuloq qo'shish/i });
        await addButton.click();

        await expect(page.getByText('Yangi mahsulot qo\'shish')).toBeVisible();


        await page.getByPlaceholder('Mahsulot nomini kiriting').fill('Test Mahsulot');
        await page.getByPlaceholder('Mahsulot tavsifini kiriting').fill('Bu test uchun yaratilgan mahsulot tavsifi');
        await page.getByPlaceholder('Kategoriya').fill('Elektronika');
        await page.getByPlaceholder('Brend').fill('Test Brand');

        await page.getByRole('button', { name: "Qo'shish", exact: true }).click();

        await expect(page.getByText("Mahsulot muvaffaqiyatli qo'shildi")).toBeVisible({ timeout: 5000 });

        await expect(page.getByText('Yangi mahsulot qo\'shish')).not.toBeVisible();
    });

    test('Bo\'sh forma bilan mahsulot qo\'shib bo\'lmasligi kerak', async ({ page }) => {
        const addButton = page.getByRole('button', { name: /mahsuloq qo'shish/i });
        await addButton.click();

        await expect(page.getByText('Yangi mahsulot qo\'shish')).toBeVisible();

        await page.getByRole('button', { name: "Qo'shish", exact: true }).click();

        await expect(page.getByText('Mahsulot nomi majburiy')).toBeVisible();
        await expect(page.getByText('Tavsif majburiy')).toBeVisible();
        await expect(page.getByText('Kategoriya majburiy')).toBeVisible();
        await expect(page.getByText('Brend majburiy')).toBeVisible();
    });

    test('Qisqa nom bilan mahsulot qo\'shib bo\'lmasligi kerak', async ({ page }) => {
        const addButton = page.getByRole('button', { name: /mahsuloq qo'shish/i });
        await addButton.click();

        await expect(page.getByText('Yangi mahsulot qo\'shish')).toBeVisible();

        await page.getByPlaceholder('Mahsulot nomini kiriting').fill('AB');
        await page.getByPlaceholder('Mahsulot nomini kiriting').blur();

        await expect(page.getByText(/kamida 3 ta belgidan iborat/i)).toBeVisible();
    });

    test('Qisqa tavsif bilan mahsulot qo\'shib bo\'lmasligi kerak', async ({ page }) => {
        const addButton = page.getByRole('button', { name: /mahsuloq qo'shish/i });
        await addButton.click();

        await expect(page.getByText('Yangi mahsulot qo\'shish')).toBeVisible();

        await page.getByPlaceholder('Mahsulot tavsifini kiriting').fill('Qisqa');
        await page.getByPlaceholder('Mahsulot tavsifini kiriting').blur();

        await expect(page.getByText(/kamida 10 ta belgidan iborat/i)).toBeVisible();
    });

    test('Bekor qilish tugmasi modalni yopishi kerak', async ({ page }) => {
        const addButton = page.getByRole('button', { name: /mahsuloq qo'shish/i });
        await addButton.click();

        await expect(page.getByText('Yangi mahsulot qo\'shish')).toBeVisible();

        await page.getByPlaceholder('Mahsulot nomini kiriting').fill('Test Mahsulot');

        await page.getByRole('button', { name: /bekor qilish/i }).click();

        await expect(page.getByText('Yangi mahsulot qo\'shish')).not.toBeVisible();
    });
});
