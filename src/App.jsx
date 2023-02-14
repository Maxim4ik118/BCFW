import React from 'react';

import { requestComments, requestPosts } from 'services/api';
// import { Button, Filter, ProductForm, ProductList } from 'components';
import Details from 'components/Details/Details';
import Loader from 'components/Loader/Loader';
import { CommentsList, Item, ListsContainer, PostsList } from 'App.styled';

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

/*
1 - constructor()
2 - render()
3 - componentDidMount()

*/

/*
Робота з API
1. Спроектувати стейт з трьома полями(data,isLoading,error)
2. Зробити функцію з запитом(не забуваємо про try/catch)
3. Опрацювати виключення(помилки)
4. Відобразити індикатор завантаження під час HTTP-запиту
5. В src створити папку services, а в ній файлик api.js
6. Написати вашу функцію СЕРВІС. 
*/

export class App extends React.Component {
  state = {
    showDetails: false,
    selectedPostId: null,

    posts: null,
    comments: null,
    isLoading: false,
    error: null,
  };

  async fetchPosts() {
    try {
      this.setState({ isLoading: true });

      const posts = await requestPosts();

      this.setState({ posts: posts });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async fetchComments(postId) {
    try {
      this.setState({ isLoading: true });

      const comments = await requestComments(postId);

      this.setState({ comments: comments });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.selectedPostId !== this.state.selectedPostId) {
      this.fetchComments(this.state.selectedPostId);
    }
  }

  handleToggleDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  };

  handleSelectPostId = postId => {
    this.setState((prevState) => ({
      selectedPostId: postId,
    }));
  };

  render() {
    return (
      <div style={styles}>
        <button onClick={this.handleToggleDetails}>
          Сlick to {this.state.showDetails ? 'HIDE' : 'SHOW'} the details
        </button>
        {this.state.showDetails && <Details />}

        {this.state.isLoading && <Loader />}

        {this.state.error !== null && (
          <p>Oops, some error occured... Message: {this.state.error}</p>
        )}

        <ListsContainer>
          <PostsList>
            {this.state.posts !== null &&
              this.state.posts.map(post => {
                return (
                  <li
                    key={post.id}
                    onClick={() => this.handleSelectPostId(post.id)}
                    className={
                      this.state.selectedPostId === post.id ? 'selected' : ''
                    }
                  >
                    <h3>{post.title}</h3>
                    <p>
                      <b>Body:</b> {post.body}
                    </p>
                    <p>
                      <b>PostId:</b>
                      {post.id}
                    </p>
                    <p>
                      <b>UserID:</b>
                      {post.userId}
                    </p>
                  </li>
                );
              })}
          </PostsList>
          {this.state.comments !== null && (
            <CommentsList>
              {this.state.comments.map(comment => {
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
  }
}
