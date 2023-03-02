import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAPI } from 'services/api';

export const loginRequest = createAsyncThunk(
  'user/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await UserAPI.login(formData);
      localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const registerRequest = createAsyncThunk(
  'user/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await UserAPI.register(formData);
      localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logOutRequest = createAsyncThunk(
  'user/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserAPI.logOut();
      localStorage.removeItem('token');

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCurrentUserRequest = createAsyncThunk(
  'user/getCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserAPI.getUserDetails();

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userData: {
    name: null,
    email: null,
  },
  isLoggedIn: false,
  status: 'idle', // 'idle' | 'pending' | 'resolved' | 'rejected'
  error: null,
};

const userSlice = createSlice({
  // Ім'я слайсу
  name: 'user',
  // Початковий стан редюсера слайсу
  initialState: initialState,
  // Об'єкт редюсерів
  reducers: {},
  extraReducers: builder =>
    builder
      // ----- Login -----

      .addCase(loginRequest.pending, pendingHandler)
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.isLoggedIn = true;
        state.userData.name = action.payload.user.name;
        state.userData.email = action.payload.user.email;
      })
      .addCase(loginRequest.rejected, rejectHandler)

      // ----- Regiser -----

      .addCase(registerRequest.pending, pendingHandler)
      .addCase(registerRequest.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.isLoggedIn = true;
        state.userData.name = action.payload.user.name;
        state.userData.email = action.payload.user.email;
      })
      .addCase(registerRequest.rejected, rejectHandler)

      // ----- Get current user -----

      .addCase(getCurrentUserRequest.pending, pendingHandler)
      .addCase(getCurrentUserRequest.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.isLoggedIn = true;
        state.userData.name = action.payload.name;
        state.userData.email = action.payload.email;
      })
      .addCase(getCurrentUserRequest.rejected, rejectHandler)


      // ----- Logout -----
      .addCase(logOutRequest.pending, pendingHandler)
      .addCase(logOutRequest.fulfilled, (state) => {
        state.status = 'resolved';
        state.isLoggedIn = false;
        state.userData.name = null;
        state.userData.email = null;
      })
      .addCase(logOutRequest.rejected, rejectHandler),
});

function pendingHandler(state) {
  state.error = null;
  state.status = 'pending';
}
function rejectHandler(state, action) {
  state.error = action.payload;
  state.status = 'rejected';
}

// Генератори екшенів(інструкцій)
// export const {} = postsSlice.actions;
// Експортуємо налаштований редюсер слайсу
export const userReducer = userSlice.reducer;
