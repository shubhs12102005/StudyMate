/**
 * Main API entry point for StudyMate.
 * 
 * Exports the active API implementation chosen by VITE_DATA_SOURCE.
 * Currently uses mock API. A later phase can introduce Supabase
 * without modifying any component or Redux slice.
 */
import { mockApi } from './mock/index';

const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || 'mock';

let apiImplementation = mockApi;

if (DATA_SOURCE === 'supabase') {
  console.warn('[StudyMate API] Supabase provider will be integrated in Phase 8.');
  apiImplementation = mockApi;
}

export const api = apiImplementation;
export default api;
