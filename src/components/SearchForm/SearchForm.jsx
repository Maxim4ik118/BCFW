import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function SearchForm({ onSubmit, defaultValue }) {
  const searhRef = useRef();

  const handleSubmitForm = event => {
    event.preventDefault();

    onSubmit(searhRef.current.value);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <input defaultValue={defaultValue} ref={searhRef} type="text" required />
      <button>Search</button>
    </form>
  );
}

SearchForm.propTypes = {
  defaultValue: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default SearchForm;
