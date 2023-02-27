import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { postsReducer } from './postsSlice';

const postsReducerConfig = {
  key: 'user',
  storage,
  whitelist: ['comments']
};


export const store = configureStore({
  reducer: {
    postData: persistReducer(postsReducerConfig, postsReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// state = {
//     postData: {
//         posts: null,
//         isLoading: false,
//         error: null,
//       },
// }

// state.postData.posts - пости користувача
