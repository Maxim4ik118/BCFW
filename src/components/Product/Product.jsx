import PropTypes from 'prop-types';

// import s from './Product.module.scss';
import { StyledProduct, StyledProductBtn } from './Styled';

const Product = ({
  id,
  img,
  price = 0,
  discount = {},
  title = "",
  deleteProduct = () => {},
}) => {
  // const { image, price, discount = {}, title } = props;
  const hasDiscount = discount.hasOwnProperty('value') && discount?.value;
  return (
    <StyledProduct discount={hasDiscount}>
      <img className="productImg" src={img} alt={title} width="440" />
      <div className="productBody">
        <h2 className="productTitle">
          {title}
        </h2>
        <p className="productPrice">
          Price: {price}$
          <span className="productDiscount">DISCOUNT -{discount.value}%</span>
        </p>
        <StyledProductBtn onClick={() => deleteProduct(id)} type="button">
          Delete
        </StyledProductBtn>
        {/* <StyledProductBtn type="button">Buy now</StyledProductBtn> */}
      </div>
    </StyledProduct>
  );
};

Product.propTypes = {
  deleteProduct: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  discount: PropTypes.shape({
    value: PropTypes.number,
  }),
};

export default Product;