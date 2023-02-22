import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./postsSlice";

export const store = configureStore({
  reducer: {
    postData: postsReducer,
  },
});


// state = {
//     postData: {
//         posts: null,
//         isLoading: false,
//         error: null,
//       },
// }

 // state.postData.posts - пости користувача
