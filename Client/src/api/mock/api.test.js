import { describe, it, expect, beforeEach } from 'vitest';
import { mockApi } from './index';

describe('StudyMate Mock API Layer', () => {
  beforeEach(async () => {
    await mockApi.resetSeeds();
  });

  it('authenticates session and signs in successfully', async () => {
    const session = await mockApi.auth.getSession();
    expect(session).toBeDefined();
    expect(session.user.email).toBe('alex.study@university.edu');

    const signedIn = await mockApi.auth.signIn({
      email: 'scholar@oxford.edu',
      password: 'password123',
    });
    expect(signedIn.user.email).toBe('scholar@oxford.edu');
    expect(signedIn.token).toBeDefined();
  });

  it('lists subjects and creates a new notebook subject', async () => {
    const subjects = await mockApi.subjects.list();
    expect(subjects.length).toBeGreaterThanOrEqual(3);

    const created = await mockApi.subjects.create({
      name: 'Quantum Mechanics I',
      code: 'PHYS-301',
      color: '#6D4AFF',
      icon: 'Atom',
      description: 'Wavefunctions, Hilbert space, Schrödinger equation.',
    });

    expect(created.id).toBeDefined();
    expect(created.name).toBe('Quantum Mechanics I');

    const updatedList = await mockApi.subjects.list();
    expect(updatedList.some((s) => s.id === created.id)).toBe(true);
  });

  it('uploads a document and initiates progressive status', async () => {
    const upload = await mockApi.documents.upload({
      subject_id: 'subj-1',
      title: 'Dynamic Programming Lecture Notes.pdf',
    });

    expect(upload.id).toBeDefined();
    expect(upload.status).toBe('queued');
    expect(upload.processing_progress).toBe(15);
  });

  it('reviews a flashcard and updates SM-2 schedule', async () => {
    const cards = await mockApi.flashcards.list();
    const firstCard = cards[0];
    const originalInterval = firstCard.interval_days;

    const reviewed = await mockApi.flashcards.review({
      card_id: firstCard.id,
      grade: 4, // Easy
    });

    expect(reviewed.repetitions).toBeGreaterThan(0);
    expect(reviewed.last_reviewed_at).toBeDefined();
    expect(reviewed.next_review_date).toBeDefined();
  });

  it('submits a quiz attempt and calculates percentage', async () => {
    const quizzes = await mockApi.quizzes.list();
    const quiz = quizzes[0];

    const result = await mockApi.quizzes.submitAttempt({
      quiz_id: quiz.id,
      user_answers: { 0: 1, 1: 2, 2: 2 }, // Answers
      time_spent_seconds: 145,
    });

    expect(result.quiz_id).toBe(quiz.id);
    expect(result.score_percentage).toBeGreaterThanOrEqual(0);
    expect(result.total_questions).toBe(quiz.questions.length);
  });

  it('toggles a study planner task completion state', async () => {
    const plan = await mockApi.planner.getPlan();
    const task = plan.tasks[0];
    const initialCompleted = task.is_completed;

    const toggled = await mockApi.planner.toggleTask(task.id);
    expect(toggled.is_completed).toBe(!initialCompleted);
  });

  it('retrieves analytics overview', async () => {
    const stats = await mockApi.analytics.overview();
    expect(stats.questions_quota_daily).toBe(50);
    expect(stats.weekly_study_time.length).toBe(7);
  });
});
