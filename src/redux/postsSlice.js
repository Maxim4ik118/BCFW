import { createSlice } from '@reduxjs/toolkit';
import { getPostComments, getPostDetails, getPosts, getPostsById } from './operations';

const initialState = {
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
  },
  extraReducers: builder =>
    builder
      // ----- Home Page -----

      .addCase(getPosts.pending, pendingHandler)
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, rejectHandler)

      // ----- Search Page -----

      .addCase(getPostsById.pending, pendingHandler)
      .addCase(getPostsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPostsById.rejected, rejectHandler)

      // ----- Post Details Page -----

      .addCase(getPostDetails.pending, pendingHandler)
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details = action.payload;
      })
      .addCase(getPostDetails.rejected, rejectHandler)
      
      // ----- Post Comments Page -----

      .addCase(getPostComments.pending, pendingHandler)
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(getPostComments.rejected, rejectHandler)
      ,
});

function pendingHandler(state) {
  state.isLoading = true;
  state.error = null;
}
function rejectHandler(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

// Генератори екшенів(інструкцій)
// export const {} = postsSlice.actions;
// Експортуємо налаштований редюсер слайсу
export const postsReducer = postsSlice.reducer;
