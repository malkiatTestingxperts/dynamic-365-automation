// Refactored PurchaseOrderPage.ts using FrameLocator

import { Page, FrameLocator } from "@playwright/test";

export class PurchaseOrderPage {
    private page: Page;
    private frame: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.frame = this.page.frameLocator('iframe[title="undefined"]');
    }

    private async findInFrame(selector: string, label: string) {
        const locator = this.frame.locator(selector);
        await locator.waitFor({ state: "visible" });
        return locator;
    }

    private async findInFrameLast(selector: string, label: string) {
        const locator = this.frame.locator(selector).last();
        await locator.waitFor({ state: "visible" });
        return locator;
    }

    private async clickInFrame(selector: string, label: string) {
        const el = await this.findInFrame(selector, label);
        await el.click();
    }

    private async clickInLastFrame(selector: string, label: string) {
        const el = await this.findInFrameLast(selector, label);
        await el.click();
    }

    async openBusinessManager() {
        await this.clickInFrame('form[aria-label="Business Manager"]', "Business Manager Form");
    }

    async openPurchasingMenu() {
        await this.clickInLastFrame('[role="menuitem"] [aria-label="Purchasing"]', "Purchasing Menu");
    }

    async openPOCreate() {
        await this.clickInFrame('[role="menuitem"] [aria-label="Purchase Orders"]', "Purchase Orders Create");
    }

    async clickNew() {
        await this.clickInLastFrame('button[aria-label="New"]', "New Button");
    }

    async fillVendorName(value: string) {
        const el = await this.findInFrame('[controlname*="Vendor Name"] input', "Vendor Name Field");
        await el.fill(value);
    }

    async openAscendingNo() {
        await this.clickInFrame('button[name*="Ascending order"]', "Ascending No Button");
    }

    async openFilters() {
        await this.clickInFrame('text=Filters', "Filters Text");
    }

    async fillVendorInvoiceNo(value: string) {
        const el = await this.findInFrame('[controlname*="Vendor Invoice"] input', "Vendor Invoice No Field");
        await el.fill(value);
    }

    async enterNumberInLine(value: string) {
        const el = await this.findInFrameLast('[controlname="No."] input', "Vendor Invoice No Field");
        await el.fill(value);
        await this.page.waitForTimeout(3000);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(3000);
    }

    async enterQuantity(value: string) {
        const el = await this.findInFrameLast('[controlname="Quantity"] input', "Quantity Field");
        await el.scrollIntoViewIfNeeded();
        await el.fill(value);
        await this.page.waitForTimeout(3000);
    }

    async clickPost() {
        await this.clickInLastFrame(
            'button[aria-label="Post..."]', "button post"
        );
    }

    async openNoCombobox() {
        await this.clickInFrame(
            '[role="combobox"][name="No."]',
            'No Combobox'
        );
    }

    async clickChooseValueForNo() {
        await this.clickInFrame(
            'button[name="Choose a value for No."]',
            'Choose Value for No'
        );
    }

    async selectSortedNoItem() {
        await this.clickInFrame(
            'button[name*="1906-S"]',
            'Sorted Item 1906-S'
        );
    }
    async clickOk() {
        await this.clickInFrame(
            '//div[contains(@class,"has-actions")]//button[.//span[normalize-space()="OK"]]',
            'OK Button'
        );
    }

    async clickYes() {
        await this.clickInFrame(
            '//div[contains(@class,"has-actions")]//button[.//span[normalize-space()="Yes"]]',
            'Yes Button'
        );
    }

    async isInviceGeneratedPageVisible() {
        const el = await this.findInFrame('[role="menuitem"] [aria-label="Update Document"]', "Vendor Invoice Generated");
        await el.waitFor({ state: "visible" });
        return el.isVisible();
    }
}
