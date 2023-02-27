import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  requestComments,
  requestPostDetails,
  requestPosts,
  requestPostsById,
} from 'services/api';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, thunkApi) => {
    try {
      const posts = await requestPosts();

      return posts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getPostsById = createAsyncThunk(
  'posts/getPostsById',
  async (postId, thunkApi) => {
    try {
      const post = await requestPostsById(postId);

      return [post];
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getPostDetails = createAsyncThunk(
  'posts/getPostDetails',
  async (postId, thunkApi) => {
    try {

      const postDetails = await requestPostDetails(postId);

      return postDetails;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getPostComments = createAsyncThunk(
  'posts/getPostComments',
  async (postId, thunkApi) => {
    try {
      const comments = await requestComments(postId);

      return comments;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
