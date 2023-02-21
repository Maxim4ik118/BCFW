import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import SearchForm from 'components/SearchForm/SearchForm';

import { requestPostsById } from 'services/api';
import Item from 'components/ListItem/Item';
import { PostsList } from 'App.styled';
import Loader from 'components/Loader/Loader';

function SearchPage() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchPostsById(postId) {
      try {
        setIsLoading(true);

        const post = await requestPostsById(postId);

        setPosts([post]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPostsById(searchQuery);
  }, [searchQuery]);

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
