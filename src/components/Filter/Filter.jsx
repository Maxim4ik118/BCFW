import React from 'react';

function Filter({ value, onFilterChange }) {
  return (
    <div style={{ margin: '20px auto', width: '500px' }}>
      <p>Пошук продуктів за назвою</p>
      <input
        type="text"
        name="filterTerm"
        value={value}
        onChange={onFilterChange}
      />
    </div>
  );
}

export default Filter;
