import React, { useContext } from 'react';

import { ModalContext } from 'context/ModalContext';

function Item({ id, title, body, userId, selectedPostId, handleSelectPostId }) {
  const { toggleDetails } = useContext(ModalContext);

  return (
    <li
      key={id}
      onClick={() => handleSelectPostId('qweqweqwe')}
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
      <button onClick={toggleDetails}>Toggle Details</button>
    </li>
  );
}

export default Item;
