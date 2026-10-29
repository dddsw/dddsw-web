import { describe, expect, it } from 'vitest';
import { bossEmail } from './sponsors';

describe('bossEmail', () => {
	const email = bossEmail('sponsorship@example.org', 'https://example.org/sponsors');

	it('links to the sponsors page and gives the contact address', () => {
		expect(email.body).toContain('https://example.org/sponsors');
		expect(email.body).toContain('sponsorship@example.org');
	});
	it('has a subject', () => {
		expect(email.subject).not.toBe('');
	});
});
