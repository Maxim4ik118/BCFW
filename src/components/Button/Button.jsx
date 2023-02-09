import PropTypes from 'prop-types';

const Button = ({ type, children, onClick = () => {}, ...restProps }) => {
  return (
    <button type={type} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
