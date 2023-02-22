import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Item from 'components/ListItem/Item';
import Loader from 'components/Loader/Loader';

import { setError, setIsLoading, setPosts } from 'redux/postsSlice';

import { requestPosts } from 'services/api';

import { PostsList } from 'App.styled';

function HomePage() {
  const posts = useSelector(state => state.postData.posts);
  const isLoading = useSelector(state => state.postData.isLoading);
  const error = useSelector(state => state.postData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPosts() {
      try {
        dispatch(setIsLoading(true));
        dispatch(setError(null));
        // dispatch({ type: "posts/setIsLoading", payload: true })

        const posts = await requestPosts();

        dispatch(setPosts(posts));
        // { type: "posts/setPosts", payload: [{}, {}, ..., {}] }
      } catch (error) {
        // const setError = payload => ({
        //   type: 'posts/setError',
        //   payload: payload,
        // }); - самописний ActionCreator
        dispatch(setError(error.message));

        // setError - це ActionCreator
        // а Action, це -> { type: "posts/setError", payload: "Ohh noo, i hope i don`t fail..." }
      } finally {
        dispatch(setIsLoading(false));
      }
    }
    
    fetchPosts();
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
      <PostsList>
        {posts !== null &&
          posts.map(post => {
            return <Item {...post} key={post.id} />;
          })}
      </PostsList>
    </>
  );
}

export default HomePage;
