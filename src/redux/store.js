import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contactsSlice/contactSlice';
import { userReducer } from './userSlice/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// state = {
//     postData: {
//         posts: null,
//         isLoading: false,
//         error: null,
//       },
// }

// state.postData.posts - пости користувача
