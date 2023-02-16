import React from 'react';

function Item({ id, title, body, userId, selectedPostId, handleSelectPostId }) {
  return (
    <li
      key={id}
      onClick={() => handleSelectPostId("qweqweqwe")}
      className={selectedPostId === id ? 'selected' : ''}
    >
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
    </li>
  );
}

export default Item;
