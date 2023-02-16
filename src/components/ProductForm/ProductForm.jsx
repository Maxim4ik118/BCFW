import React, { useState } from 'react';
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

function ProductForm({ onAddProduct, title }) {
  // const state = {
  //   name: '',
  //   price: '',
  //   hasDiscount: false,
  //   discount: '',
  // };
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    hasDiscount: false,
    discount: '',
  });

  const handleInputChange = event => {
    const inputValue = event.target.value;
    const inputType = event.target.type; // "text" | "checkbox"
    const checked = event.target.checked; // true | false
    const inputName = event.target.name; // "name" | "price" | "discount" | "hasDiscount"

    setFormData(prevState => {
      return {
        ...prevState,
        [inputName]: inputType === 'checkbox' ? checked : inputValue,
      };
    });
    /*
        {
          name: '',
          price: '',
          hasDiscount: false,
          discount: '',
          name: "taco"
        }  -> {
          name: "taco"
          price: '',
          hasDiscount: false,
          discount: '',
        }
      */

    // this.setState({
    //   [inputName]: inputType === 'checkbox' ? checked : inputValue,
    // });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const product = {
      img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640',
      price: Number.parseFloat(formData.price),
      title: formData.name,
      discount: {
        value: Number.parseFloat(formData.discount),
      },
    };

    onAddProduct(product);

    reset();
  };

  const reset = () => {
    setFormData({
      name: '',
      price: '',
      hasDiscount: false,
      discount: '',
    })
    // this.setState({
    //   name: '',
    //   price: '',
    //   hasDiscount: false,
    //   discount: '',
    // });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2 className="form-title">{title}</h2>
      <label className="input-group">
        <span>Назва товару:</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label className="input-group">
        <span>Ціна:</span>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </label>
      <label className="input-group">
        <input
          type="checkbox"
          name="hasDiscount"
          checked={formData.hasDiscount}
          onChange={handleInputChange}
        />
        <span>Чи присутня знижка?</span>
      </label>

      {formData.hasDiscount && (
        <label className="input-group">
          <span>Знижка:</span>
          <input
            type="text"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
          />
        </label>
      )}

      <Button type="submit">Add product</Button>
    </StyledForm>
  );
}

ProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProductForm;
