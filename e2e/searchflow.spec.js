import { test, expect } from "@playwright/test";

test("search function only shows relevant recipes", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const recipeCards = page.locator(".recipe-card");
  const initialCount = await recipeCards.count();
  expect(initialCount).toBeGreaterThan(0);

  const searchInput = page.locator(
    'input[placeholder*="Vad vill du baka idag?"]'
  );
  //Search
  await searchInput.fill("peppar");
  await searchInput.press("Enter");
  await page.waitForURL(/\?search=peppar/);
  await page.waitForTimeout(1000);
  //Filtered
  const searchResultCount = await recipeCards.count();
  expect(searchResultCount).toBeLessThan(initialCount);
  expect(searchResultCount).toBeGreaterThan(0);
  
  //Clear search 
  await searchInput.clear();
  await searchInput.press("Enter");
  await page.waitForURL(/^(?!.*search)/);
  await page.waitForTimeout(500);
  //Showing all recipes
  const clearedCount = await recipeCards.count();
  expect(clearedCount).toBe(initialCount);

  //Reload with query
  await page.goto("/?search=peppar");
  await page.waitForLoadState("networkidle");
  await expect(searchInput).toHaveValue("peppar");
  const reloadedCount = await recipeCards.count();
  expect(reloadedCount).toBeLessThan(initialCount);
});
