import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Item from 'components/ListItem/Item';
import Loader from 'components/Loader/Loader';

import { getPosts } from 'redux/operations';


import { PostsList } from 'App.styled';

function HomePage() {
  const posts = useSelector(state => state.postData.posts);
  const isLoading = useSelector(state => state.postData.isLoading);
  const error = useSelector(state => state.postData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <section>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
      <PostsList>
        {posts !== null &&
          posts.map(post => {
            return <Item {...post} key={post.id} />;
          })}
      </PostsList>
    </section>
  );
}

export default HomePage;
