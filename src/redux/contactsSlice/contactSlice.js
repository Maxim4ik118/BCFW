import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getContactsRequest = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkApi) => {}
);

const initialState = {
  contacts: null,
  status: 'idle', // 'idle' | 'pending' | 'resolved' | 'rejected'
  error: null,
};

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState: initialState,
  // Об'єкт редюсерів
  reducers: {},
  extraReducers: builder =>
    builder
      // ----- Get Contacts -----

      .addCase(getContactsRequest.pending, pendingHandler)
      .addCase(getContactsRequest.fulfilled, (state, action) => {})
      .addCase(getContactsRequest.rejected, rejectHandler),

      // ----- Add Contact -----
      // ----- Delete Contact -----
      // ----- Edit Contact -----
});

function pendingHandler(state) {
  state.error = null;
  // Dorobyty
}
function rejectHandler(state, action) {
   // Dorobyty
  state.error = action.payload;
}

// Генератори екшенів(інструкцій)
// export const {} = postsSlice.actions;
// Експортуємо налаштований редюсер слайсу
export const contactReducer = contactsSlice.reducer;
