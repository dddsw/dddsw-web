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
		this.logo = page.getByAltText('DDD South West home');
	}

	getNavLinkTo(route: string): Locator {
		return this.navMenu.locator(`a[href="/${route}"]`);
	}
}
