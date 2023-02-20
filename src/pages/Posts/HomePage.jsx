import { PostsList } from 'App.styled';
import Item from 'components/ListItem/Item';
import React, { useEffect, useState } from 'react';
import { requestPosts } from 'services/api';

function HomePage() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);

        const posts = await requestPosts();

        setPosts(posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <PostsList>
      {posts !== null &&
        posts.map(post => {
          return <Item {...post} key={post.id} />;
        })}
    </PostsList>
  );
}

export default HomePage;
