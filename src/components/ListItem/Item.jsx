import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Item({ id, title, body, userId }) {
  // id = 58
  // /posts/58
  return (
    <li>
      <Link to={`/posts/${id}`}>
        <h3>{title}</h3>
        <p>
          <b>Body:</b> {body}
        </p>
        <p>
          <b>PostId:</b>
          {id}
        </p>
        <p>
          <b>UserID:</b>
          {userId}
        </p>
      </Link>
    </li>
  );
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
}

export default Item;
