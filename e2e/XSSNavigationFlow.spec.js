import { test, expect } from '@playwright/test';

test.describe('E2E Test - Navigation Flow & XSS Protection', () => {

    test('User can navigate through app without XSS or console errors', async ({ page }) => {
        const consoleMessages = [];
        const dialogs = [];

        // Monitor console and dialogs to detect any XSS or runtime issues
        page.on('console', msg => consoleMessages.push(msg.text()));
        page.on('dialog', dialog => dialogs.push(dialog.message()));

        // Go to the homepage
        await page.goto('http://localhost:5173/');

        // Wait for recipe cards to render
        await expect(page.locator('.recipe-card')).not.toHaveCount(0);

        // Click on the first recipe card
        await page.click('.recipe-card-link >> nth=0');

        // Verify that the detail page has a title (not empty)
        await expect(page.locator('h1')).not.toBeEmpty();

        // Wait for the search input to appear
        await page.waitForSelector('input');

        // Test search input with a potential XSS string
        await page.fill('input', '<script>alert(1)</script>');
        await page.keyboard.press('Enter');

        // Ensure no alert dialogs appeared (indicating no script)
        expect(dialogs.length).toBe(0);

        // Click a category link (handle both home and detail pages)
        const categoriesLink = page.getByRole('link', { name: 'Kategorier' });

        // If link isn't visible (e.g., we're on detail page), go back first
        if (await categoriesLink.count() === 0) {
            await page.goBack();

            await page.waitForSelector('.recipe-card', { timeout: 10000 });
            
            const recipeCount = await page.locator('.recipe-card').count();
            expect(recipeCount).toBeGreaterThan(0);
        }

        // Click the 'Kategorier' link once it's visible
        await categoriesLink.first().click({ timeout: 30000 });

        // Navigate back to the previous page
        await page.goBack();

        // Verify that there were no console errors logged
        const errors = consoleMessages.filter(msg => msg.toLowerCase().includes('error'));
        expect(errors.length).toBe(0);

        // Verify that recipe titles do not contain script tags
        const recipeTitles = await page.locator('.recipe-card h3').allInnerTexts();
        for (const title of recipeTitles) {
            expect(title).not.toContain('<script>');
        }
    });
});