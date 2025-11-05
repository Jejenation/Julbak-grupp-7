import { test, expect } from '@playwright/test'

test('homepage shows recipe cards and categories', async ({page}) => {
    await page.goto('/');

    await page.waitForLoadState('networkidle')

    const recipeCards = page.locator(".recipe-card");
    await expect(recipeCards.first()).toBeVisible();

    await expect(page.locator('text=/Bullar \\(\\d+\\)/')).toBeVisible({timeout: 1000});
    await expect(page.locator('text=/Julgodis \\(\\d+\\)/')).toBeVisible();
    await expect(page.locator('text=/Kakor \\(\\d+\\)/')).toBeVisible();

})