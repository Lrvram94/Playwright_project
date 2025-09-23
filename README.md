# Playwright UI Automation Project

A clean, well-structured TypeScript project template for UI automation testing using Playwright.

## Project Structure

```
├── src/
│   ├── pages/          # Page Object Model classes
│   │   ├── BasePage.ts     # Base page with common methods
│   │   └── todos.ts     # Elements page with ElementHelper utility
│   ├── utils/          # Utility functions and helpers
│   │   └── test-utils.ts   # Browser, data, and file utilities
│   ├── data/           # Test data and constants
│   │   └── test-data.ts    # Generic test data for various scenarios
│   └── config/         # Configuration files
│       └── config.ts       # Environment and execution configs
├── tests/              # Test specifications
│   └── todos.spec.ts    # Elements page test examples
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies and scripts
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Run example tests:**
   ```bash
   npm test                 # Run all tests
   npm run test:headed      # Run tests in headed mode
   npm run test:debug       # Run tests in debug mode
   npm run test:ui          # Run tests with UI mode
   ```

4. **View test reports:**
   ```bash
   npm run test:report
   ```

## What's Included

### ✅ **Ready-to-Use Foundation:**
- **BasePage class** - Common methods for all page objects
- **Test utilities** - Data generation, file handling, browser utilities
- **Generic test data** - Users, forms, search terms, validation data
- **Professional configuration** - TypeScript, Playwright, and project settings

### ✅ **Example Tests:**
- **Elements tests** - Demonstrates various UI element interactions and testing patterns

### ✅ **Best Practices:**
- Page Object Model (POM) pattern
- TypeScript for type safety
- Modular and maintainable structure
- Comprehensive test data management
- Professional configuration setup

## Creating Your Own Tests

1. **Create page objects** in `src/pages/` extending `BasePage`
2. **Add test data** in `src/data/test-data.ts`
3. **Write test specifications** in `tests/`
4. **Use utilities** from `src/utils/` for common operations

### Example Page Object:
```typescript
import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class YourPage extends BasePage {
  private readonly selector = '#your-selector';

  constructor(page: Page) {
    super(page);
  }

  async performAction() {
    await this.clickElement(this.selector);
  }
}
```

### Example Test:
```typescript
import { test, expect } from '@playwright/test';
import { YourPage } from '../src/pages/your.page';

test('should perform action', async ({ page }) => {
  const yourPage = new YourPage(page);
  await yourPage.navigateTo('https://example.com');
  await yourPage.performAction();
  await expect(page).toHaveURL(/expected/);
});
```

## Available Commands

```bash
npm test                    # Run all tests
npm run test:headed         # Run with browser visible
npm run test:debug          # Debug mode
npm run test:ui             # Interactive UI mode
npm run test:report         # View test reports
npm run test:codegen        # Generate tests by recording
npx playwright test --grep "test name"  # Run specific test
```



