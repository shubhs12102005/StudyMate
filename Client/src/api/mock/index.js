import {
  INITIAL_PROFILE,
  INITIAL_SUBJECTS,
  INITIAL_DOCUMENTS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_QUIZZES,
  INITIAL_FLASHCARDS,
  INITIAL_STUDY_PLAN,
  INITIAL_ANALYTICS,
} from './seeds';
import { calculateSM2, gradeToQuality } from '../../lib/sm2';

const STORAGE_PREFIX = 'studymate_mock_';

/**
 * Storage helpers for in-memory + localStorage persistence
 */
function getStorage(key, fallback) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

function setStorage(key, value) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    // ignore in tests or storage quota exceeded
  }
}

/**
 * Simulated latency helper (300ms - 700ms)
 */
function delay(minMs = 250, maxMs = 500) {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Global in-memory cache synchronized with localStorage
let state = {
  profile: getStorage('profile', INITIAL_PROFILE),
  subjects: getStorage('subjects', INITIAL_SUBJECTS),
  documents: getStorage('documents', INITIAL_DOCUMENTS),
  conversations: getStorage('conversations', INITIAL_CONVERSATIONS),
  messages: getStorage('messages', INITIAL_MESSAGES),
  quizzes: getStorage('quizzes', INITIAL_QUIZZES),
  flashcards: getStorage('flashcards', INITIAL_FLASHCARDS),
  studyPlan: getStorage('studyPlan', INITIAL_STUDY_PLAN),
  analytics: getStorage('analytics', INITIAL_ANALYTICS),
  sessionToken: getStorage('sessionToken', 'mock-session-alex-1001'),
};

function persistAll() {
  setStorage('profile', state.profile);
  setStorage('subjects', state.subjects);
  setStorage('documents', state.documents);
  setStorage('conversations', state.conversations);
  setStorage('messages', state.messages);
  setStorage('quizzes', state.quizzes);
  setStorage('flashcards', state.flashcards);
  setStorage('studyPlan', state.studyPlan);
  setStorage('analytics', state.analytics);
  setStorage('sessionToken', state.sessionToken);
}

export const mockApi = {
  /**
   * Reset mock data to clean pristine state
   */
  async resetSeeds() {
    await delay(200);
    state = {
      profile: { ...INITIAL_PROFILE },
      subjects: [...INITIAL_SUBJECTS],
      documents: [...INITIAL_DOCUMENTS],
      conversations: [...INITIAL_CONVERSATIONS],
      messages: [...INITIAL_MESSAGES],
      quizzes: [...INITIAL_QUIZZES],
      flashcards: [...INITIAL_FLASHCARDS],
      studyPlan: { ...INITIAL_STUDY_PLAN },
      analytics: { ...INITIAL_ANALYTICS },
      sessionToken: 'mock-session-alex-1001',
    };
    persistAll();
    return { success: true };
  },

  // ---------------- AUTH API ----------------
  auth: {
    async getSession() {
      await delay(150, 300);
      if (!state.sessionToken) return null;
      return {
        user: state.profile,
        token: state.sessionToken,
      };
    },

    async signIn({ email, password }) {
      await delay(350, 600);
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      state.sessionToken = `mock-session-${Date.now()}`;
      state.profile = {
        ...state.profile,
        email,
      };
      persistAll();
      return {
        user: state.profile,
        token: state.sessionToken,
      };
    },

    async signUp({ email, password, full_name }) {
      await delay(400, 700);
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      state.profile = {
        ...INITIAL_PROFILE,
        id: `usr-${Date.now()}`,
        email,
        full_name: full_name || 'New Scholar',
        study_streak_days: 1,
      };
      state.sessionToken = `mock-session-${Date.now()}`;
      persistAll();
      return {
        user: state.profile,
        token: state.sessionToken,
      };
    },

    async signOut() {
      await delay(200);
      state.sessionToken = null;
      persistAll();
      return { success: true };
    },
  },

  // ---------------- SUBJECTS API ----------------
  subjects: {
    async list() {
      await delay(200, 450);
      return [...state.subjects];
    },

    async get(id) {
      await delay(200, 350);
      const subject = state.subjects.find((s) => s.id === id);
      if (!subject) throw new Error(`Subject ${id} not found`);
      return { ...subject };
    },

    async create({ name, code, color, icon, description }) {
      await delay(300, 600);
      const newSubject = {
        id: `subj-${Date.now()}`,
        user_id: state.profile?.id || 'usr-1001',
        name,
        code: code || 'SUB-101',
        color: color || '#FF6B35',
        icon: icon || 'BookOpen',
        description: description || '',
        document_count: 0,
        flashcard_count: 0,
        quiz_count: 0,
        mastery_percentage: 0,
        created_at: new Date().toISOString(),
      };
      state.subjects.unshift(newSubject);
      persistAll();
      return newSubject;
    },

    async update(id, updates) {
      await delay(250, 450);
      const idx = state.subjects.findIndex((s) => s.id === id);
      if (idx === -1) throw new Error(`Subject ${id} not found`);
      state.subjects[idx] = { ...state.subjects[idx], ...updates };
      persistAll();
      return state.subjects[idx];
    },

    async remove(id) {
      await delay(250, 450);
      state.subjects = state.subjects.filter((s) => s.id !== id);
      state.documents = state.documents.filter((d) => d.subject_id !== id);
      persistAll();
      return { id };
    },
  },

  // ---------------- DOCUMENTS API ----------------
  documents: {
    async list({ subject_id } = {}) {
      await delay(200, 450);
      if (subject_id) {
        return state.documents.filter((d) => d.subject_id === subject_id);
      }
      return [...state.documents];
    },

    async get(id) {
      await delay(200, 350);
      const doc = state.documents.find((d) => d.id === id);
      if (!doc) throw new Error(`Document ${id} not found`);
      return { ...doc };
    },

    async upload({ subject_id, file, title }) {
      await delay(300, 500);

      // Error demonstration trigger if filename has "fail" or "corrupt"
      const shouldFail = (file?.name || title || '').toLowerCase().includes('fail');
      const docId = `doc-${Date.now()}`;

      const newDoc = {
        id: docId,
        subject_id,
        title: title || file?.name || 'Uploaded Document.pdf',
        file_name: file?.name || 'Uploaded_Document.pdf',
        file_size_bytes: file?.size || 1540000,
        file_url: '/sample-biology.pdf',
        page_count: 16,
        status: 'queued',
        processing_progress: 15,
        summary_short: '',
        uploaded_at: new Date().toISOString(),
      };

      state.documents.unshift(newDoc);
      persistAll();

      // Simulate pipeline progression asynchronously: queued -> processing -> ready (or failed)
      setTimeout(() => {
        const docIndex = state.documents.findIndex((d) => d.id === docId);
        if (docIndex !== -1) {
          if (shouldFail) {
            state.documents[docIndex].status = 'failed';
            state.documents[docIndex].processing_progress = 0;
          } else {
            state.documents[docIndex].status = 'processing';
            state.documents[docIndex].processing_progress = 60;
          }
          persistAll();
        }
      }, 1500);

      if (!shouldFail) {
        setTimeout(() => {
          const docIndex = state.documents.findIndex((d) => d.id === docId);
          if (docIndex !== -1 && state.documents[docIndex].status !== 'failed') {
            state.documents[docIndex].status = 'ready';
            state.documents[docIndex].processing_progress = 100;
            state.documents[docIndex].summary_short =
              'Extracted core formulas, reaction diagrams, and 12 high-yield study topics.';
            state.documents[docIndex].summary_bullets = [
              'Key definitions and theorems cataloged.',
              'All page citations indexed for live jump.',
            ];
            persistAll();
          }
        }, 3500);
      }

      return newDoc;
    },

    async remove(id) {
      await delay(200, 400);
      state.documents = state.documents.filter((d) => d.id !== id);
      persistAll();
      return { id };
    },
  },

  // ---------------- CHAT API & STREAMING ----------------
  chat: {
    async listConversations({ subject_id, document_id } = {}) {
      await delay(200, 350);
      return state.conversations.filter((c) => {
        if (subject_id && c.subject_id !== subject_id) return false;
        if (document_id && c.document_id !== document_id) return false;
        return true;
      });
    },

    async getMessages(conversation_id) {
      await delay(200, 350);
      return state.messages.filter((m) => m.conversation_id === conversation_id);
    },

    async createConversation({ subject_id, document_id, title }) {
      await delay(200);
      const newConv = {
        id: `conv-${Date.now()}`,
        subject_id,
        document_id: document_id || null,
        title: title || 'New Study Session',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      state.conversations.unshift(newConv);
      persistAll();
      return newConv;
    },

    /**
     * Async generator simulating token streaming with citations
     */
    async *streamMessage({ conversation_id, content, document_id }) {
      // 1. Record user message
      const userMsg = {
        id: `msg-u-${Date.now()}`,
        conversation_id,
        sender: 'user',
        content,
        citations: [],
        created_at: new Date().toISOString(),
      };
      state.messages.push(userMsg);
      persistAll();

      // 2. Draft realistic AI response based on query
      const fullResponse =
        `Based on your notes, here is the direct answer:\n\n` +
        `The primary kinetic driver is **stereospecific orbital alignment** [p. 14]. ` +
        `When energy barriers are surmounted, the transition state reaches maximum potential energy, ` +
        `forcing inversion across the planar intermediate [p. 19].\n\n` +
        `> **Key Takeaway**: Always verify solvent polarity and leaving group ability before predicting the final substitution ratio.`;

      const citations = [
        {
          document_id: document_id || 'doc-1',
          document_title: 'Organic_Chem_Ch4_Mechanisms.pdf',
          page: 14,
          snippet: 'Backside attack causes inversion of configuration at the chiral center.',
        },
        {
          document_id: document_id || 'doc-1',
          document_title: 'Organic_Chem_Ch4_Mechanisms.pdf',
          page: 19,
          snippet: 'Polar aprotic solvents accelerate rate constants by un-caging anionic species.',
        },
      ];

      // Yield tokens progressively
      const tokens = fullResponse.split(' ');
      let accumulated = '';
      for (const token of tokens) {
        await new Promise((r) => setTimeout(r, 35));
        accumulated += (accumulated ? ' ' : '') + token;
        yield {
          chunk: token + ' ',
          content: accumulated,
          isDone: false,
        };
      }

      // Record final assistant message
      const assistantMsg = {
        id: `msg-a-${Date.now()}`,
        conversation_id,
        sender: 'assistant',
        content: accumulated,
        citations,
        created_at: new Date().toISOString(),
      };
      state.messages.push(assistantMsg);
      persistAll();

      yield {
        chunk: '',
        content: accumulated,
        citations,
        isDone: true,
        message: assistantMsg,
      };
    },
  },

  // ---------------- FLASHCARDS & SM-2 ----------------
  flashcards: {
    async list({ subject_id } = {}) {
      await delay(200, 400);
      if (subject_id) {
        return state.flashcards.filter((f) => f.subject_id === subject_id);
      }
      return [...state.flashcards];
    },

    async listDue({ subject_id } = {}) {
      await delay(200, 350);
      const now = new Date();
      return state.flashcards.filter((f) => {
        if (subject_id && f.subject_id !== subject_id) return false;
        return new Date(f.next_review_date) <= now;
      });
    },

    /**
     * Review flashcard using SM-2 algorithm
     * @param {Object} params
     * @param {string} params.card_id
     * @param {number} params.grade - 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
     */
    async review({ card_id, grade }) {
      await delay(200, 350);
      const card = state.flashcards.find((f) => f.id === card_id);
      if (!card) throw new Error(`Flashcard ${card_id} not found`);

      const quality = gradeToQuality(grade);
      const sm2Result = calculateSM2({
        quality,
        repetitions: card.repetitions,
        easeFactor: card.ease_factor,
        intervalDays: card.interval_days,
      });

      card.repetitions = sm2Result.repetitions;
      card.ease_factor = sm2Result.easeFactor;
      card.interval_days = sm2Result.intervalDays;
      card.next_review_date = sm2Result.nextReviewDate;
      card.last_reviewed_at = new Date().toISOString();

      persistAll();
      return { ...card };
    },
  },

  // ---------------- QUIZZES API ----------------
  quizzes: {
    async list({ subject_id } = {}) {
      await delay(200, 400);
      if (subject_id) {
        return state.quizzes.filter((q) => q.subject_id === subject_id);
      }
      return [...state.quizzes];
    },

    async get(id) {
      await delay(200, 350);
      const quiz = state.quizzes.find((q) => q.id === id);
      if (!quiz) throw new Error(`Quiz ${id} not found`);
      return { ...quiz };
    },

    async submitAttempt({ quiz_id, user_answers, time_spent_seconds }) {
      await delay(400, 700);
      const quiz = state.quizzes.find((q) => q.id === quiz_id);
      if (!quiz) throw new Error(`Quiz ${quiz_id} not found`);

      let correct = 0;
      quiz.questions.forEach((q, idx) => {
        if (user_answers[idx] === q.correct_option_index) {
          correct++;
        }
      });

      const scorePct = Math.round((correct / quiz.questions.length) * 100);
      if (scorePct > quiz.best_score_percentage) {
        quiz.best_score_percentage = scorePct;
      }

      persistAll();
      return {
        quiz_id,
        score_percentage: scorePct,
        correct_count: correct,
        total_questions: quiz.questions.length,
        time_spent_seconds,
        weak_topics: scorePct < 70 ? ['Substrate Sterics', 'Leaving Group Trends'] : [],
      };
    },
  },

  // ---------------- PLANNER API ----------------
  planner: {
    async getPlan() {
      await delay(200, 350);
      return { ...state.studyPlan };
    },

    async toggleTask(task_id) {
      await delay(150, 300);
      const task = state.studyPlan.tasks.find((t) => t.id === task_id);
      if (!task) throw new Error(`Task ${task_id} not found`);
      task.is_completed = !task.is_completed;
      persistAll();
      return { ...task };
    },
  },

  // ---------------- ANALYTICS API ----------------
  analytics: {
    async overview() {
      await delay(250, 450);
      return { ...state.analytics };
    },
  },
};
