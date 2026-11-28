import { describe, it, expect } from 'vitest';
import { calculateSM2, gradeToQuality, formatInterval } from './sm2';

describe('SuperMemo-2 (SM-2) Spaced Repetition Engine', () => {
  it('correctly schedules first review on quality >= 3 (interval = 1 day, repetitions = 1)', () => {
    const result = calculateSM2({
      quality: 4, // Easy
      repetitions: 0,
      easeFactor: 2.5,
      intervalDays: 0,
    });

    expect(result.repetitions).toBe(1);
    expect(result.intervalDays).toBe(1);
    expect(result.easeFactor).toBe(2.5); // 2.5 + (0.1 - (5-4)*(0.08 + (5-4)*0.02)) = 2.5 + (0.1 - 0.1) = 2.5
    expect(result.nextReviewDate).toBeDefined();
  });

  it('correctly schedules second review on quality >= 3 (interval = 6 days, repetitions = 2)', () => {
    const result = calculateSM2({
      quality: 5, // Perfect
      repetitions: 1,
      easeFactor: 2.5,
      intervalDays: 1,
    });

    expect(result.repetitions).toBe(2);
    expect(result.intervalDays).toBe(6);
    expect(result.easeFactor).toBe(2.6); // 2.5 + 0.1 = 2.6
  });

  it('calculates third review interval using previous_interval * easeFactor', () => {
    const result = calculateSM2({
      quality: 4,
      repetitions: 2,
      easeFactor: 2.6,
      intervalDays: 6,
    });

    expect(result.repetitions).toBe(3);
    // 6 * 2.6 = 15.6 -> rounded to 16
    expect(result.intervalDays).toBe(16);
    expect(result.easeFactor).toBe(2.6);
  });

  it('resets repetitions to 0 and interval to 1 on failure (quality < 3)', () => {
    const result = calculateSM2({
      quality: 1, // Again
      repetitions: 4,
      easeFactor: 2.6,
      intervalDays: 28,
    });

    expect(result.repetitions).toBe(0);
    expect(result.intervalDays).toBe(1);
    expect(result.easeFactor).toBeLessThan(2.6); // Ease factor decreases
  });

  it('enforces minimum ease factor boundary of 1.3', () => {
    const result = calculateSM2({
      quality: 0, // Complete failure repeatedly
      repetitions: 0,
      easeFactor: 1.35,
      intervalDays: 1,
    });

    expect(result.easeFactor).toBe(1.3); // Never drops below 1.3
  });

  it('correctly maps 1-4 UI grades to 0-5 SM2 quality ratings', () => {
    expect(gradeToQuality(1)).toBe(1); // Again
    expect(gradeToQuality(2)).toBe(2); // Hard
    expect(gradeToQuality(3)).toBe(4); // Good
    expect(gradeToQuality(4)).toBe(5); // Easy
  });

  it('formats interval days into human-friendly study desk labels', () => {
    expect(formatInterval(0)).toBe('Today');
    expect(formatInterval(1)).toBe('Tomorrow');
    expect(formatInterval(6)).toBe('6d');
    expect(formatInterval(16)).toBe('16d');
    expect(formatInterval(60)).toBe('2mo');
  });
});
