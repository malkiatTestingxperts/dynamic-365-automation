
import { test } from "@playwright/test";
import { click, launchURL, findElementUniversal } from "@tx/playwright-core";

test("Purchase Order", async ({ page }) => {
    await launchURL(page, '/');
    const searchBox = await findElementUniversal(
        page, ['input[name="3q1"]', '[jsname="yZiJb0e"]', '[class="gLFyf"]'], "Search Box"
    );
    await click(page, searchBox);
});
