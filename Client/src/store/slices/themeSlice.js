import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('studymate_theme');
    if (saved === 'dark' || saved === 'midnight') return 'midnight';
    if (saved === 'paper' || saved === 'light') return 'paper';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'midnight';
    }
  }
  return 'paper';
};

const initialState = {
  mode: getInitialTheme(), // 'paper' | 'midnight'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'paper' ? 'midnight' : 'paper';
      if (typeof window !== 'undefined') {
        localStorage.setItem('studymate_theme', state.mode);
        if (state.mode === 'midnight') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('studymate_theme', state.mode);
        if (state.mode === 'midnight') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
