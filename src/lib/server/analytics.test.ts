import { describe, expect, it } from 'vitest';
import { analyticsFor, goatCounterScript, goatCounterTestScript } from './analytics.ts';

const publicHost = 'dddsouthwest.com';

describe('analyticsFor', () => {
	it('adds the GoatCounter script on the public host', () => {
		expect(analyticsFor('dddsouthwest.com', publicHost)).toBe(goatCounterScript);
	});

	it.each(['localhost', '127.0.0.1', 'dddsw-web.pages.dev', 'pr-12.dddsw-web.pages.dev'])(
		'leaves it out on %s',
		(hostname) => {
			expect(analyticsFor(hostname, publicHost)).toBe('');
		}
	);

	it('adds the local-friendly script on other hosts when testing', () => {
		expect(analyticsFor('localhost', publicHost, true)).toBe(goatCounterTestScript);
		expect(goatCounterTestScript).toContain('"allow_local": true');
	});

	it('keeps the normal script on the public host when testing', () => {
		expect(analyticsFor('dddsouthwest.com', publicHost, true)).toBe(goatCounterScript);
	});
});
