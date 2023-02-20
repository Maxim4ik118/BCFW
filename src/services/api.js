import axios from 'axios';

export const requestPosts = async () => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );

  return data;
};

export const requestPostDetails = async (postId = '1') => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  return data;
};

export const requestComments = async (postId = '1') => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

  return data;
};

