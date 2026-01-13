
import { test, expect } from "@playwright/test";
import { PurchaseOrderPage } from "../src/pages/Purchase Order/PurchaseOrder";
import { launchURL } from "@tx/playwright-core";
import { generateUniqueText } from "../src/utils/GenerateRandomText";
import dotenv from 'dotenv';
dotenv.config();
const baseURL = process.env.BASE_URL;
if (!baseURL) {
    throw new Error('BASE_URL environment variable is not set');
}
test.describe("Purchase Order Flow", () => {
    test("Create a new Purchase Order", async ({ page }) => {
        const poPage = new PurchaseOrderPage(page);
        await launchURL(page, baseURL);

        await poPage.openBusinessManager();
        await poPage.openPurchasingMenu();
        await poPage.openPOCreate();
        await poPage.clickNew();

        await poPage.fillVendorName("10000");
        const vendorName = generateUniqueText('TestVendor');
        await poPage.fillVendorInvoiceNo(vendorName);
        await poPage.enterNumberInLine("1908-S");
        await poPage.enterQuantity('100');

        await poPage.clickPost();
        await poPage.clickOk();
        await poPage.clickYes();
        const invoiceGeneratedPageVisible = await poPage.isInviceGeneratedPageVisible();
        expect(invoiceGeneratedPageVisible).toBe(true);
    });
});