import React from 'react';
import { nanoid } from 'nanoid';
import { Button, Filter, ProductForm, ProductList } from 'components';

const styles = {
  color: '#010101',
  paddingTop: '80px',
};

const productData = [
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
    title: 'Taco 2XXL',
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

export class App extends React.Component {
  state = {
    products: [
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
        title: 'Taco 2XXL',
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
    ],
    filterTerm: '',
  };

  addProduct = product => {
    if (this.state.products.some(p => p.title === product.title)) {
      // alert(`Product ${product.title} is already exists!`);
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

  handleFilter = ({ target: { value } }) => {
    this.setState({
      filterTerm: value,
    });
  };

  render() {
    const filteredProducts = this.state.products.filter(product =>
      product.title // '  Taco XXL  '
        .toLowerCase() // '  taco xxl  '
        .trim() // 'taco xxl'
        .includes(this.state.filterTerm.toLowerCase())
    );
    //   'taco xxl'  -> 'co x'
    
    return (
      <div style={styles}>
        <ProductForm onAddProduct={this.addProduct} title="Додати товар" />
        <Filter
          onFilterChange={this.handleFilter}
          value={this.state.filterTerm}
        />
        <ProductList products={filteredProducts} />
      </div>
    );
  }
}
