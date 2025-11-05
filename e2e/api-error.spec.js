import { test, expect } from "@playwright/test";

test('API error shows error message and "Försök igen" button works', async ({
  page,
}) => {
  await page.route("**/recipes*", (route) => {

      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Serverfel" }),
      });
  }, {times: 1});

  await page.goto("/");

  await expect(page.locator("text=Kunde inte ladda recept..")).toBeVisible({
    timeout: 2000,
  });

  await expect(
    page.locator('button:has-text("Försök igen")').first()
  ).toBeVisible();

  await page
    .locator('button:has-text("Försök igen")')
    .first()
    .click({ force: true });

  await page.waitForTimeout(2000);

  const recipeCards = page.locator(".recipe-card");
  await expect(recipeCards.first()).toBeVisible({ timeout: 5000 });
  const recipeCount = await recipeCards.count();
  expect(recipeCount).toBeGreaterThanOrEqual(9);

  await expect(
    page.locator("text=Kunde inte ladda recept..")
  ).not.toBeVisible();
});
