import type { Page, Locator } from '@playwright/test';

export class Header {
	readonly page: Page;
	readonly navMenu: Locator;
	readonly navDropDownButton: Locator;
	readonly navDropDown: Locator;
	readonly logo: Locator;

	constructor(page: Page) {
		this.page = page;
		this.navDropDownButton = page.getByRole('button', { name: 'Find out more' });
		this.navMenu = page.getByRole('navigation').filter({ has: this.navDropDownButton });
		this.navDropDown = this.navMenu.locator('.nav-link-container');
		this.logo = page.getByRole('link', { name: 'The DDD South West logo' });
	}
}
