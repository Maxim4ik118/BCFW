import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SearchForm from 'components/SearchForm/SearchForm';
import Item from 'components/ListItem/Item';
import Loader from 'components/Loader/Loader';
import { getPostsById } from 'redux/operations';

import { PostsList } from 'App.styled';


function SearchPage() {
  const posts = useSelector(state => state.postData.posts);
  const isLoading = useSelector(state => state.postData.isLoading);
  const error = useSelector(state => state.postData.error);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (searchQuery === null) return;

    dispatch(getPostsById(searchQuery));
  }, [searchQuery, dispatch]);

  const onSubmit = searchValue => {
    setSearchParams({ query: searchValue });
  };

  return (
    <section>
      <SearchForm defaultValue={searchQuery} onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
      <PostsList>
        {posts !== null &&
          posts.map(post => {
            return <Item location={location} {...post} key={post.id} />;
          })}
      </PostsList>
    </section>
  );
}

export default SearchPage;
