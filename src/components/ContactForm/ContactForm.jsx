import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectStatus } from 'redux/userSlice/selectors';
import { Loader, LoaderSpinner } from 'components';

import { StyledForm } from '../SignUpForm/Styled';

function ContactForm({ onSubmit }) {
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const status = useSelector(selectStatus);

  const handleSubmit = event => {
    event.preventDefault();

    const formData = {
      name: nameInputRef.current.value,
      number: phoneInputRef.current.value,
    };
    onSubmit(formData);

    event.target.reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2 className="form-title">Додати контакт</h2>
      <label className="input-group">
        <span>Ім'я: </span>
        <input
          type="text"
          name="name"
          placeholder={'Anthony Blinkin'}
          ref={nameInputRef}
          required
        />
      </label>
      <label className="input-group">
        <span>Телефон: </span>
        <input
          type="text"
          name="phone"
          placeholder={'+380-666-66-66'}
          ref={phoneInputRef}
          required
        />
      </label>
      <button className='form-btn' disabled={status === 'pending'} type="submit">
        {status === 'pending' && <LoaderSpinner />}
        Додати контакт
      </button>
      {status === 'pending' && <Loader />}
    </StyledForm>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
