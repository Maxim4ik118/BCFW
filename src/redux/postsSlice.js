import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testInputText: '',
  details: null,
  comments: null,
  posts: null,
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  // Ім'я слайсу
  name: 'posts',
  // Початковий стан редюсера слайсу
  initialState: initialState,
  // Об'єкт редюсерів
  reducers: {
    setTestInputText(state, action) {
      state.testInputText = action.payload;
    },
    setComments(state, action) {
      // action - { type: "posts/setComments", payload: [{}, {}, ..., {}] }
      state.comments = action.payload;
    },
    clearComments(state) {
      // action - { type: "posts/clearComments" }
      state.comments = null;
    },
    setDetails(state, action) {
      // action - { type: "posts/setDetails", payload: {...} }
      state.details = action.payload;
    },
    setPosts(state, action) {
      // action - { type: "posts/setPosts", payload: [{}, {}, ..., {}] }
      state.posts = action.payload;
    },
    setIsLoading(state, action) {
      // action - { type: "posts/setIsLoading", payload: true }
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Генератори екшенів(інструкцій)
export const {
  setTestInputText,
  clearComments,
  setComments,
  setDetails,
  setPosts,
  setIsLoading,
  setError,
} = postsSlice.actions;
// Експортуємо налаштований редюсер слайсу
export const postsReducer = postsSlice.reducer;
