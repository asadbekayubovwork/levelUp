import { test, expect } from '@playwright/test';

test('Login sahifasida Xush kelibsiz heading korinishi kerak', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await expect(page.locator('h1')).toBeVisible()
});

test('Login sahifasida login va password inputlari bo`lishi kerak', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await expect(page.locator('#login-email')).toBeVisible();
    await expect(page.locator('#login-password')).toBeVisible();
});

test('Admin login sahifasiga kira olishi kerak', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.locator('#login-email').fill('admin');
    await page.locator('#login-password').fill('admin');

    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('http://localhost:3000/');
})

