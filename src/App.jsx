import React, { useContext, useEffect, useState } from 'react';

import { requestComments, requestPosts } from 'services/api';
// import { Button, Filter, ProductForm, ProductList } from 'components';
import Details from 'components/Details/Details';
import Loader from 'components/Loader/Loader';
import Item from './components/ListItem/Item';
import { ModalContext } from 'context/ModalContext';

import { CommentsList, ListsContainer, PostsList } from 'App.styled';
import { ProductForm } from 'components';

const styles = {
  color: '#010101',
  paddingTop: '80px',
};

const productsData = [
  {
    id: 1,
    img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640',
    price: 10.99,
    title: 'Taco XXL',
    discount: {
      value: 17,
    },
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1668534576765-d9fa656e26c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    price: 11.99,
    title: 'Taco 2XXL EXTRA CHEESE',
    discount: {
      value: 23,
    },
  },
  {
    id: 3,
    img: 'https://plus.unsplash.com/premium_photo-1663924749013-7259f695b183?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    price: 7.77,
    title: 'Taco XS',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1667684550432-35d19dd88940?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8cVBZc0R6dkpPWWN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    price: 6.66,
    title: 'Taco M',
  },
];

/*
Рект компонент перемальовується, коли:
1. Змінюється внутрішній стан(state) компонента, тобто відпрацювала функція setState.
2. Коли батьківський компонент перемальовується, та в наш компонент приходять нові пропси.

Порядок імпортів:
1. Зовнішні бібліотеки
2. Кастомні компоненти, сервіси, редьюсери
3. Зовнішні статичні файли(файли .json, .pdf, .doc, зображення і т.п.)
4. Файли стилів
*/

export const App = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { showDetails } = useContext(ModalContext);

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

  async function fetchComments(postId) {
    try {
      setIsLoading(true);

      const comments = await requestComments(postId);

      setComments(comments);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedPostId === null) return;

    fetchComments(selectedPostId);
  }, [selectedPostId]);

  const handleSelectPostId = postId => {
    setSelectedPostId(postId);
  };

  const onAddProduct = (data) => {
    console.log('data: ', data);
  }

  return (
    <div style={styles}>
      {/* <button onClick={handleToggleDetails}>
        Сlick to {showDetails ? 'HIDE' : 'SHOW'} the details
      </button> */}
      {showDetails && <Details />}

      {isLoading && <Loader />}

      <ProductForm onAddProduct={onAddProduct} title="Add Product" />

      {error !== null && <p>Oops, some error occured... Message: {error}</p>}

      <ListsContainer>
        <PostsList>
          {posts !== null &&
            posts.map(post => {
              return (
                <Item
                  {...post}
                  key={post.id}
                  selectedPostId={selectedPostId}
                  handleSelectPostId={handleSelectPostId}
                />
              );
            })}
        </PostsList>
        {comments !== null && (
          <CommentsList>
            {comments.map(comment => {
              return (
                <li key={comment.id}>
                  <h3>UserName: {comment.name}</h3>
                  <p>
                    <b>Email:</b> {comment.email}
                  </p>
                  <p>
                    <b>Body:</b> {comment.body}
                  </p>
                </li>
              );
            })}
          </CommentsList>
        )}
      </ListsContainer>
    </div>
  );
};
