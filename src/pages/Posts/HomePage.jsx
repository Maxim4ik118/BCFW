import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Item from 'components/ListItem/Item';
import Loader from 'components/Loader/Loader';

import { getPosts } from 'redux/operations';
import { selectError, selectIsLoading, selectPosts } from 'redux/selectors';


import { PostsList } from 'App.styled';

function HomePage() {
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
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
