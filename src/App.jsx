import React from 'react';
import { nanoid } from 'nanoid';
import { Button, Filter, ProductForm, ProductList } from 'components';
import Details from 'components/Details/Details';

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

export class App extends React.Component {
  state = {
    products: JSON.parse(localStorage.getItem('products')) ?? [],
    filterTerm: '',
    showDetails: false,
  };

  componentDidMount() {
    // if (JSON.parse(localStorage.getItem('products'))) {
    //   this.setState({
    //     products: JSON.parse(localStorage.getItem('products')),
    //   });
    // }
    /*
    Функція, що спрацьовує лише один раз, після народження
    компоненти.

    1. Надсилаються HTTP запити(мережеві) при появі розмітки.
    2. Вішаються глобальні обробники подій (addEventListener)
    3. Встановлюються таймери setInterval() | setTimeout()
    4. Звернення до зовнішніх API (localStorage)
    */
  }

  componentWillUnmount() {
    /*
      Функція, що спрацьовує перед тим, як компонет буде
      повністю видалений з DOM дерева(розмітки).

      1. Відхиляються HTTP запити(мережеві) при появі розмітки | junior+, middle+
      2. Видаляти глобальні обробники подій (removeEventListener)
      3. Очищувати таймери(прибирати) clearInterval(intervalId) | clearTimeout(timeoutId)
    */
  }

  componentDidUpdate(_, prevState) {
    if (prevState.products !== this.state.products) {
      const stringifiedProducts = JSON.stringify(this.state.products);

      localStorage.setItem('products', stringifiedProducts);
    }
  }

  addProduct = product => {
    if (this.state.products.some(p => p.title === product.title)) {
      alert(`Product ${product.title} is already exists!`);
      return;
    }

    const finalProduct = {
      id: nanoid(),
      ...product,
    };

    this.setState({
      products: [finalProduct, ...this.state.products],
    });

    // this.setState((prevState) => ({
    //   products: [finalProduct, ...prevState.products],
    // }));
  };

  deleteProduct = productId => {
    this.setState({
      products: this.state.products.filter(product => product.id !== productId),
    });
  };

  handleFilter = ({ target: { value } }) => {
    this.setState({
      filterTerm: value,
    });
  };

  handleToggleDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  };

  render() {
    const filteredProducts = this.state.products.filter(product =>
      product.title
        .toLowerCase()
        .trim()
        .includes(this.state.filterTerm.toLowerCase())
    );

    return (
      <div style={styles}>
        <button onClick={this.handleToggleDetails}>
          Сlick to {this.state.showDetails ? 'HIDE' : 'SHOW'} the details
        </button>
        {this.state.showDetails && <Details />}
         
        
        <ProductForm onAddProduct={this.addProduct} title="Додати товар" />
        <Filter
          onFilterChange={this.handleFilter}
          value={this.state.filterTerm}
        />
        <ProductList
          deleteProduct={this.deleteProduct}
          products={filteredProducts}
        />
      </div>
    );
  }
}
