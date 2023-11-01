import type { Page } from "@playwright/test";
import { PLAYWRIGHT_DEV_URL } from "../constants";

export async function goToPlaywrightDev(page: Page) {
	await page.goto(PLAYWRIGHT_DEV_URL);
}
