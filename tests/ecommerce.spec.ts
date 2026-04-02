import { test, expect } from "@playwright/test";

test("homepage loads products", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Wait for products
  await expect(page.locator("text=Add to Cart").first()).toBeVisible();
});

test("add to cart and remove item", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Add first product
  await page.locator("text=Add to Cart").first().click();

  // Go to cart
  await page.goto("http://localhost:5173/cart");

  // Check item exists and remove item
  const removeBtn = page.getByRole("button", { name: /remove/i });
  await expect(removeBtn).toBeVisible();
  await removeBtn.click();

  // Check empty state
  await expect(page.locator("text=empty")).toBeVisible();
});

test("filter persists in URL", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Click category filter (adjust text if needed)
  await page.locator("text=groceries").click();

  // Check URL updated
  await expect(page).toHaveURL(/category=groceries/);
});
