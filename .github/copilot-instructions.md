# Playwright UI Automation - AI Agent Guide

## 🚨 IMPORTANT: Code Modification Policy

**NEVER edit, modify, or create code files without explicit user approval when operating in agent mode.**

When the user requests changes:
1. **Explain the "why"**: Describe what changes you would make and **why this particular code is needed**
2. Show the code snippets that would be affected
3. Explain the purpose and benefit of each change
4. Wait for user confirmation before proceeding
5. Only make changes after receiving explicit "yes", "go ahead", or similar approval

**Exception**: You may answer questions, provide suggestions, run tests, and read files without asking permission.

## Architecture Overview

TypeScript + Playwright framework using **strict Page Object Model** with layered architecture:

```
src/
├── pages/          # Page objects (extend BasePage) - locators as getters
├── data/           # Centralized test data - app-specific modules
├── config/         # Environment configs with app namespaces
└── utils/          # Reusable test utilities
tests/
└── ui-tests/       # Test specs with beforeEach hooks
```

**Critical Pattern**: All page objects extend `BasePage` and expose **Locator objects via getter methods**, never strings. Tests interact through page objects, never direct `page.locator()` calls.

## Page Object Pattern (MANDATORY)

```typescript
// src/pages/YourAppObjects.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class YourAppObjects extends BasePage {
  constructor(public readonly page: Page) {
    super(page);
  }
  
  // ALL locators as getters returning Locator objects
  get submitButton(): Locator { return this.page.locator('#submit'); }
  get emailInput(): Locator { return this.page.locator('#email'); }
}
```

**Why**: Enables IntelliSense, type safety, and reusable locators. See `src/pages/SauceDemoObjects.ts` for reference.

## Test Data Architecture

Organize by application domain in `src/data/test-data.ts`:

```typescript
export const yourAppData = {
  urls: { base: '...', checkout: '...' },
  credentials: { admin: { username: '...', password: '...' } },
  messages: { success: '...' }  // Expected UI text
};
```

**Pattern from SauceDemo**: Group URLs, credentials, checkout info, and expected messages per app. Tests import via `import { sauceDemoData } from '../../src/data/test-data'`.

## Test Structure Convention

```typescript
import { test, expect } from '@playwright/test';
import { YourAppObjects } from '../../src/pages/YourAppObjects';
import { yourAppData } from '../../src/data/test-data';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    const app = new YourAppObjects(page);
    await app.navigateTo(yourAppData.urls.base);
    // Common setup (login, etc.)
  });

  test('Action description', async ({ page }) => {
    const app = new YourAppObjects(page);
    await app.submitButton.click();  // Use page object getters
    await expect(page).toHaveURL(yourAppData.urls.expected);
  });
});
```

**Key Points**:
- Use `test.beforeEach()` for repeated setup (login flows)
- Instantiate page objects in both `beforeEach` and tests
- Use `expect(page)` for navigation checks, `expect(locator)` for element assertions

## BasePage Utilities (src/pages/BasePage.ts)

Standard methods available to all page objects:

```typescript
// Navigation with fallback strategy
await navigateTo(url)          // Goes to URL with domcontentloaded + networkidle fallback
await waitForPageLoad()        // Smart wait: domcontentloaded → networkidle (5s timeout)

// Locator-based interactions (15s timeout)
await clickElement(locator)    // Waits then clicks
await fillInput(locator, text) // Waits then fills
await getText(locator)         // Returns text content

// Screenshots with timestamps
await takeScreenshot('name')   // Saves to test-results/screenshots/name-{timestamp}.png
```

**Navigation Strategy**: `waitForPageLoad()` tries `networkidle` with 5s timeout, falls back to `domcontentloaded` for sandbox environments (see TradeMe tests).

## Running Tests

```bash
npm test                  # All tests in parallel (local)
npm run test:headed       # Visual debugging
npm run test:ui           # Interactive Playwright UI mode
npm run test:debug        # Step-through with DevTools
npm run test:codegen      # Record interactions for new tests
```

**CI Behavior**: Single worker, 2 retries, no parallel execution (`playwright.config.ts` L15-16).

## Configuration Patterns

### Environment Config (src/config/config.ts)
Multi-environment support per app:

```typescript
config.apps.sauceDemo.dev    // App-specific URLs
config.timeouts.medium       // 15000ms
config.browsers.headless     // Controlled via HEADLESS env var
```

Use for: Dynamic environment switching, shared timeout values.

### Playwright Config (playwright.config.ts)
- **Projects**: Chromium only (Firefox/Safari commented out L62-69)
- **Reporters**: HTML + JSON (`test-results/results.json`) + JUnit XML
- **CI Args**: `--no-sandbox`, `--disable-setuid-sandbox` for Chromium (L46-51)

## Development Workflow

1. **Create Page Object**: Extend `BasePage`, add locators as getters
2. **Add Test Data**: Create app module in `test-data.ts` (urls, credentials, messages)
3. **Write Test Spec**: Use `beforeEach` for setup, import page objects and data
4. **Codegen First Pass**: Run `npm run test:codegen` to generate locators
5. **Refactor**: Move locators to page object, extract data to test-data module

## Common Pitfalls

❌ **DON'T**: `await page.locator('#button').click()` in tests  
✅ **DO**: Define `get submitButton(): Locator` in page object, use `await app.submitButton.click()`

❌ **DON'T**: `await expect(page.locator('.msg')).toHaveText('Success')`  
✅ **DO**: `get successMsg(): Locator` + `await expect(app.successMsg).toHaveText(yourAppData.messages.success)`

❌ **DON'T**: `await page.waitForTimeout(3000)`  
✅ **DO**: `await app.element.waitFor()` or `await app.waitForPageLoad()`

❌ **DON'T**: Hardcode URLs/credentials in tests  
✅ **DO**: Reference `yourAppData.urls.base` and `yourAppData.credentials.admin`

## Project-Specific Notes

- **Test Directory**: All tests in `tests/ui-tests/` (space in dirname intentional)
- **Screenshot Naming**: Use descriptive names with underscores (e.g., `'Order_Complete'`)
- **Locator Preference**: ID selectors first, then data-test attributes, then CSS
- **TypeScript**: Strict mode enabled - handle nullable types (e.g., `textContent() || ''`)