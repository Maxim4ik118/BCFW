import React from 'react';
import { useDispatch } from 'react-redux';

import { SignUpForm } from 'components';
import { loginRequest } from 'redux/userSlice/userSlice';

function SignInPage() {
  const dispatch = useDispatch();

  const handleLogin = formData => {
    dispatch(loginRequest(formData));
  };

  return (
    <div>
      <SignUpForm onSubmit={handleLogin} isLoginForm />
    </div>
  );
}

export default SignInPage;
