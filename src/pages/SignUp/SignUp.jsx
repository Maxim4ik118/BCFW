import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SignUpForm } from 'components';
import { registerRequest } from 'redux/userSlice/userSlice';

function SignUpPage() {
  const dispatch = useDispatch();

  const handleRegister = formData => {
    dispatch(registerRequest(formData))
  };

  return (
    <div>
      <SignUpForm onSubmit={handleRegister} />
    </div>
  );
}

export default SignUpPage;
