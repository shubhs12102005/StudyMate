/**
 * @file contracts.js
 * JSDoc typedefs for every entity in StudyMate.
 * 
 * All fields strictly use snake_case to mirror future PostgreSQL / Supabase
 * table schemas. UI components and Redux slices interact with these contracts
 * exclusively through /src/api.
 */

/**
 * @typedef {Object} Profile
 * @property {string} id - UUID primary key
 * @property {string} email - User email address
 * @property {string} full_name - User display name
 * @property {string|null} avatar_url - User profile photo URL
 * @property {number} study_streak_days - Consecutive days studied
 * @property {string|null} target_exam_date - Next primary exam target date (YYYY-MM-DD)
 * @property {string} theme_preference - 'paper' | 'midnight'
 * @property {string} created_at - ISO timestamp
 */

/**
 * @typedef {Object} Subject
 * @property {string} id - UUID primary key
 * @property {string} user_id - Owner profile UUID
 * @property {string} name - Subject title (e.g., "Organic Chemistry")
 * @property {string} code - Subject code (e.g., "CHEM-202")
 * @property {string} color - Notebook spine accent hex (e.g., "#FF6B35")
 * @property {string} icon - Lucide icon identifier (e.g., "FlaskConical")
 * @property {string} description - Brief subject focus summary
 * @property {number} document_count - Total documents uploaded
 * @property {number} flashcard_count - Total flashcards created
 * @property {number} quiz_count - Total quizzes generated
 * @property {number} mastery_percentage - Current calculated mastery (0-100)
 * @property {string} created_at - ISO timestamp
 */

/**
 * @typedef {'queued' | 'processing' | 'ready' | 'failed'} DocumentStatus
 */

/**
 * @typedef {Object} Document
 * @property {string} id - UUID primary key
 * @property {string} subject_id - Parent Subject UUID
 * @property {string} title - Human-readable document name
 * @property {string} file_name - Original uploaded filename
 * @property {number} file_size_bytes - File size in bytes
 * @property {string} file_url - Static URL or blob reference
 * @property {number} page_count - Total pages in document
 * @property {DocumentStatus} status - Pipeline progression status
 * @property {number} processing_progress - Progress percentage during processing (0-100)
 * @property {string} [summary_short] - 2-3 sentence executive summary
 * @property {string} [summary_detailed] - In-depth structured study summary
 * @property {string[]} [summary_bullets] - Key takeaway bullet points
 * @property {string} uploaded_at - ISO timestamp
 */

/**
 * @typedef {Object} Chunk
 * @property {string} id - UUID primary key
 * @property {string} document_id - Parent document UUID
 * @property {number} page_number - Page where chunk occurs
 * @property {number} chunk_index - Ordered index within page
 * @property {string} content - Extracted text content
 */

/**
 * @typedef {Object} Conversation
 * @property {string} id - UUID primary key
 * @property {string} subject_id - Parent subject UUID
 * @property {string|null} document_id - Active focused document UUID or null
 * @property {string} title - Conversation title
 * @property {string} created_at - ISO timestamp
 * @property {string} updated_at - ISO timestamp
 */

/**
 * @typedef {Object} Citation
 * @property {string} document_id - Source document UUID
 * @property {string} document_title - Source document title
 * @property {number} page - Page number in PDF
 * @property {string} snippet - Verbatim source passage
 */

/**
 * @typedef {Object} Message
 * @property {string} id - UUID primary key
 * @property {string} conversation_id - Parent conversation UUID
 * @property {'user' | 'assistant'} sender - Author of message
 * @property {string} content - Markdown content of message
 * @property {Citation[]} citations - Exact citation references
 * @property {string} created_at - ISO timestamp
 */

/**
 * @typedef {'easy' | 'medium' | 'hard'} QuizDifficulty
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {string} id - Question ID
 * @property {string} prompt - Question text
 * @property {string[]} options - 4 multiple choice options
 * @property {number} correct_option_index - 0-3 index of correct choice
 * @property {string} explanation - Academic explanation with rationale
 * @property {Citation|null} citation - Source citation
 */

