import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from '../../api/index';

export const apiSlice = createApi({
  reducerPath: 'studyMateApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Subject', 'Document', 'Flashcard', 'Quiz', 'Plan', 'Analytics', 'Conversation'],
  endpoints: (builder) => ({
    // Subjects
    getSubjects: builder.query({
      async queryFn() {
        try {
          const data = await api.subjects.list();
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Subject'],
    }),
    getSubjectById: builder.query({
      async queryFn(id) {
        try {
          const data = await api.subjects.get(id);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'Subject', id }],
    }),
    createSubject: builder.mutation({
      async queryFn(newSubject) {
        try {
          const data = await api.subjects.create(newSubject);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Subject'],
    }),
    deleteSubject: builder.mutation({
      async queryFn(id) {
        try {
          const data = await api.subjects.remove(id);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Subject', 'Document'],
    }),

    // Documents
    getDocuments: builder.query({
      async queryFn(params = {}) {
        try {
          const data = await api.documents.list(params);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Document'],
    }),
    uploadDocument: builder.mutation({
      async queryFn(payload) {
        try {
          const data = await api.documents.upload(payload);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Document', 'Subject'],
    }),
    deleteDocument: builder.mutation({
      async queryFn(id) {
        try {
          const data = await api.documents.remove(id);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Document', 'Subject'],
    }),

    // Flashcards & SM-2
    getFlashcards: builder.query({
      async queryFn(params = {}) {
        try {
          const data = await api.flashcards.list(params);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Flashcard'],
    }),
    getDueFlashcards: builder.query({
      async queryFn(params = {}) {
        try {
          const data = await api.flashcards.listDue(params);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Flashcard'],
    }),
    reviewFlashcard: builder.mutation({
      async queryFn({ card_id, grade }) {
        try {
          const data = await api.flashcards.review({ card_id, grade });
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Flashcard', 'Analytics'],
    }),

    // Quizzes
    getQuizzes: builder.query({
      async queryFn(params = {}) {
        try {
          const data = await api.quizzes.list(params);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Quiz'],
    }),
    submitQuizAttempt: builder.mutation({
      async queryFn(payload) {
        try {
          const data = await api.quizzes.submitAttempt(payload);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Quiz', 'Analytics'],
    }),

    // Study Plan
    getStudyPlan: builder.query({
      async queryFn() {
        try {
          const data = await api.planner.getPlan();
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Plan'],
    }),
    toggleStudyTask: builder.mutation({
      async queryFn(taskId) {
        try {
          const data = await api.planner.toggleTask(taskId);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Plan'],
    }),

    // Analytics
    getAnalytics: builder.query({
      async queryFn() {
        try {
          const data = await api.analytics.overview();
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Analytics'],
    }),

    // Conversations
    getConversations: builder.query({
      async queryFn(params = {}) {
        try {
          const data = await api.chat.listConversations(params);
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Conversation'],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectByIdQuery,
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useGetDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useGetFlashcardsQuery,
  useGetDueFlashcardsQuery,
  useReviewFlashcardMutation,
  useGetQuizzesQuery,
  useSubmitQuizAttemptMutation,
  useGetStudyPlanQuery,
  useToggleStudyTaskMutation,
  useGetAnalyticsQuery,
  useGetConversationsQuery,
} = apiSlice;
