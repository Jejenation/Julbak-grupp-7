import { test, expect } from "@playwright/test";

test('API error shows error message and "Försök igen" buttons recover both sections', async ({ page }) => {
  let recipesReq = 0;
  let categoriesReq = 0;

  // Fail twice, then succeed for /recipes
  await page.route("**/recipes*", route => {
    recipesReq++;
    if (recipesReq <= 2) {
      return route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Serverfel" }),
      });
    }
    return route.continue();
  });

  // Fail twice, then succeed for /categories
  await page.route("**/categories*", route => {
    categoriesReq++;
    if (categoriesReq <= 2) {
      return route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Serverfel" }),
      });
    }
    return route.continue();
  });

  await page.goto("/");

  // Both error banners appear
  await expect(page.getByText("Kunde inte ladda kategorier..")).toBeVisible({ timeout: 5000 });
  await expect(page.getByText("Kunde inte ladda recept..")).toBeVisible({ timeout: 5000 });

  // Click retry for Categories first, then Recipes — scoped to their own sections
  await page
    .getByText("Kunde inte ladda kategorier..")
    .locator("..")
    .getByRole("button", { name: "Försök igen" })
    .click();

  await page
    .getByText("Kunde inte ladda recept..")
    .locator("..")
    .getByRole("button", { name: "Försök igen" })
    .click();

  // Wait for success state (no arbitrary timeouts)
  await expect(page.getByText("Kunde inte ladda kategorier..")).toBeHidden();
  await expect(page.getByText("Kunde inte ladda recept..")).toBeHidden();
  await expect(page.getByRole("button", { name: "Försök igen" })).toHaveCount(0);

  // Categories loaded (example headings with counts)
  await expect(page.locator('text=/Bullar \\(\\d+\\)/')).toBeVisible({ timeout: 5000 });
  await expect(page.locator('text=/Julgodis \\(\\d+\\)/')).toBeVisible();
  await expect(page.locator('text=/Kakor \\(\\d+\\)/')).toBeVisible();

  // Recipes loaded (cards present)
  const recipeCards = page.locator(".recipe-card");
  await expect(recipeCards.first()).toBeVisible({ timeout: 5000 });
  await expect(recipeCards).toHaveCountGreaterThan(0);
});