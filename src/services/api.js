import axios from 'axios';

export const requestPosts = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP__API_DOMAIN}/posts`
  );

  return data;
};

export const requestPostsById = async (postId = '1') => {
  const { data } = await axios.get(
    `${process.env.REACT_APP__API_DOMAIN}/posts/${postId}`
  );

  return data;
};


export const requestPostDetails = async (postId = '1') => {
  const { data } = await axios.get(
    `${process.env.REACT_APP__API_DOMAIN}/posts/${postId}`
  );

  return data;
};

export const requestComments = async (postId = '1') => {
  const { data } = await axios.get(
    `${process.env.REACT_APP__API_DOMAIN}/posts/${postId}/comments`
  );

  return data;
};

