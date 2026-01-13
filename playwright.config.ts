

import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
    // globalSetup: path.resolve('./src/utils/Login.ts'),
    testDir: './tests',
    timeout: 900000,
    workers: 1,
    use: {
        baseURL: process.env.BASE_URL,
        headless: false,
        storageState: 'auth.json',
        channel: 'chrome',
        viewport: null,
        screenshot: 'only-on-failure',
        // video: 'retain-on-failure',
        // trace: 'retain-on-failure',
        //navigationTimeout: 60000,
        actionTimeout: 45000,
        launchOptions: {
            args: ['--start-maximized'],
        },
    },
    reporter: [
        ['list'],
        ['allure-playwright']
        // ['blob'], // for test runs
        // ['html', { outputFolder: 'playwright-reports/merged', open: 'never' }]
    ]
});
