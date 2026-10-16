import type { Page, Locator } from '@playwright/test';

export class Header {
	readonly page: Page;
	readonly mainNav: Locator;
	readonly menuButton: Locator;
	readonly mobileNav: Locator;
	readonly logo: Locator;

	constructor(page: Page) {
		this.page = page;
		this.mainNav = page.getByRole('navigation', { name: 'Main' });
		this.menuButton = page.getByRole('button', { name: 'Menu' });
		this.mobileNav = page.getByRole('navigation', { name: 'Mobile' });
		this.logo = page.getByRole('link', { name: 'DDDSW 2027 home' });
	}

	getNavLinkTo(route: string, nav: Locator = this.mainNav): Locator {
		return nav.locator(`a[href="/${route}"]`);
	}
}
