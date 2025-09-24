# Playwright UI Automation Project - AI Assistant Guide

## Project Architecture

This is a TypeScript-based Playwright automation framework using the Page Object Model pattern. The project follows a layered architecture with clear separation of concerns:

- **Pages Layer** (`src/pages/`): Page objects extending `BasePage` class
- **Utils Layer** (`src/utils/`): Reusable utilities for browser operations and waits
- **Data Layer** (`src/data/`): Test data interfaces and constants
- **Config Layer** (`src/config/`): Environment and execution configurations
- **Tests Layer** (`tests/`): Test specifications organized by functionality

## Key Patterns & Conventions

### Page Object Structure
All page objects extend `BasePage` and use getter methods for both locators and URLs:
```typescript
export class YourPage extends BasePage {
  // URLs as getters
  get baseUrl(): string { return 'https://example.com'; }
  
  // Locators as getters returning Locator objects
  get submitButton(): Locator { return this.page.locator('#submit'); }
}
```

### Test Organization
- Use `test.beforeEach()` for common setup (login, navigation)
- Organize tests in subdirectories under `tests/` (e.g., `tests/ui tests/`)
- Follow the pattern: setup → action → assertion

### Locator Strategy
- Prefer ID selectors (`#element-id`) over other strategies
- Use Playwright's `Locator` objects, not string selectors in assertions
- Chain locators for better readability: `page.locator('.container').locator('.item')`

## Development Workflows

### Running Tests
```bash
npm test                    # All tests in parallel
npm run test:headed         # Visual debugging
npm run test:debug          # Step-through debugging
npm run test:ui             # Interactive UI mode
```

### Test Development Process
1. Create page object in `src/pages/` extending `BasePage`
2. Define URLs and locators as getter methods
3. Add test data to `src/data/test-data.ts` if needed
4. Write test spec in appropriate `tests/` subdirectory
5. Use `npm run test:codegen` to record new interactions

### Debugging & Reporting
- Screenshots automatically saved to `test-results/screenshots/` on failure
- HTML reports in `playwright-report/index.html`
- Test results exported to both JSON and XML formats in `test-results/`

## Configuration Details

### Playwright Config (`playwright.config.ts`)
- **Default Browser**: Chromium only (Firefox/Safari commented out)
- **Parallel Execution**: Enabled for local, disabled for CI
- **Failure Handling**: Screenshots, videos, and traces on failure/retry
- **Timeouts**: 30s for actions and navigation

### TypeScript Setup
- Strict mode enabled in `tsconfig.json`
- Target ES2020 with CommonJS modules
- Source maps enabled for debugging

## Critical File Patterns

### BasePage Utilities
The `BasePage` class provides standardized methods:
- Navigation: `navigateTo()`, `waitForPageLoad()`
- Interactions: `clickElement()`, `fillInput()`, `getText()`
- Waits: `waitForElement()` with configurable timeout
- Screenshots: `takeScreenshot()` with timestamp naming

### Test Data Structure
Use interfaces for type safety and organize by domain:
```typescript
export interface TestUser {
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}
```

## Anti-Patterns to Avoid

- Don't use `page.click()` directly in tests - use page object methods
- Avoid hardcoded waits (`page.waitForTimeout()`) - use condition-based waits
- Don't put test data directly in test files - centralize in `src/data/`
- Avoid string selectors in assertions - use `Locator` objects