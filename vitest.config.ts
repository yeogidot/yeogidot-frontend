import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { playwright } from '@vitest/browser-playwright';
import { devices } from '@playwright/test';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium', name: 'desktop-chromium' },
        { browser: 'webkit', name: 'desktop-webkit' },
        { browser: 'chromium', name: 'mobile-android', ...devices['Pixel 7'] },
        { browser: 'webkit', name: 'mobile-ios', ...devices['iPhone 14'] },
      ],
    },
  },
});
