
import { test } from "@playwright/test";
import { click, launchURL, findElementUniversal } from "@tx/playwright-core";

test("login", async ({ page }) => {
    await launchURL(page, "https://google.com");
    const searchBox = await findElementUniversal(
        page, ['input[name="3q1"]', '[jsname="yZiJb0e"]', '[class="gLFyf"]'], "Search Box"
    );
    await click(page, searchBox);
});