/**
 * @typedef {Object} Quiz
 * @property {string} id - UUID primary key
 * @property {string} subject_id - Parent subject UUID
 * @property {string[]} document_ids - Source document UUIDs
 * @property {string} title - Quiz title
 * @property {QuizDifficulty} difficulty - Target difficulty
 * @property {QuizQuestion[]} questions - Array of questions
 * @property {number} best_score_percentage - Highest percentage achieved
 * @property {string} created_at - ISO timestamp
 */

/**
 * @typedef {Object} QuizAttempt
 * @property {string} id - UUID primary key
 * @property {string} quiz_id - Target quiz UUID
 * @property {Record<number, number>} user_answers - question_idx -> chosen_option_idx
 * @property {number} score_percentage - Calculated score (0-100)
 * @property {number} time_spent_seconds - Seconds taken
 * @property {string[]} weak_topics - Topics requiring reinforcement
 * @property {string} completed_at - ISO timestamp
 */

/**
 * @typedef {Object} Flashcard
 * @property {string} id - UUID primary key
 * @property {string} subject_id - Parent subject UUID
 * @property {string|null} document_id - Source document UUID
 * @property {string} front - Question or prompt (Index card front)
 * @property {string} back - Answer and explanation (Index card back)
 * @property {string} topic - Category tag (e.g., "Reaction Mechanisms")
 * @property {number} ease_factor - SM-2 ease factor (default 2.5)
 * @property {number} interval_days - Current review interval in days
 * @property {number} repetitions - Consecutive successful reviews count
 * @property {string} next_review_date - ISO date string for next review
 * @property {string|null} last_reviewed_at - ISO timestamp of last review
 * @property {string} created_at - ISO timestamp
 */

/**
 * @typedef {'read' | 'quiz' | 'flashcards' | 'summary'} TaskType
 */

/**
 * @typedef {Object} StudyTask
 * @property {string} id - UUID primary key
 * @property {string} plan_id - Parent study plan UUID
 * @property {string} subject_id - Associated subject UUID
 * @property {string} title - Task description
 * @property {string} scheduled_date - Scheduled date (YYYY-MM-DD)
 * @property {number} duration_minutes - Estimated duration
 * @property {boolean} is_completed - Checkbox completion state
 * @property {TaskType} task_type - Category of task
 * @property {number} order - Ordering within the day
 */

/**
 * @typedef {Object} StudyPlan
 * @property {string} id - UUID primary key
 * @property {string} user_id - Owner profile UUID
 * @property {string} subject_id - Target subject UUID
 * @property {string} title - Plan title (e.g., "Midterm Prep")
 * @property {string} exam_date - Target exam date (YYYY-MM-DD)
 * @property {number} daily_target_hours - Target study hours per day
 * @property {StudyTask[]} tasks - Array of generated tasks
 * @property {string} created_at - ISO timestamp
 */

/**
 * @typedef {Object} WeakTopic
 * @property {string} topic - Topic name
 * @property {string} subject_name - Subject
 * @property {number} accuracy_percentage - Accuracy percentage
 * @property {number} review_count - Number of times attempted
 */

/**
 * @typedef {Object} DailyStudyTime
 * @property {string} date - Date label (e.g., "Nov 18")
 * @property {number} minutes - Minutes studied
 * @property {number} target_minutes - Daily goal
 */

/**
 * @typedef {Object} UsageStats
 * @property {number} questions_asked_today - Daily AI queries used
 * @property {number} questions_quota_daily - Daily maximum allowance (e.g. 50)
 * @property {number} pages_analyzed_total - Total PDF pages processed
 * @property {number} total_study_minutes - Cumulative study minutes
 * @property {DailyStudyTime[]} weekly_study_time - Last 7 days breakdown
 * @property {WeakTopic[]} weak_topics - Flagged topics needing review
 * @property {Array<{ date: string, score: number }>} quiz_trends - Score trend
 */
