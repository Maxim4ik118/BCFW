import React from 'react';
import PropTypes from 'prop-types';

import { Product } from 'components';

function ProductList({ products, deleteProduct = () => {} }) {
  return (
    <div>
      {products?.length > 0 &&
        products.map(product => {
          return (
            <Product
              key={product.id}
              deleteProduct={deleteProduct}
              {...product}
            />
          );
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

  deleteProduct: PropTypes.func,
};

export default ProductList;
