import { Page, chromium } from "@playwright/test";
import {
  click,
  launchURL,
  waitForElementToVisible,
  findElementUniversal,
  type,
} from "@tx/playwright-core";
import dotenv from "dotenv";

dotenv.config();

const baseURL = process.env.BASE_URL;
const userName = process.env.USER_NAME;
const userPassword = process.env.PASSWORD;

if (!baseURL || !userName || !userPassword) {
  throw new Error("Missing BASE_URL, USER_NAME, or PASSWORD in .env");
}

export async function login(page: Page, baseURL: string, username: string, pwd: string) {
  const signInButton = ['[data-bi-ecn="Sign in"]', '[data-bi-cn="Sign in"]'];
  const userNameInput = ['[name="loginfmt"]'];
  const nextButton = ['[data-report-event="Signin_Submit"]'];
  const passwordInput = ['[name="passwd"]'];
  const cancelButton = ['[id="idBtn_Back"]'];

  console.log("launchURL import check:", typeof launchURL);

  await launchURL(page, baseURL);

  const signInSelector = await findElementUniversal(page, signInButton, "Sign in Button");
  const [loginPage] = await Promise.all([
    page.context().waitForEvent("page"),
    click(page, signInSelector),
  ]);

  await loginPage.waitForLoadState("domcontentloaded");
  console.log("Login tab opened:", loginPage.url());

  const userNameSelector = await findElementUniversal(loginPage, userNameInput, "User name");
  await waitForElementToVisible(loginPage, userNameSelector);
  await type(loginPage, userNameSelector, username);

  const nextSelector = await findElementUniversal(loginPage, nextButton, "Next Button");
  await click(loginPage, nextSelector);

  const passwordSelector = await findElementUniversal(loginPage, passwordInput, "Password Field");
  await waitForElementToVisible(loginPage, passwordSelector);
  await type(loginPage, passwordSelector, pwd);

  await click(loginPage, nextSelector);

  const cancelSelector = await findElementUniversal(loginPage, cancelButton, "Cancel Button");
  await waitForElementToVisible(loginPage, cancelSelector);
  await click(loginPage, nextSelector);

  await loginPage.waitForLoadState('domcontentloaded', { timeout: 60000 });

  console.log("Login completed successfully");
}

export default async function globalSetup() {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await login(page, baseURL!, userName!, userPassword!);
  await context.storageState({ path: "auth.json" });
  await browser.close();
}
