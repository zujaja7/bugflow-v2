import { test, expect, type Page } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

async function createBug(
  page: Page,
  title = "Test Bug",
  description = "Test description",
  severity = "High",
  priority = "P1",
  status = "New",
  estimate = "1 hr",
) {
  await page.getByRole("button", { name: "+ New Bug" }).click();
  await page.getByPlaceholder("Enter your Bug title").fill(title);
  await page.getByPlaceholder("Enter your Bug Description").fill(description);
  await page.locator("#modal-severity").selectOption(severity);
  await page.locator("#modal-priority").selectOption(priority);
  await page.locator("#modal-status").selectOption(status);
  await page.locator("#modal-estimate").selectOption(estimate);
  await page.getByRole("button", { name: "Save Bug" }).click();
}

test("create a bug", async ({ page }) => {
  await createBug(
    page,
    "My new bug title",
    "My new bug description",
    "Medium",
    "P2",
    "Open",
    "2 hrs",
  );
  await expect(page.getByText("My new bug title").first()).toBeVisible({
    timeout: 10000,
  });
});

test("validation", async ({ page }) => {
  await page.getByRole("button", { name: "+ New Bug" }).click();
  await page.getByRole("button", { name: "Save Bug" }).click();
  await expect(page.getByText("* Title is required")).toBeVisible();
});

test("delete a bug", async ({ page }) => {
  await createBug(
    page,
    "My new bug title",
    "My new bug description",
    "Medium",
    "P2",
    "Open",
    "2 hrs",
  );
  await page.getByLabel("Delete bug").click();
  await expect(page.getByText("My new bug title")).not.toBeVisible();
});

test("edit a bug", async ({ page }) => {
  await createBug(
    page,
    "My new bug title",
    "My new bug description",
    "Medium",
    "P2",
    "Open",
    "2 hrs",
  );
  await page.getByLabel("Edit bug").click();
  await page.getByPlaceholder("Enter your Bug title").clear();
  await page.getByPlaceholder("Enter your Bug title").fill("Edited Bug");
  await page.getByRole("button", { name: "Update Bug" }).click();
  await expect(page.getByText("Edited Bug")).toBeVisible();
  await expect(page.getByText("My new bug title")).not.toBeVisible();
});

test("search a bug", async ({ page }) => {
  await createBug(
    page,
    "Bug 1",
    "My new bug description",
    "Medium",
    "P2",
    "Open",
    "2 hrs",
  );
  await createBug(
    page,
    "Bug 2",
    "My new bug description",
    "Medium",
    "P2",
    "Open",
    "2 hrs",
  );
  await page.getByPlaceholder("Search issues...").fill("Bug 2");
  await expect(page.getByText("Bug 2")).toBeVisible();
  await expect(page.getByText("Bug 1")).not.toBeVisible();
});

test("filter bugs by severity and status", async ({ page }) => {
  await createBug(
    page,
    "High open bug",
    "Visible after filtering",
    "High",
    "P1",
    "Open",
    "1 hr",
  );

  await createBug(
    page,
    "Low fixed bug",
    "Should be hidden",
    "Low",
    "P4",
    "Fixed",
    "2 hrs",
  );

  await page.locator("#severity").selectOption("High");
  await page.locator("#status").selectOption("Open");

  await expect(page.getByText("High open bug")).toBeVisible();
  await expect(page.getByText("Low fixed bug")).not.toBeVisible();
});

test("reset filters shows all bugs again", async ({ page }) => {
  await createBug(
    page,
    "High bug",
    "Description",
    "High",
    "P1",
    "Open",
    "1 hr",
  );
  await createBug(
    page,
    "Low bug",
    "Description",
    "Low",
    "P4",
    "Fixed",
    "2 hrs",
  );

  await page.locator("#severity").selectOption("High");

  await expect(page.getByText("High bug")).toBeVisible();
  await expect(page.getByText("Low bug")).not.toBeVisible();

  await page.getByRole("button", { name: "Reset filters" }).click();

  await expect(page.getByText("High bug")).toBeVisible();
  await expect(page.getByText("Low bug")).toBeVisible();
});
