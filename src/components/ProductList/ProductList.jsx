import React from 'react';
import PropTypes from 'prop-types';

import { Product } from 'components';

function ProductList({ products }) {
  return (
    <div>
      {products?.length > 0 &&
        products.map(product => {
          return <Product key={product.id} {...product} />;
        })}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      img: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      discount: PropTypes.shape({
        value: PropTypes.number,
      }),
    }).isRequired
  ).isRequired,

  anotherProducts: PropTypes.array
};

export default ProductList;
