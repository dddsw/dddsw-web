import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MilestoneDetails, Status } from './milestones';

describe('MilestoneDetails', () => {
	describe('constructor', () => {
		describe('without date', () => {
			describe('Status.Done', () => {
				it('sets hasHappened to true', () => {
					const m = new MilestoneDetails(Status.Done);
					expect(m.hasHappened).toBe(true);
				});

				it('sets hasNotHappened to false', () => {
					const m = new MilestoneDetails(Status.Done);
					expect(m.hasNotHappened).toBe(false);
				});

				it('leaves formattedDate undefined', () => {
					const m = new MilestoneDetails(Status.Done);
					expect(m.formattedDate).toBeUndefined();
				});
			});

			describe('Status.NotYet', () => {
				it('sets hasHappened to false', () => {
					const m = new MilestoneDetails(Status.NotYet);
					expect(m.hasHappened).toBe(false);
				});

				it('sets hasNotHappened to true', () => {
					const m = new MilestoneDetails(Status.NotYet);
					expect(m.hasNotHappened).toBe(true);
				});

				it('leaves formattedDate undefined', () => {
					const m = new MilestoneDetails(Status.NotYet);
					expect(m.formattedDate).toBeUndefined();
				});
			});
		});

		describe('with date', () => {
			describe('Status.Done', () => {
				it('sets hasHappened to true', () => {
					const m = new MilestoneDetails(Status.Done, '2025-01-15');
					expect(m.hasHappened).toBe(true);
				});

				it('sets hasNotHappened to false', () => {
					const m = new MilestoneDetails(Status.Done, '2025-01-15');
					expect(m.hasNotHappened).toBe(false);
				});

				it('sets formattedDate in en-GB long format', () => {
					const m = new MilestoneDetails(Status.Done, '2025-01-15');
					expect(m.formattedDate).toBe('15 January 2025');
				});
			});

			describe('Status.NotYet', () => {
				it('sets hasHappened to false', () => {
					const m = new MilestoneDetails(Status.NotYet, '2099-12-31');
					expect(m.hasHappened).toBe(false);
				});

				it('sets hasNotHappened to true', () => {
					const m = new MilestoneDetails(Status.NotYet, '2099-12-31');
					expect(m.hasNotHappened).toBe(true);
				});

				it('sets formattedDate in en-GB long format', () => {
					const m = new MilestoneDetails(Status.NotYet, '2099-12-31');
					expect(m.formattedDate).toBe('31 December 2099');
				});
			});

			describe('Status.JustYouWait', () => {
				describe('with a past date', () => {
					it('sets hasHappened to true', () => {
						const m = new MilestoneDetails(Status.JustYouWait, '2020-01-01');
						expect(m.hasHappened).toBe(true);
					});

					it('sets hasNotHappened to false', () => {
						const m = new MilestoneDetails(Status.JustYouWait, '2020-01-01');
						expect(m.hasNotHappened).toBe(false);
					});

					it('sets formattedDate in en-GB long format', () => {
						const m = new MilestoneDetails(Status.JustYouWait, '2020-01-01');
						expect(m.formattedDate).toBe('1 January 2020');
					});
				});

				describe('with a future date', () => {
					it('sets hasHappened to false', () => {
						const m = new MilestoneDetails(Status.JustYouWait, '2099-01-01');
						expect(m.hasHappened).toBe(false);
					});

					it('sets hasNotHappened to true', () => {
						const m = new MilestoneDetails(Status.JustYouWait, '2099-01-01');
						expect(m.hasNotHappened).toBe(true);
					});
				});

				describe('flips at UTC midnight', () => {
					afterEach(() => {
						vi.useRealTimers();
					});

					it('has not happened one ms before UTC midnight', () => {
						vi.setSystemTime(new Date('2026-05-15T23:59:59.999Z'));
						const m = new MilestoneDetails(Status.JustYouWait, '2026-05-16');
						expect(m.hasHappened).toBe(false);
					});

					it('has happened one ms after UTC midnight', () => {
						vi.setSystemTime(new Date('2026-05-16T00:00:00.001Z'));
						const m = new MilestoneDetails(Status.JustYouWait, '2026-05-16');
						expect(m.hasHappened).toBe(true);
					});
				});
			});
		});
	});

	describe('willBeHappeningSoon()', () => {
		let now: Date;

		beforeEach(() => {
			now = new Date('2026-03-25T12:00:00Z');
			vi.useFakeTimers();
			vi.setSystemTime(now);
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		describe('without date', () => {
			it('returns false for Status.Done', () => {
				const m = new MilestoneDetails(Status.Done);
				expect(m.willBeHappeningSoon()).toBe(false);
			});

			it('returns false for Status.NotYet', () => {
				const m = new MilestoneDetails(Status.NotYet);
				expect(m.willBeHappeningSoon()).toBe(false);
			});
		});

		describe('when the milestone has already happened', () => {
			it('returns false for Status.Done with date', () => {
				const m = new MilestoneDetails(Status.Done, '2025-01-01');
				expect(m.willBeHappeningSoon()).toBe(false);
			});

			it('returns false for Status.JustYouWait with a past date', () => {
				const m = new MilestoneDetails(Status.JustYouWait, '2020-01-01');
				expect(m.willBeHappeningSoon()).toBe(false);
			});
		});

		describe('when the milestone has not happened yet', () => {
			it('returns true when targetDate is tomorrow', () => {
				const m = new MilestoneDetails(Status.NotYet, '2026-03-26');
				expect(m.willBeHappeningSoon()).toBe(true);
			});

			it('returns true when targetDate is just inside the one-month boundary', () => {
				const m = new MilestoneDetails(Status.NotYet, '2026-04-24');
				expect(m.willBeHappeningSoon()).toBe(true);
			});

			it('returns false when targetDate is just outside the one-month boundary', () => {
				const m = new MilestoneDetails(Status.NotYet, '2026-05-01');
				expect(m.willBeHappeningSoon()).toBe(false);
			});

			it('returns false when targetDate is far in the future', () => {
				const m = new MilestoneDetails(Status.NotYet, '2099-12-31');
				expect(m.willBeHappeningSoon()).toBe(false);
			});

			it('returns true for Status.JustYouWait within one month', () => {
				const m = new MilestoneDetails(Status.JustYouWait, '2026-04-10');
				expect(m.willBeHappeningSoon()).toBe(true);
			});

			it('returns false for Status.JustYouWait beyond one month', () => {
				const m = new MilestoneDetails(Status.JustYouWait, '2026-05-20');
				expect(m.willBeHappeningSoon()).toBe(false);
			});
		});
	});
});
