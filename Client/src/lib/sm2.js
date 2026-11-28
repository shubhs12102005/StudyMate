/**
 * SuperMemo-2 (SM-2) Spaced Repetition Algorithm
 * 
 * Quality response scale:
 * 0 - Blackout / Complete failure
 * 1 - Incorrect; familiar upon seeing answer ("Again")
 * 2 - Incorrect; where the correct one seemed easy to recall ("Hard")
 * 3 - Correct with serious difficulty ("Good")
 * 4 - Correct after hesitation ("Easy")
 * 5 - Perfect recall
 */

/**
 * @typedef {Object} SM2Input
 * @property {number} quality - Rating from 0 (complete blackout) to 5 (perfect recall)
 * @property {number} [repetitions=0] - Number of consecutive successful recalls
 * @property {number} [easeFactor=2.5] - Current ease factor (minimum 1.3)
 * @property {number} [intervalDays=0] - Current interval in days
 */

/**
 * @typedef {Object} SM2Result
 * @property {number} repetitions - Updated consecutive successful reviews count
 * @property {number} easeFactor - Updated ease factor (minimum 1.3)
 * @property {number} intervalDays - Updated interval until next review in days
 * @property {string} nextReviewDate - ISO date string for next scheduled review
 */

/**
 * Calculate the next review schedule using the SuperMemo-2 algorithm.
 * 
 * Formula:
 * EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 * EF' is capped at minimum 1.3.
 * 
 * If quality < 3:
 *   repetitions = 0, interval = 1 day.
 * Else (quality >= 3):
 *   if repetitions == 0 -> interval = 1 day
 *   if repetitions == 1 -> interval = 6 days
 *   if repetitions >= 2 -> interval = round(previous_interval * EF')
 *   repetitions += 1
 * 
 * @param {SM2Input} params
 * @returns {SM2Result}
 */
export function calculateSM2({
  quality,
  repetitions = 0,
  easeFactor = 2.5,
  intervalDays = 0,
}) {
  // Clamp quality between 0 and 5
  const q = Math.max(0, Math.min(5, Math.round(quality)));

  // Calculate new Ease Factor (EF')
  let newEase = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEase < 1.3) {
    newEase = 1.3;
  }
  // Round to 2 decimal places
  newEase = Math.round(newEase * 100) / 100;

  let newRepetitions = repetitions;
  let newInterval = 1;

  if (q < 3) {
    // Failed recall: reset repetitions count and schedule for 1 day
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Successful recall
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(intervalDays * newEase);
    }
    newRepetitions = repetitions + 1;
  }

  // Calculate next review ISO date
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + newInterval);
  nextDate.setHours(4, 0, 0, 0); // Scheduled for 4:00 AM next day

  return {
    repetitions: newRepetitions,
    easeFactor: newEase,
    intervalDays: newInterval,
    nextReviewDate: nextDate.toISOString(),
  };
}

/**
 * Maps quick 1-4 UI rating buttons to SM-2 quality scores
 * 1: Again (q=1)
 * 2: Hard (q=2)
 * 3: Good (q=4)
 * 4: Easy (q=5)
 * 
 * @param {number} buttonGrade
 * @returns {number} SM-2 quality grade (0-5)
 */
export function gradeToQuality(buttonGrade) {
  switch (buttonGrade) {
    case 1:
      return 1; // Again
    case 2:
      return 2; // Hard
    case 3:
      return 4; // Good
    case 4:
      return 5; // Easy
    default:
      return 3;
  }
}

/**
 * Format interval days into human-friendly study desk label
 * @param {number} days
 * @returns {string}
 */
export function formatInterval(days) {
  if (days <= 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 30) return `${days}d`;
  const months = Math.round(days / 30);
  return `${months}mo`;
}
