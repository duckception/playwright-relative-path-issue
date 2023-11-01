import { type Locator, type Page, expect } from "@playwright/test";
import { goToPlaywrightDev } from "./utils/even-deeper-nested-utils/go-to-playwright-dev";

export class PlaywrightDevPage {
	readonly page: Page;
	readonly getStartedLink: Locator;
	readonly gettingStartedHeader: Locator;
	readonly pomLink: Locator;
	readonly tocList: Locator;

	constructor(page: Page) {
		this.page = page;
		this.getStartedLink = page.locator("a", { hasText: "Get started" });
		this.gettingStartedHeader = page.locator("h1", { hasText: "Installation" });
		this.pomLink = page
			.locator("li", {
				hasText: "Guides",
			})
			.locator("a", {
				hasText: "Page Object Model",
			});
		this.tocList = page.locator("article div.markdown ul > li > a");
	}

	async goto() {
		await goToPlaywrightDev(this.page);
	}

	async getStarted() {
		await this.getStartedLink.first().click();
		await expect(this.gettingStartedHeader).toBeVisible();
	}

	async pageObjectModel() {
		await this.getStarted();
		await this.pomLink.click();
	}
}
