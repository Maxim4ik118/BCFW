import React, { useRef, useState } from 'react';
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

/*
Для чого потрібні Рефи?

1. Відсутність реактивності(При зміні 
  значення у рефа, компонент 
  не буде перемальовуватись)
2. Інтеграції з DOM бібліотеками
3. Зберігати значення між рендерами(setTimeout, setInterval)
4. Пряма робота з DOM елементами та їх властивостями
*/

function ProductForm({ onAddProduct, title }) {
  const [hasDiscount, setHasDiscount] = useState(false);

  const btnRef = useRef(); // { current: <button>After title button</button> }

  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const discountInputRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();

    const product = {
      img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640',
      price: Number.parseFloat(priceInputRef.current.value),
      title: nameInputRef.current.value,
      discount: {
        value: Number.parseFloat(discountInputRef.current.value),
      },
    };

    onAddProduct(product);

    event.target.reset();
  };

  // const handleBtnClick = () => {
  //   btnRef.current.textContent = "You have clicked on the button";
  //   console.log(window.getComputedStyle(btnRef.current).width);
  // };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2 className="form-title">
        {title}{' '}
        {/* <button ref={btnRef} onClick={handleBtnClick} type="button">
          After title button
        </button> */}
      </h2>
      <label className="input-group">
        <span>Назва товару:</span>
        <input type="text" name="name" ref={nameInputRef} required />
      </label>
      <label className="input-group">
        <span>Ціна:</span>
        <input type="text" name="price" ref={priceInputRef} required />
      </label>
      <label className="input-group">
        <input
          type="checkbox"
          name="hasDiscount"
          checked={hasDiscount}
          onChange={() => setHasDiscount(!hasDiscount)}
        />
        <span>Чи присутня знижка?</span>
      </label>

      {hasDiscount && (
        <label className="input-group">
          <span>Знижка:</span>
          <input type="text" name="discount" ref={discountInputRef} />
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
