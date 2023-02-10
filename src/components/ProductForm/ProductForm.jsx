import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components';

import { StyledForm } from './Styled';

/*
Робота з формами:

1. Створити state, полями якого будуть значення
   name у інпутах.
2. Зв'язати ваші інпути з відповідними полями в state.
3. Створити універсальний обробник для всіх полів форми.
4. Додати аттрибут required до обов'язкових полів форми.
5. Зібрати данні з форми при сабміті та викинути їх назовні
*/

class ProductForm extends Component {
  state = {
    name: '',
    price: '',
    hasDiscount: false,
    discount: '',
  };

  handleInputChange = event => {
    const inputValue = event.target.value;
    const inputType = event.target.type; // "text" | "checkbox"
    const checked = event.target.checked; // true | false
    const inputName = event.target.name; // "name" | "price" | "discount" | "hasDiscount"

    this.setState({
      [inputName]: inputType === 'checkbox' ? checked : inputValue,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const product = {
      img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640',
      price: Number.parseFloat(this.state.price),
      title: this.state.name,
      discount: {
        value: Number.parseFloat(this.state.discount),
      },
    };

    this.props.onAddProduct(product);
    
    this.reset();
  };

  reset() {
    this.setState({
      name: '',
      price: '',
      hasDiscount: false,
      discount: '',
    });
  }

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <h2 className="form-title">{this.props.title}</h2>
        <label className="input-group">
          <span>Назва товару:</span>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label className="input-group">
          <span>Ціна:</span>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label className="input-group">
          <input
            type="checkbox"
            name="hasDiscount"
            checked={this.state.hasDiscount}
            onChange={this.handleInputChange}
          />
          <span>Чи присутня знижка?</span>
        </label>

        {this.state.hasDiscount && (
          <label className="input-group">
            <span>Знижка:</span>
            <input
              type="text"
              name="discount"
              value={this.state.discount}
              onChange={this.handleInputChange}
            />
          </label>
        )}

        <Button type="submit">Add product</Button>
      </StyledForm>
    );
  }
}

ProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default ProductForm;
