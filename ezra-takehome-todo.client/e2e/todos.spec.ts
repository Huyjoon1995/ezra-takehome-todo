/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect } from '@playwright/test';

test.describe('Todo List Application', () => {
    test.beforeEach(async ({ page }) => {
        // Set test mode before loading the page
        await page.addInitScript(() => {
            (window as any).__TEST_MODE__ = true;
        });
        
        await page.goto('/');
        // Wait for the app to load
        await page.waitForSelector('[data-testid="todo-app"]', { timeout: 10000 });
    });    

    test('should display app header and main elements', async ({ page }) => {
        // Check if the main header is visible
        await expect(page.getByText("My Todo List")).toBeVisible();
        
        // Check if the input field is present
        await expect(page.getByPlaceholder("What needs to be done?")).toBeVisible();
        
        // Check if the Add Task button is present
        await expect(page.getByRole('button', { name: 'Add Task' })).toBeVisible();
    });

    test('should add a new todo item', async ({ page }) => {
        // Add a new todo
        await page.getByPlaceholder("What needs to be done?").fill("Test todo item");
        await page.getByRole('button', { name: 'Add Task' }).click();
        
        // Check if the todo appears in the list
        await expect(page.getByText("Test todo item")).toBeVisible();
    });

    test('should toggle todo completion', async ({ page }) => {
        // First add a todo
        await page.getByPlaceholder("What needs to be done?").fill("Todo to complete");
        await page.getByRole('button', { name: 'Add Task' }).click();
        
        // Wait for the todo to appear
        await expect(page.getByText("Todo to complete")).toBeVisible();
        
        // Click the checkbox to complete the todo
        await page.getByRole('checkbox').first().click();
        
        // Check if the todo is marked as completed (strikethrough)
        const todoText = page.getByText("Todo to complete");
        await expect(todoText).toHaveCSS('text-decoration', /line-through/);
    });

    test('should delete a todo item', async ({ page }) => {
        // Add a todo
        await page.getByPlaceholder("What needs to be done?").fill("Todo to delete");
        await page.getByRole('button', { name: 'Add Task' }).click();
        
        // Wait for the todo to appear
        await expect(page.getByText("Todo to delete")).toBeVisible();
        
        // Click the delete button
        await page.getByRole('button', { name: 'Delete task' }).click();
        
        // Check if the todo is removed
        await expect(page.getByText("Todo to delete")).not.toBeVisible();
    });

    test('should show empty state when no todos', async ({ page }) => {
        // Check if empty state is shown
        await expect(page.getByText("No tasks yet")).toBeVisible();
        await expect(page.getByText("Add your first task above to get started!")).toBeVisible();
    });
});