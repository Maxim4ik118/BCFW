import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SearchForm from 'components/SearchForm/SearchForm';
import Item from 'components/ListItem/Item';
import Loader from 'components/Loader/Loader';

import { requestPostsById } from 'services/api';

import { PostsList } from 'App.styled';
import {
  setError,
  setIsLoading,
  setPosts,
  setTestInputText,
} from 'redux/postsSlice';

function SearchPage() {
  // const [posts, setPosts] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const posts = useSelector(state => state.postData.posts);
  const isLoading = useSelector(state => state.postData.isLoading);
  const error = useSelector(state => state.postData.error);
  const testInputText = useSelector(state => state.postData.testInputText);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchPostsById(postId) {
      try {
        dispatch(setIsLoading(true));

        const post = await requestPostsById(postId);

        dispatch(setPosts([post]));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setIsLoading(false));
      }
    }

    fetchPostsById(searchQuery);
  }, [searchQuery, dispatch]);

  const onSubmit = searchValue => {
    setSearchParams({ query: searchValue });
  };

  return (
    <section>
      <SearchForm defaultValue={searchQuery} onSubmit={onSubmit} />
      <input
        value={testInputText}
        onChange={event => dispatch(setTestInputText(event.target.value))}
        type="text"
        placeholder="add some text"
      />
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
